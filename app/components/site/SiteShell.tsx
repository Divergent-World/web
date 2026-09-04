import Link from 'next/link'
import {
  PUBLIC_NAVIGATION_GROUPS,
  REVELATION_LINK,
} from '@/lib/navigation'
import { createEmailHref } from '@/lib/site'
import styles from './site-shell.module.css'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.sky} aria-hidden="true">
        <div className={`${styles.starLayer} ${styles.starsStill}`} />
        <div className={`${styles.starLayer} ${styles.starsDrift}`} />
        <div className={`${styles.starLayer} ${styles.starsBright}`} />
      </div>

      <header className={styles.header} data-print-hide>
        <Link className={styles.wordmark} href="/">
          Divergent.World
        </Link>
        <nav className={styles.primaryNav} aria-label="Primary navigation">
          {PUBLIC_NAVIGATION_GROUPS.map((group) => (
            <details className={styles.navGroup} key={group.label}>
              <summary>{group.label}</summary>
              <div className={styles.navMenu}>
                {group.items.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <a href={REVELATION_LINK.href}>Revelation ↗</a>
        </nav>
      </header>

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer} data-print-hide>
        <div className={styles.footerIdentity}>
          <p>Divergent World</p>
          <p>One mission · Infinite time horizon</p>
          <a href={createEmailHref({ subject: 'Divergent World inquiry' })}>
            alirahman.dev@gmail.com
          </a>
        </div>
        <div className={styles.footerMap}>
          {PUBLIC_NAVIGATION_GROUPS.map((group) => (
            <nav aria-label={`${group.label} links`} key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
          <nav aria-label="External and publication links">
            <p>Elsewhere</p>
            <a href={REVELATION_LINK.href}>Revelation ↗</a>
            <a href="/rss.xml">RSS</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
