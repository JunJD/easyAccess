import { customFieldType } from "apps/easyAccess/src/types/resume/custom-field-type"
import { UrlObj } from "apps/easyAccess/src/types/resume/utils"

export interface ResumeDataBasics  {
    name: string,
    headline: string,
    email: string | null,
    phone: string,
    location: string,
    url: UrlObj,
    customFields: Array<customFieldType>,
    picture: {
        url: string,
        size: number,
        aspectRatio: number,
        borderRadius: number,
        effects: {
          hidden: boolean,
          border: boolean,
          grayscale: boolean,
        },
    }
}