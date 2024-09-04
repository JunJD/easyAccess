import { ResumeDataBasics } from "apps/easyAccess/src/types/resume/resume-data-basics"
import { ResumeDataMetadata } from "apps/easyAccess/src/types/resume/resume-data-metadata"
import { ResumeDataSections } from "apps/easyAccess/src/types/resume/resume-data-sections"

// sections
import { SummarySectionData } from "apps/easyAccess/src/types/resume/sections/summary"
import { awardSectionData } from "apps/easyAccess/src/types/resume/sections/awards"

export type ResumeDataType = {
    basics: ResumeDataBasics,
    sections: ResumeDataSections<SummarySectionData | awardSectionData>,
    metadata: ResumeDataMetadata,
}