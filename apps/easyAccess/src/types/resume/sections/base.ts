export type SectionsKey = "summary" | "awards"

export interface SectionData  {
    name: string,
    columns: number,
    separateLinks: boolean,
    visible: boolean,

    id: SectionsKey,
    content: string,
    // items: baseItemSchema
}

export type baseItemSchema = {
    id: string,
    visible: boolean,
}