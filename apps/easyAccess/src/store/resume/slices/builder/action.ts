
import { produce } from 'immer';
import type { StateCreator } from 'zustand/vanilla';
import { Store } from '../../store';

import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
import { set as _set } from "lodash-es";
import { ResumeDataType } from 'apps/easyAccess/src/types/resume/resume-data';
import { buildersService } from 'apps/easyAccess/src/services/builders';
import { ResumeData } from 'apps/easyAccess/libs/schema';
/**
 * 设置操作
 */
export interface BuilderAction {
  setActiveBuilderDataById: (id: string) => void;
  setResumeValue: (id: string, path: string, value: any) => void;

  setPanelSize: (pane: 'left' | 'right', size: number) => void;
  setPaneDragging: (pane: 'left' | 'right', dragging: boolean) => void;
  deleteResume: (id: string) => void;
  addResume: (resume: Partial<ResumeType>) => void;
  getResumeList: () => Promise<void>;
}

export const createBuilderSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  BuilderAction
> = (set, get) => ({
  setPanelSize: (pane, size) => {
    set((state) => {
      return produce(state, (draftState => {
        draftState.panel[pane].size = size;
      }))
    });
  },
  setPaneDragging: (pane, dragging) => {
    set((state) => {
      return produce(state, (draftState => {
        draftState.panel[pane].isDragging = dragging;
      }))
    });
  },
  /**
   * 设置简历数据
   * @param path 路径
   * @param value 值
   */
  setResumeValue: async (id, path, value) => {
    set((state) => {
      return produce(state, (draftState => {
        if (path) {
          draftState.activeResumeData = _set(draftState.activeResumeData, path, value);
        }
      }))
    });
    buildersService.updateBuilderData(id, get().activeResumeData)
  },
  /**
   * 获取简历列表
   */
  async getResumeList() {
    const resumeBuilderList = await buildersService.getBuilderList()
    resumeBuilderList.length && set(() => {
      return { resumeBuilderList }
    })
  },
  /**
   * 删除简历
   */
  async deleteResume(id: string) {
    await buildersService.deleteResume(id)
    get().getResumeList()
  },
  /**
   * 新增简历
   * @param resume 简历
   */
  async addResume(resume) {
    await buildersService.addResume({
      title: resume.title
    })
    get().getResumeList()
  },
  /**
   * 构建简历
   * @param id 简历id
   */
  async setActiveBuilderDataById(id) {    
    const activeResumeData = await buildersService.getResumeData(id)
    set(() => {
      return { activeResumeData }
    })
  },
});
