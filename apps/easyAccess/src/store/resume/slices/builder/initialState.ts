import { DEFAULT_RESUME, DEFAULT_RESuME_DATA } from 'apps/easyAccess/src/const/resumeList';
import { ResumeDataType } from 'apps/easyAccess/src/types/resume/resume-data';
import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
// import { UrlObj } from "apps/easyAccess/src/types/resume/utils";
// import { SkillType } from "apps/easyAccess/src/types/resume/skills";

interface BuilderDataType extends ResumeDataType {
  id: ResumeType['builderId'],
}


type Sheet = {
  open: boolean;
};

interface PanelHandle  {
  isDragging: boolean;
  // setDragging: (dragging: boolean) => void;
};

interface Panel extends PanelHandle {
  size: number;
  // setSize: (size: number) => void;
  isDragging: boolean;
};

export type BuilderState = {
  resumeBuilderList: Array<BuilderDataType>,
  activeResumeBuilder: ResumeDataType,
  sheet: {
    left: Sheet;
    right: Sheet;
  };
  panel: {
    left: Panel;
    right: Panel;
  };
}

export const initialBuilderState: BuilderState = {
  resumeBuilderList: [{ ...DEFAULT_RESuME_DATA, id: DEFAULT_RESUME.builderId }],
  activeResumeBuilder: DEFAULT_RESuME_DATA,
  sheet: {
    left: {
      open: false
    },
    right: {
      open: false
    }
  },
  panel: {
    left: {
      size: 0,
      isDragging: false
    },
    right: {
      size: 0,
      isDragging: false
    }
  }
};
