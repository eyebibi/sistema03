import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './i18n/config'
import { getLocaleFromHeaders } from './i18n/locale-detector'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const localeFromPath = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (localeFromPath) {
    const cleanPath = pathname.replace(`/${localeFromPath}`, '') || '/'
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-clean-path', cleanPath)

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    })
    response.cookies.set('locale', localeFromPath)
    return response
  }

  const locale = getLocaleFromHeaders(request.headers)
  request.nextUrl.pathname = `/${locale}${pathname}`
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set('locale', locale)
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|opengraph-image\\.png|robots\\.txt|sitemap\\.xml|.*\\.webp|.*\\.png).*)',
  ],
}
