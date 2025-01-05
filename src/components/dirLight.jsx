import { useRef, useLayoutEffect } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'
import { useHelper } from '@react-three/drei'


const DirLight = () => {
    const dirLightRef = useRef(DirectionalLight)

    // useHelper(dirLightRef, DirectionalLightHelper, 0.5, 'red')

    useLayoutEffect(() => {
        if (dirLightRef.current) {
            dirLightRef.current.position.y += 30
        }
    }, [])

    return (
        <>
            <directionalLight color="white" intensity={1} ref={dirLightRef} />
        </>
    )
}


export default DirLight
