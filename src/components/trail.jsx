import React from 'react'
import { Points } from '@react-three/drei'
import * as THREE from 'three'

const Trail = ({ position }) => {
    const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 10)
    ]

    return (
        <mesh position={position}>
            <Points positions={points.map(p => p.toArray()).flat()}>
                <pointsMaterial attach="material" color="green" size={0.5} />
            </Points>
        </mesh>
    )
}

export default Trail