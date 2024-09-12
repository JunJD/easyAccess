import { isEqual, uniqueId } from 'lodash-es';
import { produce } from 'immer';
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


  setPanelSize: (pane: 'left' | 'right', size: number) => void;
  setPaneDragging: (pane: 'left' | 'right', dragging: boolean) => void;
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
      return produce(state, (draftState=>{
        if (path) {
          draftState.activeResumeBuilder = _set(draftState.activeResumeBuilder, path, value);
        }
      }))
    });
  },
  setPanelSize: (pane, size) => {
    set((state) => {
      return produce(state, (draftState=>{
        draftState.panel[pane].size = size;
      }))
    });
  },
  setPaneDragging: (pane, dragging) => {
    set((state) => {
      return produce(state, (draftState=>{
        draftState.panel[pane].isDragging = dragging;
      }))
    });
  }
});
