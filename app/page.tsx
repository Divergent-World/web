import Image from 'next/image'
import { PUBLIC_NAVIGATION } from '@/lib/navigation'
import UniverseExperience from './components/UniverseExperience'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.sky} aria-hidden="true">
        <div className={`${styles.starLayer} ${styles.starsStill}`} />
        <div className={`${styles.starLayer} ${styles.starsDrift}`} />
        <div className={`${styles.starLayer} ${styles.starsBright}`} />
      </div>

      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#universe">
          Divergent.World
        </a>
        <nav aria-label="Primary navigation">
          {PUBLIC_NAVIGATION.map(({ label, href, external }) => (
            <a href={href} key={href}>
              {label}
              {external ? ' ↗' : ''}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <UniverseExperience />

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
              Ali founded Divergent World to build one enduring institution
              across technology, media, and design—in service of human
              potential.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerIdentity}>
          <p>Divergent World</p>
          <p>One mission · Infinite time horizon</p>
        </div>
        <nav aria-label="Footer navigation">
          {PUBLIC_NAVIGATION.map(({ label, href, external }) => (
            <a href={href} key={href}>
              {label}
              {external ? ' ↗' : ''}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  )
}
