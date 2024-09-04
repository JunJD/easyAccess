import { SectionData } from "apps/easyAccess/src/types/resume/sections/base";
import { UrlObj } from "apps/easyAccess/src/types/resume/utils";

export type AwardItem = {
    title: string,
    awarder: string,
    date: string,
    summary: string,
    url: UrlObj,
}

export interface awardSectionData extends SectionData {
    id: "awards",
    items: Array<AwardItem>,
    content: string,
}