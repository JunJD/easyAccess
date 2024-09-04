import { customFieldType } from "apps/easyAccess/src/types/resume/custom-field-type"

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