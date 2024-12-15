import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HoneycombLight({ geometry, material, ...props }) {
    const light = useRef();

    useFrame((state) => {
        const t = (Math.sin(state.clock.elapsedTime) + 1) / 2; // Smoothly oscillates between 0 and 1

        // Interpolate between colors: Red, Green, Blue
        const red = new THREE.Color(1, 0, 0);  // Red color
        const green = new THREE.Color(0, 1, 0);  // Green color
        const blue = new THREE.Color(0, 0, 1);  // Blue color

        // Interpolate between the three colors based on the value of t
        if (t < 0.33) {
            light.current.color.lerpColors(red, green, t * 3);  // From red to green
        } else if (t < 0.66) {
            light.current.color.lerpColors(green, blue, (t - 0.33) * 3);  // From green to blue
        } else {
            light.current.color.lerpColors(blue, red, (t - 0.66) * 3);  // From blue to red
        }
    });

    return (

        <mesh {...props} geometry={geometry} material={material} position={[1.328, 6.323, -7.159]} rotation={[0, -Math.PI / 2, 0]} scale={[0.236, 2.481, 2.675]} >
            <meshStandardMaterial
                attach="material"
                ref={light}
            />
        </mesh>
    );
}