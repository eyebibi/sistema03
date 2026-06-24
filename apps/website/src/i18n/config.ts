export const locales = ['en-US', 'pt-BR'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en-US'
