export type customFieldType = {
    id: string,
    icon: string,
    name: string,
    value: string,
}

export type ResumeDataBasics = {
    name: string,
    headline: string,
    email: string | null,
    phone: string,
    location: string,
    url: string,
    customFields: customFieldType,
    picture: {
        url: string,
    },
    size: number,
    aspectRatio: number,
    borderRadius: number,
    effects: {
        hidden: boolean
    },
    border: boolean,
    grayscale: boolean,
}

export type SectionsKey = "summary" | "awards"

export type SectionData = {
    name: string,
    columns: number,
    separateLinks: boolean,
    visible: boolean,
    

    id: SectionsKey,
    content: string,
    items: baseItemSchema
}

export type baseItemSchema = {
    id: string,
    visible: boolean,
}

export type ResumeDataSections = {

}
export type ResumeDataMetadata = {
    template: "rhyhorn" | "default",
    layout: Array<Array<string>>, // pages -> columns -> sections
    css: {
        value: string,
        visible: boolean,
    },
    page: {
        margin: number,
        format: "a4" | "letter",
        options: {
            breakLine: boolean,
            pageNumbers: boolean,
        },
        theme: {
            background: string,
            text: string,
            primary: string,
        },
        typography: {
            font: {
                family: string,
                subset: string,
                variants: Array<string>,
                size: number,
            },
            lineHeight: number,
            hideIcons: boolean,
            underlineLinks: boolean,
        },
        notes: string,
    }
}

export type ResumeDataType = {
    basics: ResumeDataBasics,
    sections: ResumeDataSections,
    metadata: ResumeDataMetadata,
}