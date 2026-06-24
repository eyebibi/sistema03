'use client'

import { createContext, useContext } from 'react'
import type { Locale } from './config'

type LocaleContextType = {
  locale: Locale
  country: string
}

const LocaleContext = createContext<LocaleContextType | null>(null)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const country = locale.split('-')[1]

  return (
    <LocaleContext.Provider value={{ locale, country }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
