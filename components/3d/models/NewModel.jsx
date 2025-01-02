import { Bounds, useAnimations, useGLTF, Html } from "@react-three/drei"
import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"
import { useRef } from "react"
import SelectToZoom from "@/components/SelectToZoom"
import { Select } from "@react-three/postprocessing"
import * as THREE from 'three';
import { HoneycombLight } from "./HoneyShapeLight"
import Piano from "@/components/3d/models/Piano"
import Guitar from "@/components/3d/models/Guitar"
import { useFrame } from "@react-three/fiber"


export default function Room(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF("/room10.glb")
    const { ref, actions, names } = useAnimations(animations, group)

    // useEffect(() => {
    //     // Reset and fade in animation after an index has been changed
    //     actions[names[3]].reset().fadeIn(0.5).play()
    //     // In the clean-up phase, fade it out
    //     return () => actions[names[index]].fadeOut(0.5)
    // }, [])



    const [hovered, hover] = useState(null)
    // Debounce hover a bit to stop the ticker from being erratic


    const debouncedHover = useCallback(debounce(hover, 30), [])
    const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name))


    // Handle focus on object



    return (
        <group ref={ref} {...props} dispose={null}>


            <Bounds fit clip observe margin={0.6}>
                <SelectToZoom>
                    <Select
                        enabled={hovered === "Guitar"}
                        onPointerOver={over("Guitar")}
                        onPointerOut={() => debouncedHover(null)}

                    >
                        <Guitar />
                    </Select>

                    <Select
                        enabled={hovered === "Piano"}
                        onPointerOver={over("Piano")}
                        onPointerOut={() => debouncedHover(null)}

                    >
                        <Piano />
                    </Select>

                    <Select
                        enabled={hovered === "computer"}
                        onPointerOver={over("computer")}
                        onPointerOut={() => debouncedHover(null)}
                    >
                        <group name="TV" position={[0.75, 3.861, -6.092]} scale={2.637}>
                            <mesh name="TV_1" castShadow receiveShadow geometry={nodes.TV_1.geometry} material={materials["Screen (tv)"]} />
                            <mesh name="TV_2" castShadow receiveShadow geometry={nodes.TV_2.geometry} material={materials.PaletteMaterial011} />
                        </group>
                    </Select>
                </SelectToZoom>
            </Bounds>


            <group name="Scene">
                <mesh
                    name="wall_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.wall_2.geometry}
                    material={materials.PaletteMaterial001}
                    position={[-0.439, 4.206, 0.539]}
                    rotation={[-Math.PI, 0, Math.PI / 2]}
                    scale={8.389}
                />
                <mesh
                    name="Plane"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={materials["Material.052"]}
                    position={[-0.422, 0.19, 0.595]}
                    rotation={[0, -Math.PI / 2, 0]}
                    scale={8.418}
                />
                <mesh
                    name="table"
                    castShadow
                    receiveShadow
                    geometry={nodes.table.geometry}
                    material={materials["pine wood"]}
                    position={[0.336, 1.17, -5.94]}
                    rotation={[0, -Math.PI / 2, 0]}
                    scale={[11.603, 0.81, 54.917]}
                />
                {/* honey comb */}
                <HoneycombLight geometry={nodes.Cube007.geometry} material={materials.PaletteMaterial002} />
                <mesh
                    name="mouse_pad"
                    castShadow
                    receiveShadow
                    geometry={nodes.mouse_pad.geometry}
                    material={materials.PaletteMaterial004}
                    position={[2.401, 1.21, -5.957]}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={[38.579, 0.807, 190.062]}
                />
                <mesh
                    name="Logitech_Speaker001"
                    castShadow
                    receiveShadow
                    geometry={nodes.Logitech_Speaker001.geometry}
                    material={materials["Speaker.001"]}
                    position={[3.692, 2.674, -5.685]}
                    rotation={[-Math.PI, 0, -Math.PI]}
                    scale={0.71}
                />

                {/* keyboard */}
                <group name="Keycaps" position={[0.244, 2.14, -5.489]} rotation={[0.007, 0, 0]} scale={[1.345, 1.211, 1.211]}>
                    <mesh name="Keycaps001" castShadow receiveShadow geometry={nodes.Keycaps001.geometry} material={materials["Letters LED"]} />
                    <mesh name="Keycaps001_1" castShadow receiveShadow geometry={nodes.Keycaps001_1.geometry} material={materials["Pudding LED"]} />
                    <mesh
                        name="Keycaps001_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keycaps001_2.geometry}
                        material={materials["Stabilizers Switches"]}
                    />
                    <mesh
                        name="Keycaps001_3"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keycaps001_3.geometry}
                        material={materials["Stabilizers Bottom"]}
                    />
                    <mesh
                        name="Keycaps001_4"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keycaps001_4.geometry}
                        material={materials["Stabilizers Space"]}
                    />
                    <mesh
                        name="Keycaps001_5"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keycaps001_5.geometry}
                        material={materials["Stabilizers Space Switches"]}
                    />
                    <mesh
                        name="Keycaps001_6"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keycaps001_6.geometry}
                        material={materials["Switches Bottom"]}
                    />
                    <mesh name="Keycaps001_7" castShadow receiveShadow geometry={nodes.Keycaps001_7.geometry} material={materials["Switch Button"]} />
                    <mesh
                        name="Keycaps001_8"
                        castShadow
                        receiveShadow
                        geometry={nodes.Keycaps001_8.geometry}
                        material={materials["Switch Outside"]}
                    />
                    <mesh name="Keycaps001_9" castShadow receiveShadow geometry={nodes.Keycaps001_9.geometry} material={materials["Switches LED"]} />
                    <mesh name="Keycaps001_10" castShadow receiveShadow geometry={nodes.Keycaps001_10.geometry} material={materials.Platform} />
                    <mesh name="Keycaps001_11" castShadow receiveShadow geometry={nodes.Keycaps001_11.geometry} material={materials.Rubber} />
                    <mesh name="Keycaps001_12" castShadow receiveShadow geometry={nodes.Keycaps001_12.geometry} material={materials.Card} />
                </group>

                <mesh
                    name="Cube002"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials.PaletteMaterial005}
                    position={[-0.282, 4.523, 0.68]}
                    scale={[8.232, 134.114, 134.114]}
                >

                    <meshStandardMaterial
                        color={new THREE.Color(1, 1, 1)}
                        emissive={new THREE.Color(1, 1, 1)}
                        emissiveIntensity={1}
                        toneMapped={false}
                    />

                </mesh>
                <mesh
                    name="Cube004"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004.geometry}
                    material={materials["Material.017"]}
                    position={[-8.092, 5.268, 0.048]}
                    scale={[0.109, 1.783, 1.783]}
                />
                <mesh
                    name="Cube005"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={materials["Material.019"]}
                    position={[-8.075, 5.268, -4.373]}
                    scale={[0.109, 1.783, 1.783]}
                />
                <mesh
                    name="AV40_Speaker_Left_White_Wire"
                    castShadow
                    receiveShadow
                    geometry={nodes.AV40_Speaker_Left_White_Wire.geometry}
                    material={materials.PaletteMaterial006}
                    position={[-0.037, 0.185, -0.475]}
                    scale={0.383}
                />
                <mesh
                    name="AV40_Speaker_Left_Red_Wire"
                    castShadow
                    receiveShadow
                    geometry={nodes.AV40_Speaker_Left_Red_Wire.geometry}
                    material={materials.PaletteMaterial007}
                    position={[-0.037, 0.185, -0.475]}
                    scale={0.383}
                />
                <mesh
                    name="AV40_Speaker_Right_Shinny_Front018"
                    castShadow
                    receiveShadow
                    geometry={nodes.AV40_Speaker_Right_Shinny_Front018.geometry}
                    material={materials["Metal wire mesh"]}
                    position={[0.339, 7.346, -5.777]}
                    rotation={[1.845, 0.09, 0.31]}
                    scale={6.174}
                />
                <mesh
                    name="AV40_Speaker_Right_Shinny_Front019"
                    castShadow
                    receiveShadow
                    geometry={nodes.AV40_Speaker_Right_Shinny_Front019.geometry}
                    material={materials.MI_screw_T}
                    position={[0.255, 7.193, -6.863]}
                    rotation={[1.845, 0.09, 0.31]}
                    scale={6.918}
                />
                <mesh
                    name="AV40_Speaker_Right_Shinny_Front033"
                    castShadow
                    receiveShadow
                    geometry={nodes.AV40_Speaker_Right_Shinny_Front033.geometry}
                    material={materials.noir_back_right}
                    position={[0.238, 7.197, -6.85]}
                    rotation={[1.845, 0.09, 0.31]}
                    scale={6.943}
                />

                <group name="soundborad005" position={[-7.035, 4.853, -6.518]} rotation={[-0.428, 0.895, 0.23]} scale={0.246}>
                    <mesh name="Plane007" castShadow receiveShadow geometry={nodes.Plane007.geometry} material={materials.strings} />
                    <mesh name="Plane007_1" castShadow receiveShadow geometry={nodes.Plane007_1.geometry} material={materials["Material.008"]} />
                </group>


                <group name="defaultMaterial114" position={[4.647, 3.315, -6.39]} rotation={[Math.PI, 0, -Math.PI]} scale={1.288}>
                    <mesh
                        name="defaultMaterial114_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial114_1.geometry}
                        material={materials.PaletteMaterial003}
                    >

                        <meshStandardMaterial
                            color={new THREE.Color(1, 1, 1)}
                            emissive={new THREE.Color(1, 1, 1)}
                            emissiveIntensity={1}
                            toneMapped={false}
                        />

                    </mesh>
                    <mesh
                        name="defaultMaterial114_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.defaultMaterial114_2.geometry}
                        material={materials.initialShadingGroup_1001}
                    />
                </group>
                <group name="book_cover005" position={[-0.003, 0.305, 0.038]} rotation={[-Math.PI / 2, 0, 1.817]} scale={0.784}>
                    <mesh
                        name="book_cover005_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.book_cover005_1.geometry}
                        material={materials["book_cover.005"]}
                    />
                    <mesh name="book_cover005_2" castShadow receiveShadow geometry={nodes.book_cover005_2.geometry} material={materials.book_paper} />
                </group>
                <mesh
                    name="book_cover006"
                    castShadow
                    receiveShadow
                    geometry={nodes.book_cover006.geometry}
                    material={materials["book_cover.006"]}
                    position={[-0.701, 0.261, 0.029]}
                    rotation={[-Math.PI / 2, 0, 1.683]}
                    scale={0.1}
                />
                <mesh
                    name="book_cover007"
                    castShadow
                    receiveShadow
                    geometry={nodes.book_cover007.geometry}
                    material={materials["book_cover.007"]}
                    position={[0.667, 0.372, 0.011]}
                    rotation={[-Math.PI / 2, 0, 2.527]}
                    scale={0.105}
                />
                <mesh
                    name="Cabinet_cover"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cabinet_cover.geometry}
                    material={materials["wood (Oak Matt Antracite Gray)"]}
                    position={[0, 0.181, -0.005]}
                    scale={0.91}
                />

            </group>
        </group>
    )
}

useGLTF.preload('/room10.glb')