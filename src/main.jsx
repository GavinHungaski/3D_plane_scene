import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { DirLight, SkyBox } from './components'
import { OrbitControls } from '@react-three/drei'
import './app.css'


function App() {
  
  return (
    <Canvas>
      <SkyBox />
      <ambientLight intensity={1} />
      <DirLight />

      <gridHelper args={[20, 20, 0xff0000, 'teal']} />

      <OrbitControls />
    </Canvas>
  )
}

createRoot(document.getElementById('root')).render(<App />)
