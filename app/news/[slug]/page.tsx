import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NEWS, getNewsEntry } from '@/lib/news'
import PageIntro from '../../components/site/PageIntro'
import styles from '../../content.module.css'

export function generateStaticParams() {
  return NEWS.map((entry) => ({ slug: entry.slug }))
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
      <article className={styles.readingColumn}>
        <PageIntro
          eyebrow={entry.category}
          title={entry.title}
          introduction={entry.description}
          meta={entry.publishedAt}
        />
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
