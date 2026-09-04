import Image from 'next/image'
import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'
import { createEmailHref } from '@/lib/site'
import { DIVISIONS } from '@/lib/universe'
import PageIntro from '../components/site/PageIntro'
import styles from '../content.module.css'

export const metadata = createPageMetadata({
  title: 'About',
  description:
    'Learn why Divergent World exists, how the institution works, and how to build or invest with us.',
  path: '/about',
})

const PRINCIPLES = [
  ['Simplicity', 'Remove what does not strengthen the work.'],
  ['Coherence', 'Align words, decisions, systems, and behavior.'],
  ['Ownership', 'Take responsibility for the whole outcome, not only the assigned part.'],
  ['Leverage', 'Use technology and clear systems to multiply human judgment.'],
  ['Compounding', 'Build knowledge, trust, and capability that become more valuable with time.'],
  ['Excellence', 'Care about the smallest detail because every detail broadcasts a standard.'],
  ['Long horizon', 'Make today useful without sacrificing what should endure.'],
] as const

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wideColumn}>
        <PageIntro
          eyebrow="Company"
          title="Build one coherent institution."
          introduction="Divergent World combines technology, media, design, capital, and place to expand human capability, life, and well-being."
        />

        <section id="companies" className={styles.section}>
          <p className={styles.eyebrow}>The institution</p>
          <h2>One institution. Five companies.</h2>
          <p>
            Technology creates capability. Media creates culture. Design
            creates experience. Ventures allocates capital. Properties creates
            permanence. Each company exists to strengthen the others.
          </p>
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
                <h3>
                  <Link href={`/companies/${company.slug}`}>{company.name}</Link>
                </h3>
                <p>{company.mission}</p>
                <Link className={styles.indexLink} href={`/companies/${company.slug}`}>
                  Explore
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.actions}>
            <Link href="/manifesto">Read the Manifesto</Link>
            <Link href="/news">News</Link>
            <Link href="/careers">Careers</Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Why we exist</h2>
          <p>
            Divergent World is a learning organization for doers working at
            the frontiers of human progress. We build the conditions in which
            capable people can think clearly, coordinate deeply, and turn
            meaningful ideas into durable reality.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>How we work</p>
          <div className={styles.principles}>
            {PRINCIPLES.map(([name, definition]) => (
              <div key={name}>
                <h3>{name}</h3>
                <p>{definition}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.founderComposition}`}>
          <Image
            src="/images/ali-rahman.png"
            alt="Ali Rahman, founder of Divergent World."
            width={1024}
            height={1024}
            sizes="(min-width: 60rem) 58vw, 100vw"
            className={styles.founderImage}
          />
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>The founder</p>
            <h2>Founded by Ali Rahman.</h2>
            <p>
              Ali founded Divergent World to build one coherent institution
              across technology, media, design, capital, and place—and to help
              capable people do consequential work together.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Build with us</h2>
          <p>
            We welcome thoughtful signals from future teammates, founders,
            collaborators, and long-term investors who share the mission.
          </p>
          <div className={styles.actions}>
            <Link href="/careers">Careers</Link>
            <a href={createEmailHref({ subject: 'Divergent World — founder or collaborator inquiry' })}>
              Founders and collaborators
            </a>
            <a href={createEmailHref({ subject: 'Divergent World — investor inquiry' })}>
              Investors
            </a>
          </div>
          <h3>Executive Assistant · Future opening</h3>
          <p>
            Expressions of interest are welcome for a future role supporting
            Ali Rahman and the operating rhythm of Divergent World.
          </p>
          <div className={styles.actions}>
            <Link href="/careers">View Careers</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
