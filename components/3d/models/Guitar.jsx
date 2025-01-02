import { Html, useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react'
import { SpotLight } from '@react-three/fiber';
import { useStore } from "@/lib/store"
import * as Tone from "tone"
import { usePopupStore } from '@/lib/popupStore';

function Guitar() {

  const { nodes, materials, animations } = useGLTF("/room10.glb");
  const { ref, actions, names } = useAnimations(animations);
  const [index, setIndex] = useState(1);
  const { focusedObject } = useStore();
  const { popupFor } = usePopupStore()

  // Refs to store the synth instances
  const synthRef = useRef(null);
  const pluckSynthRef = useRef(null);

  // Create and store synths in refs only once
  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: {
        type: 'square', // Square wave for a sharper tone
      },
      envelope: {
        attack: 0.01,    // Very short attack time to simulate plucking
        decay: 0.2,     // Short decay to mimic a guitar string decay
        sustain: 0,     // No sustain to simulate a non-sustaining sound
        release: 0.5,   // Relatively longer release time
      },
    }).toDestination();

    pluckSynthRef.current = new Tone.PluckSynth().toDestination();

    // Add chorus effect to create a more guitar-like sound
    const chorus = new Tone.Chorus(4, 2.5, 50).toDestination();
    pluckSynthRef.current.connect(chorus);

    // Cleanup when the component unmounts
    return () => {
      synthRef.current.dispose();
      pluckSynthRef.current.dispose();
    };
  }, []);

  // Handle keydown event
  const handleKeyDown = (event) => {
    const now = Tone.now(); // Get the current time for note triggering

    switch (event.key) {
      case 'q':
        setIndex(0);
        synthRef.current.triggerAttackRelease("C4", "8n", now); // Trigger sound for 'q' (C4 note)
        break;

      case 'w':
        setIndex(2);
        synthRef.current.triggerAttackRelease("E4", "8n", now); // Trigger sound for 'w' (E4 note)
        break;

      case 'e':
        setIndex(16);
        synthRef.current.triggerAttackRelease("G4", "8n", now); // Trigger sound for 'e' (G4 note)
        break;

      case 'r':
        setIndex(17);
        synthRef.current.triggerAttackRelease("A4", "8n", now); // Trigger sound for 'r' (A4 note)
        break;

      case 'u':
        setIndex(3);
        synthRef.current.triggerAttackRelease("B4", "8n", now); // Trigger sound for 'u' (B4 note)
        break;

      default:
        break;
    }
  };

  // Trigger animation when index changes
  useEffect(() => {
    const currentAction = actions[names[index]];

    // Ensure that the action is defined before applying fadeIn and fadeOut
    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
    }

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.5);
      }
    };
  }, [index, actions, names]);

  // Add event listener for keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleButtonClick = (newIndex, soundNote) => {
    setIndex(newIndex);
    actions[names[newIndex]].reset().fadeIn(0.5).play();
    synthRef.current.triggerAttackRelease(soundNote, "8n", Tone.now());
  };

  return (
    <group ref={ref} dispose={null}>

      <group name="soundborad004" position={[-6.803, 2.809, -6.059]} rotation={[-0.428, 0.895, 0.23]} scale={2.513}>
        <mesh name="Plane029" castShadow receiveShadow geometry={nodes.Plane029.geometry} material={materials.bracing} />
        <mesh name="Plane029_1" castShadow receiveShadow geometry={nodes.Plane029_1.geometry} material={materials.sides} />
        <mesh name="Plane029_2" castShadow receiveShadow geometry={nodes.Plane029_2.geometry} material={materials.neck} />
        <mesh name="Plane029_3" castShadow receiveShadow geometry={nodes.Plane029_3.geometry} material={materials.bridge} />
        <mesh name="Plane029_4" castShadow receiveShadow geometry={nodes.Plane029_4.geometry} material={materials["Back.001"]} />
        <mesh name="Plane029_5" castShadow receiveShadow geometry={nodes.Plane029_5.geometry} material={materials.top} />
        <mesh name="Plane029_6" castShadow receiveShadow geometry={nodes.Plane029_6.geometry} material={materials.PaletteMaterial008} />
        <mesh name="Plane029_7" castShadow receiveShadow geometry={nodes.Plane029_7.geometry} material={materials.PaletteMaterial009} />
        <mesh name="Plane029_8" castShadow receiveShadow geometry={nodes.Plane029_8.geometry} material={materials.PaletteMaterial010} />
        <mesh name="Plane029_9" castShadow receiveShadow geometry={nodes.Plane029_9.geometry} material={materials.Back} />
      </group>

      {/* Spotlight */}


      <mesh
        name="GuitarString-6"
        castShadow
        receiveShadow
        geometry={nodes["GuitarString-6"].geometry}
        material={materials.strings}
        morphTargetDictionary={nodes["GuitarString-6"].morphTargetDictionary}
        morphTargetInfluences={nodes["GuitarString-6"].morphTargetInfluences}
        position={[-6.572, 3.053, -6.049]}
        rotation={[-0.428, 0.895, 0.23]}
        scale={1.757}
      />

      {/* Guitar String */}
      <mesh
        name="GuitarString-2"
        castShadow
        receiveShadow
        geometry={nodes["GuitarString-2"].geometry}
        material={materials.strings}
        morphTargetDictionary={nodes["GuitarString-2"].morphTargetDictionary}
        morphTargetInfluences={nodes["GuitarString-2"].morphTargetInfluences}
        position={[-6.707, 3.152, -5.949]}
        rotation={[-0.428, 0.895, 0.23]}
        scale={1.85}
      >
        {
          (focusedObject === "guitar" && popupFor !== 'guitar' && window.innerWidth <= 768)

          &&

          <Html scale={1} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1]} style={{ pointerEvents: 'auto', position: 'absolute', right: 25, top: 25 }}>
            <div className="space-y-2 lg:space-y-8 bg-white p-2 py-4 rounded-lg">
              <button
                className="annotation"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents zoom behavior
                  handleButtonClick(0, "C4");
                }}
              >
                E
              </button>
              <button
                className="annotation"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents zoom behavior
                  handleButtonClick(2, "E4");
                }}
              >
                A
              </button>
              <button
                className="annotation"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents zoom behavior
                  handleButtonClick(16, "G4");
                }}
              >
                D
              </button>
              <button
                className="annotation"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents zoom behavior
                  handleButtonClick(17, "A4");
                }}
              >
                G
              </button>
              <button
                className="annotation"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents zoom behavior
                  handleButtonClick(3, "B4");
                }}
              >
                B
              </button>
            </div>
          </Html>

        }
      </mesh>
      <mesh
        name="GuitarString-3"
        castShadow
        receiveShadow
        geometry={nodes["GuitarString-3"].geometry}
        material={materials.strings}
        morphTargetDictionary={nodes["GuitarString-3"].morphTargetDictionary}
        morphTargetInfluences={nodes["GuitarString-3"].morphTargetInfluences}
        position={[-6.731, 3.232, -5.992]}
        rotation={[-0.428, 0.895, 0.23]}
        scale={1.932}
      />
      <mesh
        name="GuitarString-4"
        castShadow
        receiveShadow
        geometry={nodes["GuitarString-4"].geometry}
        material={materials.strings}
        morphTargetDictionary={nodes["GuitarString-4"].morphTargetDictionary}
        morphTargetInfluences={nodes["GuitarString-4"].morphTargetInfluences}
        position={[-6.662, 3.221, -6.083]}
        rotation={[-0.428, 0.895, 0.23]}
        scale={1.934}
      />
      <mesh
        name="GuitarString-5"
        castShadow
        receiveShadow
        geometry={nodes["GuitarString-5"].geometry}
        material={materials.strings}
        morphTargetDictionary={nodes["GuitarString-5"].morphTargetDictionary}
        morphTargetInfluences={nodes["GuitarString-5"].morphTargetInfluences}
        position={[-6.627, 3.136, -6.049]}
        rotation={[-0.428, 0.895, 0.23]}
        scale={1.848}
      />
    </group>
  )
}

export default Guitar