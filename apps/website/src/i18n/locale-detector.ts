import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from './config'

export function getLocaleFromHeaders(headers: Headers): string {
  const negotiatorHeaders: Record<string, string> = {}
  headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, [...locales], defaultLocale)
}
