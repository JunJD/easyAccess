import { DEFAULT_RESUME } from 'apps/easyAccess/src/const/resumeList';
import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
// import { UrlObj } from "apps/easyAccess/src/types/resume/utils";
// import { SkillType } from "apps/easyAccess/src/types/resume/skills";


export type ResumesState = {
  resumeList: Array<ResumeType>,
  activeResumeId: ResumeType['builderId'],
}

export const initialResumeState: ResumesState = {
  resumeList: [
    DEFAULT_RESUME
  ],
  activeResumeId: DEFAULT_RESUME.builderId,
};
