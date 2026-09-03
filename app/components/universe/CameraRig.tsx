'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { UniverseEntryId } from '../../../lib/universe'
import {
  OVERVIEW_CAMERA,
  getCameraDestination,
  getCameraFlightProgress,
  getTrackingTranslation,
} from './scene-model'

type Props = {
  selectedId: UniverseEntryId
  resetSignal: number
  reducedMotion: boolean
  objectRegistry: React.RefObject<Map<UniverseEntryId, THREE.Object3D>>
}

type Flight = {
  id: UniverseEntryId | null
  elapsed: number
  fromPosition: THREE.Vector3
  fromTarget: THREE.Vector3
}

type Tracking = {
  id: UniverseEntryId
  previousTarget: THREE.Vector3
}

const worldTarget = new THREE.Vector3()
const desiredPosition = new THREE.Vector3()
const desiredTarget = new THREE.Vector3()

export default function CameraRig({
  selectedId,
  resetSignal,
  reducedMotion,
  objectRegistry,
}: Props) {
  const { camera, gl } = useThree()
  const controls = useRef<OrbitControls | null>(null)
  const flight = useRef<Flight | null>(null)
  const tracking = useRef<Tracking | null>(null)
  const previousResetSignal = useRef(resetSignal)

  useEffect(() => {
    const nextControls = new OrbitControls(camera, gl.domElement)
    nextControls.enableDamping = true
    nextControls.dampingFactor = 0.07
    nextControls.enablePan = false
    nextControls.enableRotate = true
    nextControls.enableZoom = true
    nextControls.minDistance = OVERVIEW_CAMERA.minDistance
    nextControls.maxDistance = OVERVIEW_CAMERA.maxDistance
    nextControls.touches.ONE = THREE.TOUCH.ROTATE
    nextControls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE

    const cancelAutomaticMotion = () => {
      flight.current = null
      tracking.current = null
    }

    nextControls.addEventListener('start', cancelAutomaticMotion)
    controls.current = nextControls

    return () => {
      nextControls.removeEventListener('start', cancelAutomaticMotion)
      nextControls.dispose()
      controls.current = null
    }
  }, [camera, gl])

  useEffect(() => {
    const activeControls = controls.current
    if (!activeControls) return

    tracking.current = null
    flight.current = {
      id: selectedId,
      elapsed: 0,
      fromPosition: camera.position.clone(),
      fromTarget: activeControls.target.clone(),
    }
  }, [camera, selectedId])

  useEffect(() => {
    if (previousResetSignal.current === resetSignal) return
    previousResetSignal.current = resetSignal

    const activeControls = controls.current
    if (!activeControls) return

    tracking.current = null
    flight.current = {
      id: null,
      elapsed: 0,
      fromPosition: camera.position.clone(),
      fromTarget: activeControls.target.clone(),
    }
  }, [camera, resetSignal])

  useFrame((_, delta) => {
    const activeControls = controls.current
    if (!activeControls) return

    const currentFlight = flight.current
    if (currentFlight) {
      let destination = {
        position: OVERVIEW_CAMERA.position,
        target: OVERVIEW_CAMERA.target,
      }

      if (currentFlight.id) {
        const node = objectRegistry.current.get(currentFlight.id)
        if (!node) return

        node.getWorldPosition(worldTarget)
        destination = getCameraDestination(
          currentFlight.id,
          worldTarget.toArray(),
        )
      }

      currentFlight.elapsed += Math.min(delta, 0.1)
      const progress = getCameraFlightProgress(
        currentFlight.elapsed,
        reducedMotion,
      )
      desiredPosition.fromArray(destination.position)
      desiredTarget.fromArray(destination.target)
      camera.position.lerpVectors(
        currentFlight.fromPosition,
        desiredPosition,
        progress,
      )
      activeControls.target.lerpVectors(
        currentFlight.fromTarget,
        desiredTarget,
        progress,
      )

      if (progress >= 1) {
        tracking.current = currentFlight.id
          ? {
              id: currentFlight.id,
              previousTarget: desiredTarget.clone(),
            }
          : null
        flight.current = null
      }
    } else if (tracking.current) {
      const node = objectRegistry.current.get(tracking.current.id)
      if (node) {
        node.getWorldPosition(worldTarget)
        const translation = getTrackingTranslation(
          tracking.current.previousTarget.toArray(),
          worldTarget.toArray(),
        )
        camera.position.add(desiredPosition.fromArray(translation))
        activeControls.target.add(desiredTarget.fromArray(translation))
        tracking.current.previousTarget.copy(worldTarget)
      }
    }

    activeControls.update()
  })

  return null
}
