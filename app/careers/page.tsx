import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'
import { CAREER_ROLES } from '@/lib/careers'
import { createEmailHref } from '@/lib/site'
import PageIntro from '../components/site/PageIntro'
import styles from '../content.module.css'

export const metadata = createPageMetadata({
  title: 'Careers',
  description:
    'Explore future roles and expressions of interest at Divergent World.',
  path: '/careers',
})

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wideColumn}>
        <PageIntro
          eyebrow="Careers"
          title="Do consequential work with coherent people."
          introduction="Divergent World is being built for people who think clearly, act deliberately, learn quickly, and help others become more capable."
        />

        <section className={styles.section}>
          <h2>Why Divergent World</h2>
          <p>
            We are building an institution where technology and the humanities
            reinforce one another—and where serious ambition is made calmer,
            clearer, and more useful through collaboration.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How we work</h2>
          <p>
            Small trusted rooms. Clear ownership. Direct communication. Deep
            use of AI. High standards. Long horizons. We value people who can
            reduce noise without reducing possibility.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Who thrives here</h2>
          <p>
            Coherent builders, grounded creatives, emotionally steady
            operators, and long-term thinkers who strengthen both the work and
            the people around them.
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.eyebrow}>Future roles</p>
          <div className={styles.index}>
            {CAREER_ROLES.map((role) => (
              <article className={styles.indexRow} key={role.slug}>
                <div className={styles.indexMeta}>
                  <span>{role.status}</span>
                  <span className={styles.status}>{role.callout}</span>
                </div>
                <h3>
                  <Link href={`/careers/${role.slug}`}>{role.title}</Link>
                </h3>
                <p>{role.summary}</p>
                <Link className={styles.indexLink} href={`/careers/${role.slug}`}>
                  View role
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>No listed role?</h2>
          <p>
            If your work clearly belongs in this field, send a concise signal.
            General expressions of interest are welcome.
          </p>
          <div className={styles.actions}>
            <a href={createEmailHref({ subject: 'Divergent World - general career interest' })}>
              Express interest
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
