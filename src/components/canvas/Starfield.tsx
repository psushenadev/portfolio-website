import { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

export function Starfield() {
  const count = 3000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const palette = [new THREE.Color('#F5F7FF'), new THREE.Color('#BFD8FF'), new THREE.Color('#FFD8A8')];
    
    for (let i = 0; i < count; i++) {
      const r = 100 + Math.random() * 200;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      const s = Math.random() * 0.3 + 0.1;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      const c = palette[Math.floor(Math.random() * palette.length)].clone().multiplyScalar(4);
      meshRef.current.setColorAt(i, c);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.5, 4, 4]} />
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  );
}
