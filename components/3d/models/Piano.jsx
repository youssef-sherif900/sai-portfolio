import { usePopupStore } from '@/lib/popupStore'
import { useStore } from '@/lib/store'
import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import * as Tone from "tone"



function Piano() {

    const { nodes, materials, animations } = useGLTF("/room10.glb")
    const { ref, actions, names } = useAnimations(animations)
    const [index, setIndex] = useState(12)
    const { focusedObject } = useStore()
    const { popupFor } = usePopupStore()




    // Define keyboard-to-animation index mapping for rows 'asdfghjkl' and 'zxcvbnm'
    const keyToIndex = {
        'a': 4, 's': 5, 'd': 6, 'f': 7, 'g': 8, 'h': 9, 'j': 10, 'k': 11, 'l': 12,
        'z': 18, 'x': 19, 'c': 20, 'v': 21, 'b': 22, 'n': 23, 'm': 24
    };

    const synth = new Tone.Synth({
        oscillator: {
            type: 'triangle', // Use a 'triangle' wave for a smoother, more piano-like sound
        },
        envelope: {
            attack: 0.05, // Quick attack for immediate sound
            decay: 0.2, // Short decay time
            sustain: 0.4, // Sustain the sound for a while
            release: 0.5, // Smooth release
        }
    }).toDestination();

    // Add the keydown event listener to detect keypresses
    const handleKeyDown = (event) => {
        const now = Tone.now(); // Get the current time for note triggering

        if (keyToIndex[event.key]) {
            const newIndex = keyToIndex[event.key];
            setIndex(newIndex);  // Update animation index

            // Trigger sound based on the key pressed
            const noteMapping = {
                'a': "C4", 's': "D4", 'd': "E4", 'f': "F4", 'g': "G4", 'h': "A4", 'j': "B4", 'k': "C5", 'l': "D5",
                'z': "E5", 'x': "F5", 'c': "G5", 'v': "A5", 'b': "B5", 'n': "C6", 'm': "D6"
            };

            synth.triggerAttackRelease(noteMapping[event.key], "8n", now); // Trigger sound for the corresponding note
        }
    };
    useEffect(() => {
        const currentAction = actions[names[index]];

        // Ensure that the action is defined before applying fadeIn and fadeOut
        if (currentAction) {
            currentAction.reset().fadeIn(0.5).play().fadeOut(0.5);
        }

        // Cleanup with fadeOut
        return () => {
            if (currentAction) {
                currentAction.fadeOut(0.5);
            }
        };
    }, [index, actions, names]);

    useEffect(() => {
        // Register the event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Handle the key click and index update
    const handleKeyClick = (note, key, e) => {
        // Prevent event propagation
        e.stopPropagation();

        // Update the index based on the pressed key
        const newIndex = keyToIndex[key];
        setIndex(newIndex);

        // Trigger the note sound
        synth.triggerAttackRelease(note, "8n");
    };


    return (
        <group ref={ref}>
            <group name="White_keys001" position={[-5.924, 2.27, 5.187]} scale={[2.098, 2.577, 2.577]}>
                {

                    (focusedObject === "piano" && popupFor !== "piano" && window.innerWidth <= 768 )

                    &&
                    <Html
                        position={[0, 0, 0]}  // Adjusted position (a bit above the piano and further from the camera)
                        style={{ pointerEvents: 'auto', position:'absolute' , right:-150, top:100}}
                        as='div'
                    >
                        <div className='flex flex-col items-center justify-center'>


                            <div className='flex items-center justify-center gap-x-2'>
                                <button style={blackButtonStyle} onClick={(e) => handleKeyClick('E5', 'z', e)}>C#</button>
                                <button style={blackButtonStyle} onClick={(e) => handleKeyClick('F5', 'x', e)}>D#</button>
                                <button style={blackButtonStyle} onClick={(e) => handleKeyClick('G5', 'c', e)}>F#</button>
                                <button style={blackButtonStyle} onClick={(e) => handleKeyClick('A5', 'v', e)}>G#</button>
                                <button style={blackButtonStyle} onClick={(e) => handleKeyClick('B5', 'b', e)}>A#</button>
                            </div>


                            <div className='flex items-center justify-center'>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('C4', 'a', e)}>C</button>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('D4', 's', e)}>D</button>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('E4', 'd', e)}>E</button>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('F4', 'f', e)}>F</button>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('G4', 'g', e)}>G</button>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('A4', 'h', e)}>A</button>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('B4', 'j', e)}>B</button>
                                <button style={buttonStyle} onClick={(e) => handleKeyClick('C5', 'k', e)}>C</button>
                                {/* <button style={buttonStyle} onClick={(e) => handleKeyClick('D5', 'l', e)}>L</button> */}
                            </div>

                        </div>
                    </Html>}
                <mesh
                    name="Cube015"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015.geometry}
                    material={materials.PaletteMaterial001}
                    morphTargetDictionary={nodes.Cube015.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_1.geometry}
                    material={materials.PaletteMaterial001}
                    morphTargetDictionary={nodes.Cube015_1.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_1.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_2.geometry}
                    material={materials.PaletteMaterial001}
                    morphTargetDictionary={nodes.Cube015_2.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_2.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_3.geometry}
                    material={materials.PaletteMaterial001}
                    morphTargetDictionary={nodes.Cube015_3.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_3.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_4.geometry}
                    material={materials.Stand}
                    morphTargetDictionary={nodes.Cube015_4.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_4.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_5.geometry}
                    material={materials.WKeys}
                    morphTargetDictionary={nodes.Cube015_5.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_5.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_6.geometry}
                    material={materials.BKeys}
                    morphTargetDictionary={nodes.Cube015_6.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_6.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_7"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_7.geometry}
                    material={materials.Body}
                    morphTargetDictionary={nodes.Cube015_7.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_7.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_8.geometry}
                    material={materials.TopPart}
                    morphTargetDictionary={nodes.Cube015_8.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_8.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_9"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_9.geometry}
                    material={materials.PaletteMaterial001}
                    morphTargetDictionary={nodes.Cube015_9.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_9.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_10"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_10.geometry}
                    material={materials.TopPart}
                    morphTargetDictionary={nodes.Cube015_10.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_10.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_11"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_11.geometry}
                    material={materials.Speaker}
                    morphTargetDictionary={nodes.Cube015_11.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_11.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_12"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_12.geometry}
                    material={materials.Stand}
                    morphTargetDictionary={nodes.Cube015_12.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_12.morphTargetInfluences}
                />
                <mesh
                    name="Cube015_13"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube015_13.geometry}
                    material={materials.StandPart}
                    morphTargetDictionary={nodes.Cube015_13.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube015_13.morphTargetInfluences}
                />
            </group>
            <group name="PianoWhiteKey-6" position={[-6.099, 3.962, 4.676]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube016"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube016.geometry}
                    material={materials.WKeys}
                    position={[0.071, -0.005, 0]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-7" position={[-6.109, 3.949, 4.588]} scale={[3.868, 4.751, 4.751]}>
                <group position={[0.074, -0.002, -0.001]} scale={0.085}>
                    <mesh name="Cube047" castShadow receiveShadow geometry={nodes.Cube047.geometry} material={materials.WKeys} />
                    <mesh name="Cube047_1" castShadow receiveShadow geometry={nodes.Cube047_1.geometry} material={materials.BKeys} />
                </group>
            </group>
            <group name="PianoWhiteKey-5" position={[-6.098, 3.971, 4.774]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube058"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube058.geometry}
                    material={materials.WKeys}
                    position={[0.071, -0.007, -0.002]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-4" position={[-6.1, 3.97, 4.851]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube068"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube068.geometry}
                    material={materials.WKeys}
                    position={[0.071, -0.006, 0.002]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-8" position={[-6.113, 3.958, 4.493]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube069"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube069.geometry}
                    material={materials.WKeys}
                    position={[0.075, -0.004, -0.001]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-9" position={[-6.113, 3.956, 4.395]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube090"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube090.geometry}
                    material={materials.WKeys}
                    position={[0.075, -0.003, 0]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-10" position={[-6.105, 3.957, 4.307]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube091"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube091.geometry}
                    material={materials.WKeys}
                    position={[0.073, -0.004, 0]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-11" position={[-6.111, 3.965, 4.21]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube092"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube092.geometry}
                    material={materials.WKeys}
                    position={[0.074, -0.005, 0.001]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-12" position={[-6.138, 3.957, 4.12]} rotation={[0, 0, -0.002]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube093"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube093.geometry}
                    material={materials.WKeys}
                    morphTargetDictionary={nodes.Cube093.morphTargetDictionary}
                    morphTargetInfluences={nodes.Cube093.morphTargetInfluences}
                    position={[0.081, -0.004, 0]}
                    scale={0.085}
                />
            </group>
            <group name="White_keys015" position={[-6.756, 2.12, 5.164]} scale={[1.351, 1.66, 1.66]}>
                <mesh name="Cube099" castShadow receiveShadow geometry={nodes.Cube099.geometry} material={materials.Stand} />
                <mesh name="Cube099_1" castShadow receiveShadow geometry={nodes.Cube099_1.geometry} material={materials.StandPart} />
            </group>
            <group name="PianoWhiteKey-3" position={[-6.122, 3.96, 4.948]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube106"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube106.geometry}
                    material={materials.WKeys}
                    position={[0.077, -0.004, 0.001]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-2" position={[-6.117, 3.965, 5.051]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube107"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube107.geometry}
                    material={materials.WKeys}
                    position={[0.076, -0.005, -0.002]}
                    scale={0.085}
                />
            </group>
            <group name="PianoWhiteKey-1" position={[-6.12, 3.972, 5.136]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube108"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube108.geometry}
                    material={materials.WKeys}
                    position={[0.077, -0.007, 0]}
                    scale={0.085}
                />
            </group>

            <group name="PianoBlackKey-1" position={[-6.143, 3.997, 5.103]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube067"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube067.geometry}
                    material={materials.BKeys}
                    position={[0.053, -0.002, 0]}
                    scale={0.055}
                />
            </group>
            <group name="PianoBlackKey-2" position={[-6.143, 3.997, 5.003]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube110"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube110.geometry}
                    material={materials.BKeys}
                    position={[0.053, -0.002, 0]}
                    scale={0.055}
                />
            </group>
            <group name="PianoBlackKey-3" position={[-6.143, 3.997, 4.899]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube111"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube111.geometry}
                    material={materials.BKeys}
                    position={[0.053, -0.002, 0]}
                    scale={0.055}
                />
            </group>
            <group name="PianoBlackKey-4" position={[-6.143, 3.997, 4.737]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube112"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube112.geometry}
                    material={materials.BKeys}
                    position={[0.053, -0.002, 0]}
                    scale={0.055}
                />
            </group>
            <group name="PianoBlackKey-5" position={[-6.135, 4.001, 4.629]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube113"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube113.geometry}
                    material={materials.BKeys}
                    position={[0.051, -0.003, 0]}
                    scale={0.055}
                />
            </group>
            <group name="PianoBlackKey-6" position={[-6.143, 3.997, 4.453]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube114"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube114.geometry}
                    material={materials.BKeys}
                    position={[0.053, -0.002, 0]}
                    scale={0.055}
                />
            </group>
            <group name="PianoBlackKey-7" position={[-6.143, 3.997, 4.357]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube115"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube115.geometry}
                    material={materials.BKeys}
                    position={[0.053, -0.002, 0]}
                    scale={0.055}
                />
            </group>
            <group name="PianoBlackKey-8" position={[-6.143, 3.997, 4.254]} scale={[3.868, 4.751, 4.751]}>
                <mesh
                    name="Cube117"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube117.geometry}
                    material={materials.BKeys}
                    position={[0.053, -0.002, 0]}
                    scale={0.055}
                />
            </group>
        </group>
    )
}


// Button styling for white keys
const buttonStyle = {
    padding: '15px',
    backgroundColor: 'white',
    border: '1px solid black',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    width: '30px',
    height: '50px',
};

// Button styling for black keys
const blackButtonStyle = {
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid black',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    width: '20px',
    height: '30px',
};

export default Piano