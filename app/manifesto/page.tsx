import Link from 'next/link'
import { createPageMetadata } from '@/lib/metadata'
import PageIntro from '../components/site/PageIntro'
import styles from '../content.module.css'

export const metadata = createPageMetadata({
  title: 'Manifesto',
  description:
    'Create gravity by finding signal, building coherence, and advancing meaningful human frontiers.',
  path: '/manifesto',
})

export default function ManifestoPage() {
  return (
    <main className={styles.page}>
      <article className={styles.readingColumn}>
        <PageIntro
          eyebrow="Manifesto"
          title="Create gravity."
          introduction="Cut through noise. Concentrate what matters. Build at the frontiers that can expand human life and well-being."
        />

        <div className={styles.prose}>
          <p className={styles.aphorism}>
            Information is abundant. Coherence is rare.<br />
            Noise fragments energy. Signal directs it.
          </p>

          <section>
            <span className={styles.mu} aria-hidden="true">μ</span>
            <h2>Find mu.</h2>
            <p>
              Mu is meaningful signal: the truth, work, or direction worth
              following. Finding it requires subtraction—fewer contradictions,
              fewer empty inputs, and greater alignment between words and action.
            </p>
          </section>

          <section>
            <h2>Become coherent.</h2>
            <p>
              Coherence is not volume. It is alignment repeated until it
              becomes visible. A coherent person becomes trustworthy. Coherent
              people create a field.
            </p>
          </section>

          <section>
            <h2>Create gravity.</h2>
            <p>
              A field organized around meaningful work creates gravity.
              Gravity attracts talent, ideas, technology, and capital toward a
              frontier that matters.
            </p>
          </section>

          <section>
            <h2>Attract and transform.</h2>
            <p>
              A black hole attracts and transforms. So should an institution.
              What enters the field should leave clearer, steadier, and more
              capable than it arrived.
            </p>
          </section>

          <section>
            <h2>Advance the frontier.</h2>
            <p>
              The frontier is advanced by people who think, make, test, learn,
              and follow through. We use AI to increase capability without
              surrendering judgment, creativity, leadership, or ethics.
            </p>
          </section>

          <section>
            <h2>Build together.</h2>
            <p>
              Coherence grows in company. We become more capable by building
              with people who strengthen the signal and help meaningful work endure.
            </p>
          </section>

          <p className={styles.aphorism}>
            Simplify. Amplify. Attract. Transform.
          </p>

          <div className={styles.actions}>
            <Link href="/careers">Careers</Link>
            <Link href="/about">About Divergent World</Link>
          </div>
        </div>
      </article>
    </main>
  )
}
