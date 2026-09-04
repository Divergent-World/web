import Link from 'next/link'
import { PUBLIC_NAVIGATION, REVELATION_LINK } from '@/lib/navigation'
import { createEmailHref } from '@/lib/site'
import { DIVISIONS } from '@/lib/universe'
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
          {PUBLIC_NAVIGATION.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
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
          <nav aria-label="Company links">
            <p>Company</p>
            <Link href="/about">Overview</Link>
            {DIVISIONS.map((company) => (
              <Link href={`/companies/${company.slug}`} key={company.id}>
                {company.name}
              </Link>
            ))}
          </nav>
          <nav aria-label="Institutional links">
            <p>Institution</p>
            {PUBLIC_NAVIGATION.slice(1).map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
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
