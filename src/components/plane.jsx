import { useRef, useLayoutEffect } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useLoader } from '@react-three/fiber'


const Plane = () => {
    const mesh = useRef()
    const materials = useLoader(MTLLoader, '/plane/airplane_texture.mtl')
    const plane = useLoader(OBJLoader, '/plane/airplane.obj', (loader) => {
        if (materials) {
          loader.setMaterials(materials)
        }
    })

    useLayoutEffect(() => {
        mesh.current.rotation.y = 0.1
    }, [])

    return (
        <mesh ref={mesh} scale={[0.01, 0.01, 0.01]}>
            <primitive object={plane}/>
        </mesh>
    )
}

export default Plane