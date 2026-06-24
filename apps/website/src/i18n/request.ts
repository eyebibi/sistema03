import 'server-only'
import { type Locale } from './config'

const dictionaries = {
  'en-US': () => import('@/messages/en-US.json').then((module) => module.default),
  'pt-BR': () => import('@/messages/pt-BR.json').then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
