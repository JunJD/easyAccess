


import { BaseModel } from '../core';
import { nanoid } from '@easy-access/utils';
import { DB_Builder, DB_BuilderSchema } from '../schemas/builders';
import { DBModel } from '../core/types/db';
import { ResumeType } from '../../types/resume/resumes';
import dayjs from 'dayjs';


interface QueryBuildersParams {
  pageSize?: number,
  current?: number,
  visibility?: 'public' | 'private'
}


class _BuildersModel extends BaseModel<'builders'> {
  constructor() {
    super('builders', DB_BuilderSchema);
  }

  async update(id: string, data: Partial<DB_Builder>) {
    return this.table.update(id, {
      ...data,
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
  }

  async updateBuilderData(id: string, data: DB_Builder['data']) {
    const origin = await this.findById(id);
    if(origin) {
      return this.update(id, {
        ...origin,
        data,
      });
    }

  }
  
  async query({
    pageSize = 9999,
    current = 0,
    visibility = 'public'
  }: QueryBuildersParams): Promise<ResumeType[]> {
    const offset = current * pageSize;
    const dbBuilders:DBModel<DB_Builder>[] = await BuildersModel.table
      .where({ visibility })
      .sortBy('createdAt')
      .then((sortedArray) => sortedArray.slice(offset, offset + pageSize));
      const builders = dbBuilders.map((builder) => this.mapToViewBuilders(builder));
    return builders;
  }

  async create(builders: DB_Builder) {
    const id = nanoid();

    return this._add(builders, `builders-${id}`);
  }

  async findById(id: string): Promise<DB_Builder> {
    return this.table.get(id);
  }

  async delete(id: string) {
    return this.table.delete(id);
  }

  async clear() {
    return this.table.clear();
  }



  /**
   * util function to map DBModel to view model
   * @param item DBModel<DB_Builder>
   * @returns 
   */

  mapToViewBuilders(item: DBModel<DB_Builder>): ResumeType {
    return {
      builderId: item.id,
      title: item.title,
      visibility: item.visibility,
      locked: item.locked,
      createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    }
  }
}

export const BuildersModel = new _BuildersModel();
