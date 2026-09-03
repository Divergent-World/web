'use client'

import { Canvas } from '@react-three/fiber'
import { BlackHole } from './BlackHole'
import { BLACK_HOLE_RENDER_PROFILE as profile } from './render-profile'

type BlackHoleCanvasProps = {
  reducedMotion: boolean
}

export default function BlackHoleCanvas({
  reducedMotion,
}: BlackHoleCanvasProps) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, profile.maxDpr]}
      camera={{ fov: 38, near: 0.01, far: 80, position: [0, 8.2, 15.8] }}
      fallback={null}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <BlackHole reducedMotion={reducedMotion} />
    </Canvas>
  )
}
