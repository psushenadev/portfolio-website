import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const subtitles = ["jack of some trades", "always learning", "full stack developer", "robotics enthusiast"];
  const [text, setText] = useState('');
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  useEffect(() => {
    const currentString = subtitles[subIndex % subtitles.length];
    const typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && text === currentString) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setSubIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentString.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, subIndex]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[4, 64, 64]} />
      {/* High color value to trigger bloom */}
      <meshBasicMaterial color={new THREE.Color('#F4C96B').multiplyScalar(2)} />
      <pointLight intensity={3} distance={750} decay={1.5} color="#F4C96B" castShadow />
      
      <Html position={[0, 6, 0]} center zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <h1 className="text-4xl font-bold text-white tracking-widest uppercase mb-1 drop-shadow-[0_0_15px_rgba(244,201,107,0.8)] whitespace-nowrap">
            PRADYUN SUSHENA
          </h1>
          <p className="text-[#F4C96B] font-mono tracking-wider text-sm h-6">
            {text}<span className="animate-pulse">|</span>
          </p>
        </div>
      </Html>
    </mesh>
  );
}
