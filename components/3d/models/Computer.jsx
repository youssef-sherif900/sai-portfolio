import { useGLTF } from "@react-three/drei"


function Computer() {

    const { nodes, materials } = useGLTF('/room16.glb')

  return (
    <group position={[0.169, 3.86, -6.092]} scale={2.638}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.TV_1.geometry}
      material={materials['Screen (tv)']}
    />
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