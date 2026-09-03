import type { Metadata, Viewport } from 'next'
import { assetUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
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
    // Served from the shared public R2 bucket. Referenced by URL only — the
    // build never reaches out to the bucket, and a missing object degrades
    // to no social image rather than a failed build.
    images: [
      {
        url: assetUrl('opengraph.png'),
        width: 1200,
        height: 630,
        alt: 'Divergent World — technology, media, and design orbiting one institution.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [assetUrl('opengraph.png')],
  },
  robots: { index: true, follow: true },
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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
