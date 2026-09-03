'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type {
  UniverseEntry,
  UniverseEntryId,
} from '../../../lib/universe'
import { BlackHole } from '../black-hole/BlackHole'
import { BLACK_HOLE_RENDER_PROFILE } from '../black-hole/render-profile'
import styles from '../../page.module.css'
import CameraRig from './CameraRig'
import CelestialBody from './CelestialBody'
import {
  OVERVIEW_CAMERA,
  advanceOrbitPhase,
  createSeededHaloPositions,
  shouldSelectFromPointerRelease,
} from './scene-model'

export type UniverseSceneProps = {
  entries: readonly UniverseEntry[]
  selectedId: UniverseEntryId
  focusSignal: number
  reducedMotion: boolean
  active: boolean
  onSelect: (id: UniverseEntryId) => void
}

type Registry = React.RefObject<Map<UniverseEntryId, THREE.Object3D>>

function BackgroundStars() {
  const positions = useMemo(
    () => new Float32Array(createSeededHaloPositions(720)),
    [],
  )

  return (
    <points raycast={() => null} scale={4}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f4dfbe"
        size={0.08}
        transparent
        opacity={0.34}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

function OrbitPath({ radius, color }: { radius: number; color: string }) {
  const positions = useMemo(() => {
    const points = new Float32Array(128 * 3)

    for (let index = 0; index < 128; index += 1) {
      const angle = (index / 128) * Math.PI * 2
      points[index * 3] = Math.cos(angle) * radius
      points[index * 3 + 2] = Math.sin(angle) * radius
    }

    return points
  }, [radius])

  return (
    <lineLoop raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        depthWrite={false}
        toneMapped={false}
      />
    </lineLoop>
  )
}

type OrbitingProps = {
  entry: UniverseEntry
  reducedMotion: boolean
  onSelect: (id: UniverseEntryId) => void
  register: (id: UniverseEntryId, node: THREE.Group | null) => void
}

function OrbitingDivision({
  entry,
  reducedMotion,
  onSelect,
  register,
}: OrbitingProps) {
  const arm = useRef<THREE.Group>(null)
  const orbit = entry.orbit!
  const initialPhase = THREE.MathUtils.degToRad(orbit.startAngle)
  const phase = useRef(initialPhase)

  useFrame((_, delta) => {
    phase.current = advanceOrbitPhase(
      phase.current,
      delta,
      orbit.period,
      reducedMotion,
    )
    if (arm.current) arm.current.rotation.y = phase.current
  })

  return (
    <group
      rotation={[
        THREE.MathUtils.degToRad(orbit.inclination),
        0,
        0,
      ]}
    >
      <OrbitPath radius={orbit.distance} color={entry.accent} />
      <group ref={arm} rotation={[0, initialPhase, 0]}>
        <group position={[orbit.distance, 0, 0]}>
          <CelestialBody
            entry={entry}
            onSelect={onSelect}
            register={register}
          />
        </group>
      </group>
    </group>
  )
}

type SceneContentsProps = Omit<UniverseSceneProps, 'active'> & {
  objectRegistry: Registry
}

function SceneContents({
  entries,
  selectedId,
  focusSignal,
  reducedMotion,
  onSelect,
  objectRegistry,
}: SceneContentsProps) {
  const registerObject = (
    id: UniverseEntryId,
    node: THREE.Group | null,
  ) => {
    if (node) objectRegistry.current.set(id, node)
    else objectRegistry.current.delete(id)
  }

  const selectWorld = (event: ThreeEvent<MouseEvent>) => {
    if (!shouldSelectFromPointerRelease(event.delta)) return
    event.stopPropagation()
    onSelect('world')
  }

  return (
    <>
      <BackgroundStars />
      <group ref={(node) => registerObject('world', node)}>
        <BlackHole reducedMotion={reducedMotion} />
        <mesh name="black-hole-hit-target" onClick={selectWorld}>
          <sphereGeometry args={[4.6, 16, 12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      {entries
        .filter((entry) => entry.orbit)
        .map((entry) => (
          <OrbitingDivision
            key={entry.id}
            entry={entry}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
            register={registerObject}
          />
        ))}

      <CameraRig
        selectedId={selectedId}
        focusSignal={focusSignal}
        reducedMotion={reducedMotion}
        objectRegistry={objectRegistry}
      />
    </>
  )
}

export default function UniverseScene(props: UniverseSceneProps) {
  const objectRegistry = useRef(new Map<UniverseEntryId, THREE.Object3D>())
  const [documentVisible, setDocumentVisible] = useState(true)

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden)
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () =>
      document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  const { active, ...sceneProps } = props

  return (
    <Canvas
      className={styles.universeCanvas}
      aria-hidden="true"
      dpr={[1, BLACK_HOLE_RENDER_PROFILE.maxDpr]}
      frameloop={active && documentVisible ? 'always' : 'never'}
      camera={{
        fov: OVERVIEW_CAMERA.fov,
        near: 0.1,
        far: 120,
        position: OVERVIEW_CAMERA.position,
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <SceneContents {...sceneProps} objectRegistry={objectRegistry} />
    </Canvas>
  )
}
