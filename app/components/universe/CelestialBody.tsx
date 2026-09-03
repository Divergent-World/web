'use client'

import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import type {
  UniverseEntry,
  UniverseEntryId,
} from '../../../lib/universe'

type Props = {
  entry: UniverseEntry
  onSelect: (id: UniverseEntryId) => void
  register: (id: UniverseEntryId, node: THREE.Group | null) => void
}

export default function CelestialBody({
  entry,
  onSelect,
  register,
}: Props) {
  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(entry.id)
  }

  return (
    <group ref={(node) => register(entry.id, node)}>
      <mesh onClick={select}>
        <sphereGeometry args={[0.42, 24, 16]} />
        <meshBasicMaterial color={entry.accent} toneMapped={false} />
      </mesh>

      <mesh raycast={() => null}>
        <sphereGeometry args={[0.68, 18, 12]} />
        <meshBasicMaterial
          color={entry.accent}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh onClick={select}>
        <sphereGeometry args={[1.35, 12, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}
