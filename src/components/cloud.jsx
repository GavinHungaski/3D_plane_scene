import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Cloud = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const particlesRef = useRef()

  useEffect(() => {
    const particles = particlesRef.current
    const positions = new Float32Array(1000 * 3)

    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, [])

  useFrame(() => {
    const particles = particlesRef.current;
    particles.rotation.y += 0.001;
  })

  return (
    <points ref={particlesRef} position={position} scale={scale}>
      <bufferGeometry />
      <pointsMaterial size={0.1} color="#ffffff" />
    </points>
  )
}

export default Cloud