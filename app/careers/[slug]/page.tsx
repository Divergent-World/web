import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CAREER_ROLES, getCareerRole } from '@/lib/careers'
import { createPageMetadata } from '@/lib/metadata'
import PageIntro from '../../components/site/PageIntro'
import styles from '../../content.module.css'

export function generateStaticParams() {
  return CAREER_ROLES.map((role) => ({ slug: role.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const role = getCareerRole((await params).slug)
  if (!role) return {}
  return createPageMetadata({
    title: role.title,
    description: role.summary,
    path: `/careers/${role.slug}`,
  })
}

export default async function CareerRolePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const role = getCareerRole(slug)
  if (!role) notFound()

  return (
    <main className={styles.page}>
      <article className={styles.readingColumn}>
        <PageIntro
          eyebrow={`${role.status} · ${role.callout}`}
          title={role.title}
          introduction={role.summary}
        />

        <div className={styles.prose}>
          <section>
            <h2>The work</h2>
            <ul>
              {role.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section>
            <h2>What matters</h2>
            <ul>
              {role.qualities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section>
            <h2>Express interest</h2>
            <p>
              This is a transparent future opening, not an active hiring
              process. There is no announced start date. Early expressions of
              interest are welcome and will help inform the role as Divergent
              World grows.
            </p>
            <p>Please include:</p>
            <ul>
              {role.interestMaterials.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.actions}>
              <a href={role.emailHref}>Express interest by email</a>
              <Link href="/careers">All Careers</Link>
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
