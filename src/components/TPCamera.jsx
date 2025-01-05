import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

const TPCamera = ({ children }) => {
  const plane_camera_ref = useRef()

  const [moveRight, setMoveRight] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
          setMoveRight(true)
          break
        case 'ArrowLeft':
          setMoveLeft(true)
          break
        case 'ArrowUp':
          setMoveForward(true)
          break
        case 'ArrowDown':
          setMoveBackward(true)
          break
        default:
          break
      }
    }

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowRight':
          setMoveRight(false)
          break
        case 'ArrowLeft':
          setMoveLeft(false)
          break
        case 'ArrowUp':
          setMoveForward(false)
          break
        case 'ArrowDown':
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
    plane_camera_ref.current.position.x += moveRight ? 0.2 : moveLeft ? -0.2 : 0
    plane_camera_ref.current.position.z += moveForward ? -0.2 : moveBackward ? 0.2 : 0
    state.camera.lookAt(plane_camera_ref.current.position)
    state.camera.updateProjectionMatrix()
  })

  return (
    <group ref={plane_camera_ref}>
      <PerspectiveCamera
        makeDefault
        position={[25, 22, 25]}
        args={[45, 1.2, 1, 1000]}
      />
      {children}
    </group>
  )
}

export default TPCamera