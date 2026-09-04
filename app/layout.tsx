import type { Metadata, Viewport } from 'next'
import {
  ORGANIZATION_JSON_LD,
  WEBSITE_JSON_LD,
} from '@/lib/metadata'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import JsonLd from './components/site/JsonLd'
import SiteShell from './components/site/SiteShell'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Divergent World — Create gravity.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="event-horizon">
      <body>
        <JsonLd data={ORGANIZATION_JSON_LD} />
        <JsonLd data={WEBSITE_JSON_LD} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
