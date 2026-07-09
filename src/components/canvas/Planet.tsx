import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { PlanetData } from '../../data/universeData';
import { useUniverseStore } from '../../store/useUniverseStore';

interface PlanetProps {
  data: PlanetData;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

const colorMap: Record<string, string> = {
  
  'projects': '#FF644F', // initial planet colour d98b47, rings colour F2C078 --> FF644F FF8070
  'experience': '#D98B47',
  'skills': '#4D9A8A',
  'contact': '#6E92B5',
};

export function Planet({ data, controlsRef }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const { camera } = useThree();
  const { setSelectedPlanet, markVisited, selectedPlanet } = useUniverseStore();

  const isSelected = selectedPlanet === data.id;
  const planetColor = colorMap[data.id!] || '#ffffff';

  useFrame((_, delta) => {
    if (!groupRef.current || !planetRef.current) return;
    
    // Orbital rotation pauses precisely where it is
    if (!isSelected) {
       groupRef.current.rotation.y += data.orbitalSpeed * delta;
    }

    // Planet rotation is continuous
    planetRef.current.rotation.y += data.rotationSpeed * delta;
  });

  useEffect(() => {
    if (isSelected && controlsRef.current && planetRef.current) {
      // Calculate world position
      const worldPos = new THREE.Vector3();
      planetRef.current.getWorldPosition(worldPos);
      
      // Move camera slightly offset and above
      const camOffset = new THREE.Vector3(data.radius * 3, data.radius * 2, data.radius * 4);
      const targetCamPos = worldPos.clone().add(camOffset);
      
      gsap.to(camera.position, {
        x: targetCamPos.x,
        y: targetCamPos.y,
        z: targetCamPos.z,
        duration: 1.5,
        ease: 'power2.inOut',
      });
      
      gsap.to(controlsRef.current.target, {
        x: worldPos.x,
        y: worldPos.y,
        z: worldPos.z,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }
  }, [isSelected, camera, data.radius, controlsRef]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
    if (!controlsRef.current) return;
    
    setSelectedPlanet(data.id);
    markVisited(data.id);
  };

  return (
    <group ref={groupRef}>
      <group 
        position={[data.distance, 0, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onDoubleClick={handleDoubleClick}
      >
        <mesh 
          ref={planetRef} 
          rotation={[data.tilt, 0, 0]}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[data.radius, 64, 64]} />
          <meshStandardMaterial 
            color={planetColor} 
            roughness={0.4}
            metalness={data.id === 'skills' ? 0.8 : 0.3}
            emissive={hovered ? planetColor : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
          
          {hovered && (
            <mesh raycast={() => null}>
               <sphereGeometry args={[data.radius * 1.05, 32, 32]} />
              <meshBasicMaterial color={planetColor} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </mesh>
          )}

          {/* Rings for Projects planet */}
          {data.id === 'projects' && (
             <mesh rotation={[-Math.PI / 2 + 0.2, 0, 0]} receiveShadow castShadow>
               <ringGeometry args={[data.radius + 0.5, data.radius + 1.5, 64]} />
               <meshStandardMaterial 
                 color="#FF8C7D" 
                 transparent 
                 opacity={hovered ? 1.0 : 0.8} 
                 side={THREE.DoubleSide} 
                 emissive={hovered ? "#FF8C7D" : "#000000"}
                 emissiveIntensity={hovered ? 0.5 : 0}
               />
             </mesh>
          )}
        </mesh>

        {/* HTML Label */}
        {(hovered || isSelected) && (
          <Html position={[0, data.radius + 1.5, 0]} center zIndexRange={[100, 0]}>
            <div 
              className="text-sm font-semibold tracking-wider uppercase transition-colors duration-300 pointer-events-none select-none"
              style={{ 
                color: hovered ? planetColor : '#FFFFFF', 
                textShadow: '0 0 10px rgba(0,0,0,0.8)' 
              }}
            >
              {data.name}
            </div>
          </Html>
        )}
      </group>
      
      {/* Orbit Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance, data.distance + 0.05, 128]} />
        <meshBasicMaterial 
          color={hovered || isSelected ? planetColor : '#444444'} 
          transparent 
          opacity={hovered || isSelected ? 0.6 : 0.15} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
}
