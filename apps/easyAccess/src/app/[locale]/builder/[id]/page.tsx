import { LocaleMode } from "apps/easyAccess/src/types/locale"
import { redirect } from "next/navigation"


export default async function redirectPage({ params }: { params: { locale: LocaleMode, id: string } }) {
  redirect(`${params.id}/basic-info`)
}