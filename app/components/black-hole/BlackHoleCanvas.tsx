'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  ACCRETION_FRAGMENT_SHADER,
  BLACK_HOLE_VERTEX_SHADER,
  LENSING_FRAGMENT_SHADER,
} from './black-hole-shaders'
import { BLACK_HOLE_RENDER_PROFILE as profile } from './render-profile'

type BlackHoleCanvasProps = {
  reducedMotion: boolean
}

type DiskProfile = typeof profile.hotDisk | typeof profile.dustDisk

function createDiskUniforms(
  disk: DiskProfile,
  reducedMotion: boolean,
) {
  return {
    uTime: { value: 0 },
    uReducedMotion: { value: reducedMotion ? 1 : 0 },
    uInnerRadius: { value: disk.innerRadius },
    uOuterRadius: { value: disk.outerRadius },
    uLayer: { value: disk.layer },
    uMotionRate: { value: (Math.PI * 2) / disk.period },
    uDopplerMinimum: { value: profile.doppler.minimum },
    uDopplerMaximum: { value: profile.doppler.maximum },
    uInnerColor: { value: new THREE.Color(profile.palette.inner) },
    uMidColor: { value: new THREE.Color(profile.palette.mid) },
    uOuterColor: { value: new THREE.Color(profile.palette.outer) },
    uRimColor: { value: new THREE.Color(profile.palette.rim) },
  }
}

function BlackHole({ reducedMotion }: BlackHoleCanvasProps) {
  const hotMaterial = useRef<THREE.ShaderMaterial>(null)
  const dustMaterial = useRef<THREE.ShaderMaterial>(null)
  const hotUniforms = useMemo(
    () => createDiskUniforms(profile.hotDisk, reducedMotion),
    [reducedMotion],
  )
  const dustUniforms = useMemo(
    () => createDiskUniforms(profile.dustDisk, reducedMotion),
    [reducedMotion],
  )
  const lensUniforms = useMemo(
    () => ({
      uInnerColor: { value: new THREE.Color(profile.palette.inner) },
      uMidColor: { value: new THREE.Color(profile.palette.mid) },
      uRimColor: { value: new THREE.Color(profile.palette.rim) },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (!reducedMotion) {
      const step = Math.min(delta, 0.1)
      hotMaterial.current!.uniforms.uTime.value += step
      dustMaterial.current!.uniforms.uTime.value += step
    }
  })

  return (
    <group rotation={[-0.08, 0.16, 0]}>
      <mesh name="event-horizon">
        <sphereGeometry
          args={[
            profile.eventHorizon.radius,
            profile.eventHorizon.widthSegments,
            profile.eventHorizon.heightSegments,
          ]}
        />
        <meshBasicMaterial color="#000000" toneMapped={false} />
      </mesh>

      <mesh name="accretion-fallback" rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[
            profile.fallbackDisk.innerRadius,
            profile.fallbackDisk.outerRadius,
            profile.fallbackDisk.angularSegments,
          ]}
        />
        <meshBasicMaterial
          color={profile.palette.mid}
          transparent
          opacity={profile.fallbackDisk.opacity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        name="accretion-hot"
        position={[0, profile.hotDisk.verticalOffset, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={2}
      >
        <ringGeometry
          args={[
            profile.hotDisk.innerRadius,
            profile.hotDisk.outerRadius,
            profile.hotDisk.angularSegments,
            profile.hotDisk.radialSegments,
          ]}
        />
        <shaderMaterial
          ref={hotMaterial}
          uniforms={hotUniforms}
          vertexShader={BLACK_HOLE_VERTEX_SHADER}
          fragmentShader={ACCRETION_FRAGMENT_SHADER}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        name="accretion-dust"
        position={[0, profile.dustDisk.verticalOffset, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={1}
      >
        <ringGeometry
          args={[
            profile.dustDisk.innerRadius,
            profile.dustDisk.outerRadius,
            profile.dustDisk.angularSegments,
            profile.dustDisk.radialSegments,
          ]}
        />
        <shaderMaterial
          ref={dustMaterial}
          uniforms={dustUniforms}
          vertexShader={BLACK_HOLE_VERTEX_SHADER}
          fragmentShader={ACCRETION_FRAGMENT_SHADER}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        name="lens-photon-shell"
        scale={[1, profile.lensShell.scaleY, 1]}
        renderOrder={3}
      >
        <sphereGeometry
          args={[
            profile.lensShell.radius,
            profile.lensShell.widthSegments,
            profile.lensShell.heightSegments,
          ]}
        />
        <shaderMaterial
          uniforms={lensUniforms}
          vertexShader={BLACK_HOLE_VERTEX_SHADER}
          fragmentShader={LENSING_FRAGMENT_SHADER}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
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
