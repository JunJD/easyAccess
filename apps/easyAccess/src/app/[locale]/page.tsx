import { redirect } from "next/navigation"
import { LocaleMode } from "apps/easyAccess/src/types/locale"

export default async function redirectPage({ params }: { params: { locale: LocaleMode } }) {
  redirect(`${params.locale}/dashboard/resumes`)
}