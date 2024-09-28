import Dexie, { Transaction } from 'dexie';

import { DB_Builder } from 'apps/easyAccess/src/database/schemas/builders';


import {
  dbSchemaV1,
} from './schemas';
import { DBModel, EASY_ACCESS_LOCAL_DB_NAME } from './types/db';


export interface EasyAccessDBSchemaMap {
  builders: DB_Builder;
}

// Define a local DB
export class LocalDB extends Dexie {
  public builders: EasyAccessDBTable<'builders'>;

  constructor() {
    super(EASY_ACCESS_LOCAL_DB_NAME);
    console.log('upgradeToV1')
    this.version(2).stores(dbSchemaV1).upgrade((trans) => {
      console.log('11222')
      return this.upgradeToV2(trans)
    });
    console.log('upgradeTo222')

    this.builders = this.table('builders');
  }

  /**
   * 2024.09.25
   *
   * DB V1
   */
  upgradeToV2 = async (trans: Transaction) => {};
}
export const LocalDBInstance = new LocalDB();

// ================================================ //
// ================================================ //
// ================================================ //
// ================================================ //
// ================================================ //

// types helper
export type LocalDBSchema = {
  [t in keyof EasyAccessDBSchemaMap]: {
    model: EasyAccessDBSchemaMap[t];
    table: Dexie.Table<DBModel<EasyAccessDBSchemaMap[t]>, string>;
  };
};
type EasyAccessDBTable<T extends keyof EasyAccessDBSchemaMap> = LocalDBSchema[T]['table'];
