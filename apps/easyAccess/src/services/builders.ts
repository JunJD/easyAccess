import { BuildersModel } from 'apps/easyAccess/src/database/models/builders';
import { DB_Builder } from 'apps/easyAccess/src/database/schemas/builders';
import { ResumeType } from '../types/resume/resumes';
import { ResumeData, defaultResumeData } from 'apps/easyAccess/libs/schema';
import deepmerge from "deepmerge";
import { DeepPartial } from 'utility-types';
class builderService {

  async getBuilderList(): Promise<ResumeType[]> {
    return BuildersModel.query({});
  }
  
  async updateBuilderData(id: string, data: ResumeData): Promise<void> {
    const originData = this.getResumeData(id);
    const merger = deepmerge(originData, {
      ...data
    } satisfies DeepPartial<ResumeData>);
    await BuildersModel.updateBuilderData(id, merger)
  }
  
  async addResume(newResume: Partial<DB_Builder>): Promise<{ id: string }> {
    const data = deepmerge(defaultResumeData, {
      basics: { name: 'EASY ACCESS', email: '', picture: { url: "" } },
    } satisfies DeepPartial<ResumeData>);
    
    const item = await BuildersModel.create({
      title: newResume?.title ?? 'New Resume',
      visibility: 'public',
      locked: false,
      data
    });
    return item;
  }

  async getResumeData(id: string): Promise<ResumeData> {
    const builder = await BuildersModel.findById(id);
    if (!builder) {
      throw new Error('Builder not found');
    }
    return builder.data;
  }

  async deleteResume(id: string): Promise<void> {
    try {
      await BuildersModel.delete(id);
    } catch (error) {
      throw new Error('Error deleting builder');
    }
  }

}

export const buildersService = new builderService();
