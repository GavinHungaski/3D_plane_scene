import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import { DirLight, TPCamera, SkyBox, Plane, Cloud } from './components'
import './app.css'


function App() {
  return (
    <Canvas>
      <SkyBox />

      <ambientLight intensity={1} />
      <DirLight />

      <gridHelper args={[1000, 20, 0xff0000, 'teal']} />

      <Cloud position={[1, 25, 3]} scale={[2, 2, 2]} />

      <TPCamera>
        <group>
          <Plane />
          <Trail width={100} length={1} color="red">
            <mesh position={[-7, 11.5, 20]} />
          </Trail>
          <Trail width={100} length={1} color="red">
            <mesh position={[7, 11.5, 20]} />
          </Trail>
        </group>
      </TPCamera>

    </Canvas>
  )
}

createRoot(document.getElementById('root')).render(<App />)
