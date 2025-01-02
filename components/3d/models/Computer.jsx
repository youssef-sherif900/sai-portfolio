import { Html, useGLTF } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three';

function Computer() {
  const { nodes, materials } = useGLTF('/room16.glb')
  const tvRef = useRef(null)

  return (
    <group position={[0.169, 3.86, -6.092]} scale={2.638}>
      <mesh
        ref={tvRef}
        geometry={nodes.TV_1.geometry}
      >
        <meshStandardMaterial
          color={new THREE.Color(0, 0, 0)}

        />
        <Html
          transform
          occlude
          position={[0, 0.06, 0.03]}
          // scale={[0.12, 0.06, 0.04]}
          scale={[0.26, 0.06, 0.04]}
        >

          {/* <iframe
        src="https://windows-11-ku7x1e5xs-eduardopicolos-projects.vercel.app/"
        title="Windows 11 Site"
        style={{
          height: '100vh',
          width: '100%',
          border: 'none',
        }}
      /> */}

        </Html>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TV_2.geometry}
        material={materials.PaletteMaterial011}
      />
    </group>
  )
}

export default Computer

