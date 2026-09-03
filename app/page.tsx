import Image from 'next/image'
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

      <header className={styles.hero}>
        <p className={styles.wordmark}>Divergent.World</p>
        <div className={styles.heroStatement}>
          <p className={styles.eyebrow}>Technology · Media · Design</p>
          <h1>Build what makes us more human.</h1>
          <p>
            Divergent World is an enduring institution creating technologies,
            stories, and products that increase human potential.
          </p>
        </div>
        <a className={styles.skipLink} href="#universe-title">
          Explore the world ↓
        </a>
      </header>

      <main>
        <UniverseExperience />

        <section className={styles.founder} aria-labelledby="founder-title">
          <div className={styles.founderImageFrame}>
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
            <p className={styles.eyebrow}>The founder</p>
            <h2 id="founder-title">Founded by Ali Rahman.</h2>
            <p>
              Ali founded Divergent World to build one enduring institution
              across technology, media, and design—an ecosystem made to expand
              human capability, creativity, and independence.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Divergent World</p>
        <p>One mission · Infinite time horizon</p>
      </footer>
    </div>
  )
}
