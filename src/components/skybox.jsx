import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const SkyBox = () => {
  const { scene } = useThree();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new CubeTextureLoader();
    loader.load([
      '/public/skybox/posx.png',
      '/public/skybox/negx.png',
      '/public/skybox/posy.png',
      '/public/skybox/negy.png',
      '/public/skybox/posz.png',
      '/public/skybox/negz.png',
    ], (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, []);

  useEffect(() => {
    if (texture) {
      scene.background = texture;
    }
  }, [scene, texture]);

  return null;
};

export default SkyBox;