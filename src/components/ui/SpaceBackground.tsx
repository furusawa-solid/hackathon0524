import { useLoader } from "@react-three/fiber";
import { BackSide, TextureLoader } from "three";

export const SpaceBackground = () => {
  const spaceTexture = useLoader(TextureLoader, '/space.jpg');

  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={spaceTexture} side={BackSide} />
    </mesh>
  );
};
