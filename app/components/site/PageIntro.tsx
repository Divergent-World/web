import styles from './PageIntro.module.css'

type PageIntroProps = {
  eyebrow: string
  title: string
  introduction: string
  meta?: string
}

export default function PageIntro({
  eyebrow,
  title,
  introduction,
  meta,
}: PageIntroProps) {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lede}>{introduction}</p>
      {meta ? <p className={styles.metadata}>{meta}</p> : null}
    </header>
  )
}
