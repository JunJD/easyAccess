export type SectionsKey = "summary" | "awards"

export interface SectionData<T = baseItemSchema>  {
    name: string,
    columns: number,
    separateLinks: boolean,
    visible: boolean,

    id: SectionsKey,
    content: string,
    items?: Array<T>
}

export type baseItemSchema = {
    id: string,
    visible: boolean,
}