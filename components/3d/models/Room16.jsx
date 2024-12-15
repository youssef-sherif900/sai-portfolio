import React, { useCallback, useRef, useState } from 'react'
import { Bounds, useGLTF } from '@react-three/drei'
import { HoneycombLight } from './HoneyShapeLight';
import { debounce } from "lodash"
import { Select } from "@react-three/postprocessing"
import Guitar from "./Guitar"
import Computer from "./Computer"
import Piano from "./Piano"
import SelectToZoom from  "@/components/SelectToZoom"
import * as THREE from 'three';

export function Model(props) {
  const { nodes, materials } = useGLTF('/room16.glb')

  const [hovered, hover] = useState(null)
  // Debounce hover a bit to stop the ticker from being erratic
  const debouncedHover = useCallback(debounce(hover, 30), [])
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name))



  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall_2.geometry}
        material={materials.PaletteMaterial001}
        position={[-0.439, 4.2, 0.539]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
        scale={8.389}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials['Material.052']}
        position={[-0.422, 0.19, 0.595]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={8.418}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table.geometry}
        material={materials['pine wood']}
        position={[0.336, 1.17, -5.94]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[11.603, 0.81, 54.917]}
      />
      {/* honey shape light */}
      <HoneycombLight geometry={nodes.Cube007.geometry} material={materials.PaletteMaterial002} />

      {/* Light */}
      <mesh 
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry} 
        material={materials.PaletteMaterial003} 
        position={[-0.282, 4.523, 0.68]} 
        scale={[8.232, 9.621, 1581.065]}
      >
        <meshStandardMaterial
          color={new THREE.Color(1, 1, 1)}
          emissive={new THREE.Color(1, 1, 1)}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>

       {/* mouse pad */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mouse_pad.geometry}
        material={materials.PaletteMaterial005}
        position={[2.394, 1.21, -5.956]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[38.579, 0.807, 190.062]}
      />
      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logitech_Speaker001.geometry}
        material={materials['Speaker.001']}
        position={[3.692, 2.674, -5.685]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.71}
      />
      {/* keyboard */}
      <group
        position={[0.244, 2.139, -5.489]}
        rotation={[0.007, 0, 0]}
        scale={[1.345, 1.212, 1.212]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001.geometry}
          material={materials['Letters LED']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_1.geometry}
          material={materials['Pudding LED']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_2.geometry}
          material={materials['Stabilizers Switches']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_3.geometry}
          material={materials['Stabilizers Bottom']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_4.geometry}
          material={materials['Stabilizers Space']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_5.geometry}
          material={materials['Stabilizers Space Switches']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_6.geometry}
          material={materials['Switches Bottom']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_7.geometry}
          material={materials['Switch Button']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_8.geometry}
          material={materials['Switch Outside']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_9.geometry}
          material={materials['Switches LED']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_10.geometry}
          material={materials.Platform}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_11.geometry}
          material={materials.Rubber}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycaps001_12.geometry}
          material={materials.Card}
        />
      </group>

 

      {/* posters image on wall */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials['Material.017']}
        position={[-8.092, 5.268, 0.048]}
        scale={[0.109, 1.783, 1.783]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials['Material.019']}
        position={[-8.075, 5.268, -4.373]}
        scale={[0.109, 1.783, 1.783]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AV40_Speaker_Left_White_Wire.geometry}
        material={materials.PaletteMaterial006}
        position={[-0.037, 0.185, -0.475]}
        scale={0.383}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AV40_Speaker_Left_Red_Wire.geometry}
        material={materials.PaletteMaterial007}
        position={[-0.037, 0.185, -0.475]}
        scale={0.383}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AV40_Speaker_Right_Shinny_Front018.geometry}
        material={materials['Metal wire mesh']}
        position={[0.339, 7.345, -5.776]}
        rotation={[1.845, 0.09, 0.31]}
        scale={6.175}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AV40_Speaker_Right_Shinny_Front019.geometry}
        material={materials.MI_screw_T}
        position={[0.255, 7.193, -6.863]}
        rotation={[1.845, 0.09, 0.31]}
        scale={6.918}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AV40_Speaker_Right_Shinny_Front033.geometry}
        material={materials.noir_back_right}
        position={[0.238, 7.197, -6.85]}
        rotation={[1.845, 0.09, 0.31]}
        scale={6.943}
      />
      <Bounds fit clip observe margin={0.6}>
      <SelectToZoom>

      <Select enabled={hovered === "Guitar"} onPointerOver={over("Guitar")} onPointerOut={() => debouncedHover(null)}>
      <Guitar />
      </Select>

      <Select enabled={hovered === "computer"} onPointerOver={over("computer")} onPointerOut={() => debouncedHover(null)}>
      <Computer />
      </Select>

      <Select enabled={hovered === "piano"} onPointerOver={over("piano")} onPointerOut={() => debouncedHover(null)}>
      <Piano />
     </Select>

      </SelectToZoom>
      </Bounds>
      {/* lamp at desk */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial001.geometry}
        material={materials.initialShadingGroup_1001}
        position={[4.647, 3.315, -6.39]}
        rotation={[Math.PI, 0, -Math.PI]}
        scale={1.289}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial315.geometry}
        material={materials.PaletteMaterial004}
        position={[4.647, 3.894, -5.861]}
        rotation={[Math.PI, 0, -Math.PI]}
        scale={[0.155, 0.175, 0.155]}
      />
      <group position={[-0.003, 0.305, 0.038]} rotation={[-Math.PI / 2, 0, 1.817]} scale={0.784}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.book_cover005_1.geometry}
          material={materials['book_cover.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.book_cover005_2.geometry}
          material={materials.book_paper}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.book_cover006.geometry}
        material={materials['book_cover.006']}
        position={[-0.701, 0.261, 0.029]}
        rotation={[-Math.PI / 2, 0, 1.683]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.book_cover007.geometry}
        material={materials['book_cover.007']}
        position={[0.667, 0.372, 0.011]}
        rotation={[-Math.PI / 2, 0, 2.527]}
        scale={0.105}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cabinet_cover.geometry}
        material={materials['wood (Oak Matt Antracite Gray)']}
        position={[0, 0.181, -0.005]}
        scale={0.91}
      />
   
    </group>
  )
}

useGLTF.preload('/room16.glb')