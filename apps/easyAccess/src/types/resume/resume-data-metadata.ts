import { SectionsKey } from "./sections/base";

export type ResumeDataMetadata = {
    template: "rhyhorn" | "default",
    layout: Array<Array<Array<SectionsKey>>>, // pages -> columns -> sections
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