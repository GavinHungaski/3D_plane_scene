import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'

const TPCamera = ({ children }) => {
  const speed_factor = 0.5
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
    plane_camera_ref.current.position.x += moveRight ? speed_factor : moveLeft ? -speed_factor : 0
    plane_camera_ref.current.position.z += moveForward ? -speed_factor : moveBackward ? speed_factor : 0
    state.camera.lookAt(plane_camera_ref.current.position)
    state.camera.updateProjectionMatrix()
  })

  return (
    <group ref={plane_camera_ref}>
      <PerspectiveCamera
        makeDefault
        position={[25, 40, 25]}
        args={[45, 1.2, 1, 1000]}
      />
      {children}
      <OrbitControls enablePan={false} />
    </group>
  )
}

export default TPCamera