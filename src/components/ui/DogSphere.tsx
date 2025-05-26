import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Props = {
  color: string;
  size: number;
  imageUrl: string;
  position: [number, number, number];
};

export const DogSphere = ({ color, size, imageUrl, position }: Props) => {
  const meshRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (tex) => setTexture(tex),
      undefined,
      (err) => console.error('画像ロード失敗:', err),
    );
  }, [imageUrl]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (!texture) return null;

  return (
    <group ref={meshRef} position={position}>
      {/* オーラ */}
      <mesh>
        <sphereGeometry args={[size * 1.2, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* 犬画像球体 */}
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
};
