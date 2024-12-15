import { useGLTF } from '@react-three/drei'
import { Select } from '@react-three/postprocessing'
import React from 'react'

function Guitar() {

    const { nodes, materials } = useGLTF('/room16.glb')
    
  return (
    
    <group position={[-6.798, 2.81, -6.055]} rotation={[-0.428, 0.895, 0.23]} scale={2.513}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029.geometry}
        material={materials.top}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_1.geometry}
        material={materials.strings}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_2.geometry}
        material={materials.bracing}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_3.geometry}
        material={materials.sides}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_4.geometry}
        material={materials.PaletteMaterial009}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_5.geometry}
        material={materials.neck}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_6.geometry}
        material={materials['Material.008']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_7.geometry}
        material={materials.bridge}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_8.geometry}
        material={materials.Back}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_9.geometry}
        material={materials['Back.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_10.geometry}
        material={materials.PaletteMaterial008}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_11.geometry}
        material={materials.PaletteMaterial010}
      />
    </group>
  )
}

export default Guitar