import { ResumeData } from 'apps/easyAccess/libs/schema';
import { DEFAULT_RESUME, DEFAULT_RESuME_DATA } from 'apps/easyAccess/src/const/resumeList';
import { ResumeDataType } from 'apps/easyAccess/src/types/resume/resume-data';
import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
// import { UrlObj } from "apps/easyAccess/src/types/resume/utils";
// import { SkillType } from "apps/easyAccess/src/types/resume/skills";


type Sheet = {
  open: boolean;
};

interface PanelHandle  {
  isDragging: boolean;
  // setDragging: (dragging: boolean) => void;
};

interface Panel extends PanelHandle {
  size: number;
  isDragging: boolean;
};

export type BuilderState = {
  resumeBuilderList: Array<ResumeType>,
  activeResumeData: ResumeData,
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
  resumeBuilderList: [],
  activeResumeData: {} as ResumeData,
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
      size: 25,
      isDragging: false
    },
    right: {
      size: 35,
      isDragging: false
    }
  }
};
