import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createArticleJsonLd, createPageMetadata } from '@/lib/metadata'
import { NEWS, getNewsEntry } from '@/lib/news'
import PageIntro from '../../components/site/PageIntro'
import JsonLd from '../../components/site/JsonLd'
import styles from '../../content.module.css'

export function generateStaticParams() {
  return NEWS.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const entry = getNewsEntry((await params).slug)
  if (!entry) return {}
  return createPageMetadata({
    title: entry.title,
    description: entry.description,
    path: `/news/${entry.slug}`,
    type: 'article',
  })
}

export default async function NewsEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getNewsEntry(slug)
  if (!entry) notFound()

  return (
    <main className={styles.page}>
      <JsonLd data={createArticleJsonLd(entry)} />
      <article className={styles.readingColumn}>
        <PageIntro
          eyebrow={entry.category}
          title={entry.title}
          introduction={entry.description}
        />
        <time className={styles.metadata} dateTime={entry.publishedAt}>
          {entry.publishedAt}
        </time>
        <div className={`${styles.prose} ${styles.articleBody}`}>
          {entry.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <nav className={styles.relatedLinks} aria-label="Related links">
          {entry.relatedLinks.map((link) => (
            link.external ? (
              <a href={link.href} key={link.href}>{link.label} ↗</a>
            ) : (
              <Link href={link.href} key={link.href}>{link.label}</Link>
            )
          ))}
          <Link href="/news">All News</Link>
        </nav>
      </article>
    </main>
  )
}
