import { isEqual, uniqueId } from 'lodash-es';
import type { StateCreator } from 'zustand/vanilla';
import { Store } from '../../store';
import { DeepPartial } from 'utility-types';
import { GlobalSettings } from 'apps/easyAccess/src/types/settings';
import { difference, funLog, merge } from '@easy-access/utils';
import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
import { set as _set } from "lodash-es";
import { ResumeDataType } from 'apps/easyAccess/src/types/resume/resume-data';
/**
 * 设置操作
 */
export interface BuilderAction {
  setActiveBuilderById: (id: ResumeType['builderId']) => ResumeDataType | null;
  setResumeValue: (path: string, value: any) => void;
}

export const createBuilderSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  BuilderAction
> = (set, get) => ({
  setActiveBuilderById(id) {
    const activeResumeBuilder = get().resumeBuilderList.find((item) => item.id === id);
    if (activeResumeBuilder) {
      set((state) => {
        state.activeResumeBuilder = activeResumeBuilder;
        return state
      });
    }
    return activeResumeBuilder ?? null;
  },
  setResumeValue: async (path, value) => {
    set((state) => {
      if (path) {
        state.activeResumeBuilder = _set(state.activeResumeBuilder, path, value);
      }
      return state
    });
  }
});
