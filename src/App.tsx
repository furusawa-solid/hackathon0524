import { Canvas } from '@react-three/fiber';
import './App.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import { DogSphere } from './components/ui/DogSphere';
import { IconButton } from './components/ui/IconButton';
import { Sidebar } from './components/ui/Sidebar';
import { SpaceBackground } from './components/ui/SpaceBackground';
import { useDogSphereStore } from './stores/dogSpheres';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { dogSpheres } = useDogSphereStore();

  return (
    <div className="h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <IconButton
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        icon={faBars}
        className="absolute top-5 left-5 z-1 bg-transparent px-2 pb-1"
      />

      <Canvas
        className="absolute top-0 left-0 h-full w-full"
        camera={{ position: [0, 0, 6] }}
      >
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} />
        <SpaceBackground />
        {dogSpheres.map((sphere) => (
          <DogSphere key={sphere.id} {...sphere} position={sphere.position} />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
