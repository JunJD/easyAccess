import { ResumeDataType } from "./resume-data";


export type ResumeType = {
    id: string,
    title: string,
    slug: string,
    data: ResumeDataType,
    visibility: "private" | "public",
    locked: boolean,
    createdAt: Date | string,
    updatedAt: Date | string,
}
