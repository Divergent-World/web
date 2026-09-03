'use client'

import dynamic from 'next/dynamic'
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import {
  DIVERGENT_WORLD,
  DIVISIONS,
  getUniverseEntry,
  type UniverseEntryId,
} from '@/lib/universe'
import styles from '../page.module.css'
import UniverseErrorBoundary from './universe/UniverseErrorBoundary'
import { reduceUniverseSelection } from './universe/selection-model'

const UniverseScene = dynamic(
  () => import('./universe/UniverseScene'),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function UniverseExperience() {
  const [{ selectedId, focusSignal }, dispatch] = useReducer(
    reduceUniverseSelection,
    { selectedId: 'world', focusSignal: 0 },
  )
  const [reducedMotion, setReducedMotion] = useState(false)
  const [sceneInView, setSceneInView] = useState(true)
  const universeSection = useRef<HTMLElement>(null)
  const selected = getUniverseEntry(selectedId)
  const select = useCallback((id: UniverseEntryId) => dispatch(id), [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const section = universeSection.current
    if (!section || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => setSceneInView(entry.isIntersecting),
      { threshold: 0.01 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="universe"
      ref={universeSection}
      className={styles.universeSection}
      aria-label="Divergent World universe"
    >
      <div className={styles.cssUniverseFallback} aria-hidden="true" />
      <UniverseErrorBoundary fallback={null}>
        <UniverseScene
          entries={DIVISIONS}
          selectedId={selectedId}
          focusSignal={focusSignal}
          reducedMotion={reducedMotion}
          active={sceneInView}
          onSelect={select}
        />
      </UniverseErrorBoundary>

      <div className={styles.sceneIntro}>
        <p>Divergent World · Technology · Media · Design</p>
        <h1>Build what makes us more human.</h1>
        <p>Drag to orbit · Pinch to zoom · Scroll explores to the edge</p>
      </div>

      <nav
        className={styles.systemIndex}
        aria-label="Explore the Divergent World system"
      >
        {[DIVERGENT_WORLD, ...DIVISIONS].map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-controls="universe-annotation"
            aria-pressed={selectedId === entry.id}
            onClick={() => select(entry.id)}
          >
            <span
              aria-hidden="true"
              style={{ background: entry.accent }}
            />
            {entry.name.replace('Divergent ', '')}
          </button>
        ))}
      </nav>

      <article
        id="universe-annotation"
        className={styles.annotation}
        aria-live="polite"
      >
        <div className={styles.annotationSurface} key={selected.id}>
          <p>
            {selected.role} · {selected.status}
          </p>
          <h2>{selected.name}</h2>
          <p>{selected.mission}</p>
          {selected.projects.map((project) => (
            <a href={project.href} key={project.href}>
              Enter {project.name} ↗
            </a>
          ))}
        </div>
      </article>

      <a className={styles.scrollCue} href="#about">
        <span>Universe gestures explore</span>
        <strong>This strip continues to About ↓</strong>
      </a>
    </section>
  )
}
