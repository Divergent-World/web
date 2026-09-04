import Image from 'next/image'
import Link from 'next/link'
import { createEmailHref } from '@/lib/site'
import { NEWS } from '@/lib/news'
import { DIVISIONS } from '@/lib/universe'
import UniverseExperience from './components/UniverseExperience'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <UniverseExperience />

      <section
        id="signal"
        className={`${styles.editorialSection} ${styles.signalSection}`}
        aria-labelledby="signal-title"
      >
        <p className={styles.eyebrow}>The signal</p>
        <h2 id="signal-title">Cut through the noise.</h2>
        <p className={styles.editorialLede}>
          Information is abundant. Coherence is rare. Divergent World builds
          systems, rooms, products, and environments that help people find the
          signal, align their effort, and create meaningful things together.
        </p>
      </section>

      <section
        id="institution"
        className={styles.editorialSection}
        aria-labelledby="institution-title"
      >
        <p className={styles.eyebrow}>Our work</p>
        <h2 id="institution-title">One institution. Five companies.</h2>
        <div className={styles.companyIndex}>
          {DIVISIONS.map((company) => (
            <article className={styles.companyRow} key={company.id}>
              <div className={styles.companyMeta}>
                <span>{company.role}</span>
                <span>{company.status}</span>
              </div>
              <h3>{company.name}</h3>
              <p>{company.mission}</p>
              <Link href={`/companies/${company.slug}`}>
                Explore {company.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="latest"
        className={styles.editorialSection}
        aria-labelledby="latest-title"
      >
        <p className={styles.eyebrow}>News</p>
        <h2 id="latest-title">Latest signal.</h2>
        <div className={styles.newsIndex}>
          {NEWS.slice(0, 3).map((entry) => (
            <article className={styles.newsRow} key={entry.slug}>
              <div className={styles.companyMeta}>
                <span>{entry.category}</span>
                <time dateTime={entry.publishedAt}>{entry.publishedAt}</time>
              </div>
              <h3>
                <Link href={`/news/${entry.slug}`}>{entry.title}</Link>
              </h3>
              <p>{entry.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="invitation"
        className={`${styles.editorialSection} ${styles.invitation}`}
        aria-labelledby="invitation-title"
      >
        <p className={styles.eyebrow}>Enter the field</p>
        <h2 id="invitation-title">
          Build with people who strengthen the signal.
        </h2>
        <div className={styles.editorialActions}>
          <Link href="/careers">Careers</Link>
          <a href={createEmailHref({ subject: 'Divergent World — founder or collaborator inquiry' })}>
            Founders and collaborators
          </a>
          <a href={createEmailHref({ subject: 'Divergent World — investor inquiry' })}>
            Investors
          </a>
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
