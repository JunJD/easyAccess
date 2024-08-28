import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { LocaleMode } from './types/locale'

export const locales: Array<LocaleMode> = ['en', 'fr', 'ja', 'de', 'ru', 'es',"fa","zh"]
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as LocaleMode)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})