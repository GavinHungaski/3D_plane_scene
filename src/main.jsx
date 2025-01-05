import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { DirLight, TPCamera, SkyBox, Plane } from './components'
import './app.css'


function App() {
  return (
    <Canvas>
      <SkyBox />

      <ambientLight intensity={1} />
      <DirLight />

      <gridHelper args={[150, 20, 0xff0000, 'teal']} />

      <TPCamera>
        <Plane />
      </TPCamera>
      
    </Canvas>
  )
}

createRoot(document.getElementById('root')).render(<App />)
