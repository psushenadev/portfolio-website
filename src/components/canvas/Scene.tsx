import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { AmbientLife } from './AmbientLife';
import { planets } from '../../data/universeData';
import { useUniverseStore } from '../../store/useUniverseStore';
import gsap from 'gsap';

function SceneContent() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Escape to reset view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        useUniverseStore.getState().setSelectedPlanet(null);
        if (controlsRef.current) {
          // Reset to 25 degrees above orbital plane
          gsap.to(camera.position, { x: 0, y: 25, z: 50, duration: 1.5, ease: 'power2.inOut' });
          gsap.to(controlsRef.current.target, { x: 0, y: 0, z: 0, duration: 1.5, ease: 'power2.inOut' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera]);

  // Initial Camera setup
  useEffect(() => {
    camera.position.set(0, 25, 50);
  }, [camera]);

  return (
    <>
      <color attach="background" args={['#05070D']} />
      
      {/* Increased lighting so planets are clearly visible */}
      <ambientLight intensity={0.6} />
      <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#05070D" />

      {/* Camera Controls */}
      <OrbitControls 
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={150}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.1}
      />

      {/* Universe Objects */}
      <Stars radius={50} depth={50} count={2500} factor={6} saturation={0} fade speed={1} />
      <Starfield />
      <AmbientLife />
      <Sun />
      
      {planets.map(planet => (
        <Planet key={planet.id} data={planet} controlsRef={controlsRef} />
      ))}

      {/* Postprocessing (Restrained Bloom) */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.0} />
      </EffectComposer>
    </>
  );
}

export function Scene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas shadows camera={{ fov: 45, position: [0, 25, 50] }}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
