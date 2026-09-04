import Link from 'next/link'
import { DIVISIONS } from '@/lib/universe'
import PageIntro from '../components/site/PageIntro'
import styles from '../content.module.css'

export default function CompaniesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wideColumn}>
        <PageIntro
          eyebrow="Our work"
          title="One institution. Five companies."
          introduction="Technology creates capability. Media creates culture. Design creates experience. Ventures allocates capital. Properties creates permanence. Each company exists to strengthen the others."
        />

        <div className={styles.sequence} aria-label="Institutional sequence">
          {DIVISIONS.map((company) => <span key={company.id}>{company.role}</span>)}
        </div>

        <div className={styles.index}>
          {DIVISIONS.map((company) => (
            <article className={styles.indexRow} key={company.id}>
              <div className={styles.indexMeta}>
                <span>{company.role}</span>
                <span className={styles.status}>{company.status}</span>
              </div>
              <h2>
                <Link href={`/companies/${company.slug}`}>{company.name}</Link>
              </h2>
              <p>{company.mission}</p>
              <Link className={styles.indexLink} href={`/companies/${company.slug}`}>
                Explore
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/manifesto">Read the Manifesto</Link>
        </div>
      </div>
    </main>
  )
}
