import Link from 'next/link'
import { NEWS } from '@/lib/news'
import PageIntro from '../components/site/PageIntro'
import styles from '../content.module.css'

export default function NewsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wideColumn}>
        <PageIntro
          eyebrow="News"
          title="Latest signal."
          introduction="Announcements, articles, releases, and updates from across Divergent World."
        />

        <div className={styles.index}>
          {NEWS.map((entry) => (
            <article className={styles.indexRow} key={entry.slug}>
              <div className={styles.indexMeta}>
                <span>{entry.category}</span>
                <time className={styles.metadata} dateTime={entry.publishedAt}>
                  {entry.publishedAt}
                </time>
              </div>
              <h2>
                <Link href={`/news/${entry.slug}`}>{entry.title}</Link>
              </h2>
              <p>{entry.description}</p>
              <Link className={styles.indexLink} href={`/news/${entry.slug}`}>
                Read
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
