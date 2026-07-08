import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export function AmbientLife() {
  const satelliteRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    if (satelliteRef.current) {
      const t = clock.getElapsedTime();
      // Orbiting slightly off-axis around the sun
      satelliteRef.current.position.x = Math.sin(t * 0.1) * 45;
      satelliteRef.current.position.z = Math.cos(t * 0.1) * 45;
      satelliteRef.current.position.y = Math.sin(t * 0.2) * 10;
      satelliteRef.current.rotation.y += 0.01;
      satelliteRef.current.rotation.x += 0.005;
    }
  });

  return (
    <group>
      {/* Resume Satellite */}
      <group 
        ref={satelliteRef}
        scale={[3, 3, 3]}
        onClick={() => window.open('/resume.pdf', '_blank')}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        {hovered && (
          <Html position={[0, 1.5, 0]} center pointerEvents="none">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-sm font-semibold whitespace-nowrap shadow-xl">
              Click for Résumé!
            </div>
          </Html>
        )}
        <mesh>
          <boxGeometry args={[0.5, 0.5, 1]} />
          <meshStandardMaterial color="#E2A350" metalness={0.9} roughness={0.1} emissive={"#E2A350"} emissiveIntensity={0.3}/>
        </mesh>
        {/* Solar panels */}
        <mesh position={[0.8, 0, 0]}>
          <boxGeometry args={[1, 0.1, 0.8]} />
          <meshStandardMaterial color="#4477DD" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[1, 0.1, 0.8]} />
          <meshStandardMaterial color="#4477DD" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
