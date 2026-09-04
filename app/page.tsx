import Image from 'next/image'
import Link from 'next/link'
import { NEWS } from '@/lib/news'
import { DIVISIONS } from '@/lib/universe'
import UniverseExperience from './components/UniverseExperience'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <UniverseExperience />

      <section
        id="overview"
        className={styles.overview}
        aria-labelledby="overview-title"
      >
        <header className={styles.overviewIntro}>
          <p className={styles.eyebrow}>Divergent World</p>
          <h2 id="overview-title">Cut through the noise.</h2>
          <p className={styles.editorialLede}>
            Information is abundant. Coherence is rare. We concentrate people,
            technology, culture, design, capital, and place around work that
            expands human capability and well-being.
          </p>
          <div className={styles.editorialActions}>
            <Link href="/about">Explore the company</Link>
            <Link href="/manifesto">Read the Manifesto</Link>
            <Link href="/careers">Careers</Link>
          </div>
        </header>

        <div className={styles.overviewGrid}>
          <section aria-labelledby="companies-title">
            <p className={styles.eyebrow}>The institution</p>
            <h3 id="companies-title">One institution. Five companies.</h3>
            <div className={styles.companyIndex}>
              {DIVISIONS.map((company) => (
                <article className={styles.companyRow} key={company.id}>
                  <div className={styles.companyMeta}>
                    <span>{company.role}</span>
                    <span>{company.status}</span>
                  </div>
                  <h4>
                    <Link href={`/companies/${company.slug}`}>{company.name}</Link>
                  </h4>
                  <p>{company.mission}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.latest} aria-labelledby="latest-title">
            <p className={styles.eyebrow}>News</p>
            <h3 id="latest-title">Latest signal.</h3>
            <div className={styles.newsIndex}>
              {NEWS.slice(0, 3).map((entry) => (
                <article className={styles.newsRow} key={entry.slug}>
                  <div className={styles.companyMeta}>
                    <span>{entry.category}</span>
                    <time dateTime={entry.publishedAt}>{entry.publishedAt}</time>
                  </div>
                  <h4>
                    <Link href={`/news/${entry.slug}`}>{entry.title}</Link>
                  </h4>
                </article>
              ))}
            </div>
            <div className={styles.editorialActions}>
              <Link href="/news">All news</Link>
            </div>
          </section>
        </div>
      </section>

      <section
        id="about"
        className={styles.founder}
        aria-labelledby="founder-title"
      >
        <div className={styles.founderVisual}>
          <Image
            src="/images/ali-rahman.png"
            alt="Ali Rahman, founder of Divergent World."
            width={1024}
            height={1024}
            sizes="(min-width: 60rem) 58vw, 100vw"
            className={styles.founderImage}
          />
        </div>
        <div className={styles.founderCopy}>
          <p>The founder</p>
          <h2 id="founder-title">Founded by Ali Rahman.</h2>
          <p>
            Ali Rahman founded Divergent World to build one coherent
            institution across technology, media, design, capital, and place
            — and to help capable people do consequential work together.
          </p>
          <Link href="/about">Read about Divergent World</Link>
        </div>
      </section>
    </main>
  )
}
