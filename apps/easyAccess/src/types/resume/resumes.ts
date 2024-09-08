import { ResumeDataType } from "apps/easyAccess/src/types/resume/resume-data"


export interface ResumeType  {
    id: string,
    title: string,
    // slug: string,
    // data: ResumeDataType,
    visibility: "private" | "public",
    locked: boolean,
    createdAt: Date | string,
    updatedAt: Date | string,
}
