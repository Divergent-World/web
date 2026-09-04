import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createPageMetadata } from '@/lib/metadata'
import { createEmailHref } from '@/lib/site'
import { DIVISIONS, getCompanyBySlug } from '@/lib/universe'
import PageIntro from '../../components/site/PageIntro'
import styles from '../../content.module.css'

export function generateStaticParams() {
  return DIVISIONS.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const company = getCompanyBySlug((await params).slug)
  if (!company) return {}
  return createPageMetadata({
    title: company.name,
    description: company.description,
    path: `/companies/${company.slug}`,
  })
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  if (!company) notFound()

  return (
    <main className={styles.page}>
      <div className={styles.readingColumn}>
        <PageIntro
          eyebrow={`${company.role} · ${company.status}`}
          title={company.name}
          introduction={company.description}
        />

        <div className={styles.prose}>
          <section>
            <h2>Purpose</h2>
            <p>{company.purpose}</p>
          </section>
          <section>
            <h2>The frontier</h2>
            <p>{company.frontier}</p>
          </section>
          <section>
            <h2>Role in the institution</h2>
            <p>{company.contribution}</p>
          </section>
          <section>
            <h2>Long-term direction</h2>
            <p>{company.direction}</p>
          </section>

          {company.projects.length ? (
            <section>
              <h2>Published work</h2>
              {company.projects.map((project) => (
                <div key={project.href}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className={styles.actions}>
                    <a href={project.href}>Enter {project.name} ↗</a>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <section>
              <h2>Current signal</h2>
              <p>
                {company.status === 'Future horizon'
                  ? `${company.name} belongs to the long-term horizon. We name the direction without pretending the company is active today.`
                  : `${company.name} is forming deliberately. Public work will appear here when it is ready.`}
              </p>
              <div className={styles.actions}>
                <Link href="/about">About Divergent World</Link>
                <a href={createEmailHref({ subject: `${company.name} inquiry` })}>
                  Inquire
                </a>
              </div>
            </section>
          )}
        </div>

        <div className={styles.actions}>
          <Link href="/companies">All five companies</Link>
        </div>
      </div>
    </main>
  )
}
