'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  createSeededHaloPositions,
  getParticleCount,
} from '../universe/scene-model'
import {
  ACCRETION_FRAGMENT_SHADER,
  BLACK_HOLE_VERTEX_SHADER,
  LENSING_FRAGMENT_SHADER,
} from './black-hole-shaders'
import { BLACK_HOLE_RENDER_PROFILE as profile } from './render-profile'

type BlackHoleProps = {
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
    uFadeStart: { value: disk.fadeStart },
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

export function BlackHole({ reducedMotion }: BlackHoleProps) {
  const hotMaterial = useRef<THREE.ShaderMaterial>(null)
  const dustMaterial = useRef<THREE.ShaderMaterial>(null)
  const halo = useRef<THREE.Points>(null)
  const viewportWidth = useThree((state) => state.size.width)
  const positions = useMemo(
    () =>
      new Float32Array(
        createSeededHaloPositions(getParticleCount(viewportWidth)),
      ),
    [viewportWidth],
  )
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
    if (reducedMotion) return

    const step = Math.min(delta, 0.1)
    hotMaterial.current!.uniforms.uTime.value += step
    dustMaterial.current!.uniforms.uTime.value += step
    halo.current!.rotation.y += step * 0.008
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

      <points
        ref={halo}
        name="particle-halo"
        raycast={() => null}
        scale={[1, 0.55, 1]}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={profile.palette.rim}
          size={profile.halo.size}
          sizeAttenuation
          transparent
          opacity={profile.halo.opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  )
}
