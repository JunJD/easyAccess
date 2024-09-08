import { DEFAULT_RESUME, DEFAULT_RESuME_DATA } from 'apps/easyAccess/src/const/resumeList';
import { ResumeDataType } from 'apps/easyAccess/src/types/resume/resume-data';
import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
// import { UrlObj } from "apps/easyAccess/src/types/resume/utils";
// import { SkillType } from "apps/easyAccess/src/types/resume/skills";

interface BuilderDataType extends ResumeDataType {
  id: ResumeType['builderId'],
}

export type BuilderState = {
  resumeBuilderList: Array<BuilderDataType>,
  activeResumeBuilder: ResumeDataType,
}

export const initialBuilderState: BuilderState = {
  resumeBuilderList: [{ ...DEFAULT_RESuME_DATA, id: DEFAULT_RESUME.builderId }],
  activeResumeBuilder: DEFAULT_RESuME_DATA,
};
