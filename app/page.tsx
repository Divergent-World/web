import type { CSSProperties } from 'react'
import { publishedWorlds } from '@/lib/worlds'
import styles from './page.module.css'

/* Empty paths, sized as a percentage of the stage. They carry no data — they
   are the room the universe still has to grow into. */
const EMPTY_ORBITS = [44, 88, 100]

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.sky} aria-hidden="true">
        <div className={`${styles.starLayer} ${styles.starsStill}`} />
        <div className={`${styles.starLayer} ${styles.starsDrift}`} />
        <div className={`${styles.starLayer} ${styles.starsBright}`} />
      </div>

      <header className={styles.masthead}>
        <h1 className={styles.wordmark}>Divergent.World</h1>
        <p className={styles.intro}>
          A constellation of worlds, stories, and revelations.
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.stage}>
          <div aria-hidden="true">
            {EMPTY_ORBITS.map((size) => (
              <span
                key={size}
                className={
                  size === 100 ? `${styles.ring} ${styles.ringFaint}` : styles.ring
                }
                style={{ '--ring-size': `${size}%` } as CSSProperties}
              />
            ))}
            <span className={styles.halo} />
            <span className={styles.discOuter} />
            <span className={styles.disc} />
            <span className={styles.horizon} />
          </div>

          {publishedWorlds.map((world) => (
            <div
              key={world.id}
              className={styles.orbit}
              style={
                {
                  '--orbit-radius': `${world.orbit.radius}%`,
                  '--orbit-duration': `${world.orbit.duration}s`,
                  '--orbit-start': `${world.orbit.startAngle}deg`,
                  '--accent': world.accent,
                } as CSSProperties
              }
            >
              <a
                className={styles.world}
                href={world.href}
                aria-label={`Enter ${world.name}`}
                aria-describedby={`${world.id}-description`}
              >
                <span className={styles.body} aria-hidden="true" />
                <span className={styles.label}>
                  <span className={styles.name}>{world.name}</span>
                  <span className={styles.action}>
                    Enter {world.name}
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </span>
                </span>
                <span id={`${world.id}-description`} className="srOnly">
                  {world.description}
                </span>
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Divergent World</p>
      </footer>
    </div>
  )
}
