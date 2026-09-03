'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, type CSSProperties } from 'react'
import {
  DIVERGENT_WORLD,
  DIVISIONS,
  getUniverseEntry,
  type UniverseEntryId,
} from '@/lib/universe'
import styles from '../page.module.css'

const BlackHoleCanvas = dynamic(
  () => import('./black-hole/BlackHoleCanvas'),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function UniverseExperience() {
  const [selectedId, setSelectedId] = useState<UniverseEntryId>('world')
  const [reducedMotion, setReducedMotion] = useState(false)
  const selected = getUniverseEntry(selectedId)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <section
      className={styles.universeSection}
      aria-labelledby="universe-title"
    >
      <div className={styles.universeCopy}>
        <p className={styles.eyebrow}>One mission · Three active branches</p>
        <h2 id="universe-title">A world built to compound.</h2>
        <p>Choose a point in the system to see what it creates.</p>
      </div>

      <div className={styles.universeLayout}>
        <div className={styles.stage}>
          <div className={styles.cssBlackHole} aria-hidden="true" />
          <div className={styles.canvasLayer} aria-hidden="true">
            <BlackHoleCanvas reducedMotion={reducedMotion} />
          </div>

          <button
            type="button"
            className={styles.worldControl}
            aria-label="Show Divergent World overview"
            aria-controls="universe-detail"
            aria-expanded={selectedId === 'world'}
            onClick={() => setSelectedId(DIVERGENT_WORLD.id)}
          >
            <span>Divergent World</span>
          </button>

          {DIVISIONS.map((division) => (
            <div
              className={styles.orbit}
              data-selected={selectedId === division.id}
              key={division.id}
              style={
                {
                  '--orbit-radius': `${division.orbit?.radius}%`,
                  '--orbit-duration': `${division.orbit?.duration}s`,
                  '--orbit-start': `${division.orbit?.startAngle}deg`,
                  '--accent': division.accent,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className={styles.divisionControl}
                aria-controls="universe-detail"
                aria-expanded={selectedId === division.id}
                onClick={() => setSelectedId(division.id)}
              >
                <span className={styles.star} aria-hidden="true" />
                <span className={styles.divisionLabel}>{division.name}</span>
              </button>
            </div>
          ))}
        </div>

        <article
          id="universe-detail"
          className={styles.detailPanel}
          aria-live="polite"
        >
          <p className={styles.eyebrow} role="status">
            {selected.role} · {selected.status}
          </p>
          <h3>{selected.name}</h3>
          <p className={styles.mission}>{selected.mission}</p>
          <p>{selected.description}</p>
          {selected.projects.map((project) => (
            <a
              className={styles.portalLink}
              href={project.href}
              key={project.href}
            >
              <span>{project.description}</span>
              <span>
                Enter {project.name} <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </article>
      </div>
    </section>
  )
}
