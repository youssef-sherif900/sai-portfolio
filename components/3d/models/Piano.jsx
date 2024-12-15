import { useGLTF } from '@react-three/drei'
import React from 'react'



function Piano() {

  const { nodes, materials } = useGLTF('/room16.glb')

  return (
    <group name='piano' position={[-5.924, 2.27, 5.186]} scale={[2.098, 2.577, 2.577]}>
      <mesh
        name='piano'
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials.WKeys}
      />
      <mesh
        name='piano'
        castShadow
        receiveShadow
        geometry={nodes.Cube015_1.geometry}
        material={materials.BKeys}
      />
      <mesh
        name='piano'
        castShadow
        receiveShadow
        geometry={nodes.Cube015_2.geometry}
        material={materials.Body}
      />
      <mesh
        name='piano'
        castShadow
        receiveShadow
        geometry={nodes.Cube015_3.geometry}
        material={materials.Speaker}
      />
      <mesh
        name='piano'
        castShadow
        receiveShadow
        geometry={nodes.Cube015_4.geometry}
        material={materials.StandPart}
      />
      <mesh
        name='piano'
        castShadow
        receiveShadow
        geometry={nodes.Cube015_5.geometry}
        material={materials.Stand}
      />
      <mesh
        name='piano'
        castShadow
        receiveShadow
        geometry={nodes.Cube015_6.geometry}
        material={materials.TopPart}
      />
    </group>
  )
}

export default Piano