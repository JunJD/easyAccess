import Dexie, { BulkError } from 'dexie';
import { ZodObject } from 'zod';

import { LocalDB, LocalDBInstance, LocalDBSchema } from './db';

import { DBBaseFieldsSchema } from './types/db';
import { nanoid } from '@easy-access/utils';

export class BaseModel<N extends keyof LocalDBSchema = any, T = LocalDBSchema[N]['table']> {
  protected readonly db: LocalDB;
  private readonly schema: ZodObject<any>;
  private readonly _tableName: keyof LocalDBSchema;

  constructor(table: N, schema: ZodObject<any>, db = LocalDBInstance) {
    this.db = db;
    this.schema = schema;
    this._tableName = table;
  }

  get table() {
    return this.db[this._tableName] as Dexie.Table;
  }



  /**
   * create a new record
   */
  protected async _add<T = LocalDBSchema[N]['model']>(
    data: T,
    id: string | number = nanoid(),
    primaryKey: string = 'id',
  ) {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      const errorMsg = `[${this.db.name}][${this._tableName}] Failed to create new record. Error: ${result.error}`;

      const newError = new TypeError(errorMsg);
      // make this error show on console to help debug
      console.error(newError);
      throw newError;
    }

    const tableName = this._tableName;

    const record: any = {
      ...result.data,
      createdAt: Date.now(),
      [primaryKey]: id,
      updatedAt: Date.now(),
    };

    const newId = await this.db[tableName].add(record);

    // sync data to yjs data map

    return { id: newId };
  }
  
  /**
   * Batch create new records
   * @param dataArray An array of data to be added
   * @param options
   * @param options.generateId
   * @param options.createWithNewId
   */
  protected async _batchAdd<T = LocalDBSchema[N]['model']>(
    dataArray: T[],
    options: {
      /**
       * 创建一个新的id
       */
      createWithNewId?: boolean;
      idGenerator?: () => string;
      withSync?: boolean;
    } = {},
  ): Promise<{
    added: number;
    errors?: Error[];
    ids: string[];
    skips: string[];
    success: boolean;
  }> {
    const { idGenerator = nanoid, createWithNewId = false, withSync = true } = options;
    const validatedData: any[] = [];
    const errors = [];
    const skips: string[] = [];

    for (const data of dataArray) {
      const schemaWithId = this.schema.merge(DBBaseFieldsSchema.partial());

      const result = schemaWithId.safeParse(data);

      if (result.success) {
        const item = result.data;
        const autoId = idGenerator();

        const id = createWithNewId ? autoId : (item.id as string) ?? autoId;

        // skip if the id already exists
        if (await this.table.get(id)) {
          skips.push(id);
          continue;
        }

        validatedData.push({
          ...item,
          createdAt: item.createdAt ?? Date.now(),
          id,
          updatedAt: item.updatedAt ?? Date.now(),
        });
      } else {
        errors.push(result.error);

        const errorMsg = `[${this.db.name}][${
          this._tableName
        }] Failed to create the record. Data: ${JSON.stringify(data)}. Errors: ${result.error}`;
        console.error(new TypeError(errorMsg));
      }
    }
    if (validatedData.length === 0) {
      // No valid data to add
      return { added: 0, errors, ids: [], skips, success: false };
    }

    // Using bulkAdd to insert validated data
    try {
      await this.table.bulkAdd(validatedData);
      // if (withSync) {
      // }
      return {
        added: validatedData.length,
        ids: validatedData.map((item) => item.id),
        skips,
        success: true,
      };
    } catch (error) {
      const bulkError = error as BulkError;
      // Handle bulkAdd errors here
      console.error(`[${this.db.name}][${this._tableName}] Bulk add error:`, bulkError);
      // Return the number of successfully added records and errors
      return {
        added: validatedData.length - skips.length - bulkError.failures.length,
        errors: bulkError.failures,
        ids: validatedData.map((item) => item.id),
        skips,
        success: false,
      };
    }
  }

}
