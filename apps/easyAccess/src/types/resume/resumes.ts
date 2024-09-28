import { ResumeDataType } from "apps/easyAccess/src/types/resume/resume-data"


export interface ResumeType  {
    builderId: string,
    title: string,
    // slug: string,
    // data: ResumeDataType,
    visibility: "private" | "public",
    locked: boolean,
    createdAt: Date | string,
    updatedAt: Date | string,
}

export interface ServiceBasicsType {
    
}

// 1.view state
// 2.service state
// 1.db schema

// export interface
