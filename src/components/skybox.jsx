import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const SkyBox = () => {
  const { scene } = useThree();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new CubeTextureLoader();
    loader.load([
      '/skybox/posx.png',
      '/skybox/negx.png',
      '/skybox/posy.png',
      '/skybox/negy.png',
      '/skybox/posz.png',
      '/skybox/negz.png',
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