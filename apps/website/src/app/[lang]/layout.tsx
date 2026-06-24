import { type Locale } from '@/i18n/config'
import { getDictionary, hasLocale } from '@/i18n/request'
import { LocaleProvider } from '@/i18n/locale-context'
import { notFound } from 'next/navigation'
import { config } from '@/config/config'
import { headers } from 'next/headers'
import { locales } from '@/i18n/config'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'pt-BR' }]
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const headersList = await headers()
  const cleanPath = headersList.get('x-clean-path') || '/'

  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = `${config.baseUrl}/${locale}${cleanPath}`
  }
  languages['x-default'] = `${config.baseUrl}/en-US${cleanPath}`

  return {
    title: {
      default: dict.common.siteTitle,
      template: `%s | ${dict.common.discly}`,
    },
    description: dict.common.siteDescription,
    keywords: dict.metadata.keywords,
    metadataBase: new URL(config.baseUrl!),
    openGraph: {
      type: 'website' as const,
      locale: dict.metadata.ogLocale,
      url: config.baseUrl,
      title: dict.common.siteTitle,
      description: dict.common.siteDescription,
      siteName: dict.common.discly,
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: dict.common.siteTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: dict.common.siteTitle,
      description: dict.common.siteDescription,
      images: ['/opengraph-image.png'],
    },
    icons: {
      icon: '/favicon.ico',
    },
    alternates: {
      canonical: `${config.baseUrl}/${lang}${cleanPath}`,
      languages,
    },
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return <LocaleProvider locale={lang as Locale}>{children}</LocaleProvider>
}
