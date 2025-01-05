import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

const Trail = () => {
  const lineRef = useRef()
  const [points, setPoints] = useState([new THREE.Vector3(0, 0, 0)])

  useFrame(() => {
    const time = performance.now() / 1000
    const newPoint = new THREE.Vector3(Math.sin(time) * 5, Math.cos(time) * 5, Math.sin(time) * 5)
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints, newPoint]
      if (newPoints.length > 100) newPoints.shift()
      return newPoints
    })
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Line ref={lineRef} points={points} color="red" lineWidth={2} />
    </>
  )
}

export default Trail