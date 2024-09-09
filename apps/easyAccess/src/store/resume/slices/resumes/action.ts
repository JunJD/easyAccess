import { isEqual, uniqueId } from 'lodash-es';
import type { StateCreator } from 'zustand/vanilla';
import { Store } from '../../store';
import { DeepPartial } from 'utility-types';
import { GlobalSettings } from 'apps/easyAccess/src/types/settings';
import { difference, funLog, merge } from '@easy-access/utils';
import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
import { set as _set} from "lodash-es";
import dayjs from 'dayjs';
/**
 * 设置操作
 */
export interface ResumesAction {
  addResume: (resume: Partial<ResumeType>) => Promise<ResumeType>;
}

export const createResumesSlice: StateCreator<
Store,
  [['zustand/devtools', never]],
  [],
  ResumesAction
> = (set, get) => ({
  addResume: async (resume) => {
    resume.createdAt = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
    resume.builderId = uniqueId()
    resume.locked = false;
    resume.title = resume.title || '未命名简历';
    resume.updatedAt = resume.createdAt
    resume.visibility = 'public'
    const presumeList = get().resumeList;
    set({
      resumeList: [...presumeList, resume as ResumeType],
    }, true);
    return resume as ResumeType;
  }
});
