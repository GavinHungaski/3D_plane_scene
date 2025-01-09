import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const TPCamera = ({ children }) => {
  const turn_speed = 1
  const move_speed = 0
  const plane_camera_ref = useRef()

  const [moveRight, setMoveRight] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'd':
          setMoveRight(true)
          break
        case 'a':
          setMoveLeft(true)
          break
        case 'w':
          setMoveForward(true)
          break
        case 's':
          setMoveBackward(true)
          break
        default:
          break
      }
    }

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'd':
          setMoveRight(false)
          break
        case 'a':
          setMoveLeft(false)
          break
        case 'w':
          setMoveForward(false)
          break
        case 's':
          setMoveBackward(false)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(plane_camera_ref.current.quaternion)
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(plane_camera_ref.current.quaternion)
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(plane_camera_ref.current.quaternion)
  
    if (moveForward || moveBackward) {
      const pitch = new THREE.Quaternion().setFromAxisAngle(right, moveForward ? turn_speed * delta : moveBackward ? -turn_speed * delta : 0)
      plane_camera_ref.current.quaternion.multiplyQuaternions(pitch, plane_camera_ref.current.quaternion)
    }
  
    if (moveRight || moveLeft) {
      const yaw = new THREE.Quaternion().setFromAxisAngle(up, moveRight ? -turn_speed * delta : moveLeft ? turn_speed * delta : 0)
      plane_camera_ref.current.quaternion.multiplyQuaternions(yaw, plane_camera_ref.current.quaternion)
    }

    if (moveRight || moveLeft) {
      const roll = new THREE.Quaternion().setFromAxisAngle(forward, moveRight ? turn_speed * delta : moveLeft ? -turn_speed * delta : 0)
      plane_camera_ref.current.quaternion.multiplyQuaternions(roll, plane_camera_ref.current.quaternion)
    }
  
    plane_camera_ref.current.position.addScaledVector(forward, move_speed)
  
    state.camera.lookAt(plane_camera_ref.current.position)
    state.camera.updateProjectionMatrix()
  })

  return (
    <group ref={plane_camera_ref}>
      <PerspectiveCamera
        makeDefault
        position={[0, 40, 90]}
        args={[50, 1.2, 1, 1000]}
      />
      {children}
      <OrbitControls enablePan={false} />
    </group>
  )
}

export default TPCamera