import { SectionData } from "apps/easyAccess/src/types/resume/sections/base";

export interface SummarySectionData extends SectionData {
    id: "summary",
    content: string,
}