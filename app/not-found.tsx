import Link from 'next/link'
import PageIntro from './components/site/PageIntro'
import styles from './content.module.css'

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.readingColumn}>
        <PageIntro
          eyebrow="404"
          title="Signal lost."
          introduction="This route does not exist. Return to Divergent World or continue through the institution."
        />
        <nav className={styles.actions} aria-label="Continue browsing">
          <Link href="/">Home</Link>
          <Link href="/companies">Our work</Link>
          <Link href="/news">News</Link>
          <Link href="/careers">Careers</Link>
        </nav>
      </div>
    </main>
  )
}
