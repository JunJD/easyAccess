import { SectionData, baseItemSchema } from "apps/easyAccess/src/types/resume/sections/base";
import { UrlObj } from "apps/easyAccess/src/types/resume/utils";

export interface AwardItem extends baseItemSchema  {
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