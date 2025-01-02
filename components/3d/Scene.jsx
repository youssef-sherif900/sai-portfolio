"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { EffectComposer, Bloom, ToneMapping, N8AO, Outline, Selection } from '@react-three/postprocessing';
import Loader from '../Loader';
import { CameraControls, Environment, Lightformer, Html } from '@react-three/drei';
import CameraAnimation from "../CameraAnimation"
import Room from '@/components/3d/models/NewModel'
import { sphereGeometry } from "three";
import * as THREE from "three"
import { usePopupStore } from '@/lib/popupStore';
import Popup from "../Popup"
import CameraOscillation from "../CameraOscillation"


function Effects() {
  return (
    <EffectComposer stencilBuffer disableNormalPass autoClear={false} multisampling={4}>
      <Bloom luminanceThreshold={0.2} mipmapBlur />
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <ToneMapping />
    </EffectComposer>
  );
}

export function Scene() {

  const [fov, setFov] = useState(0)
  const guitarRef = useRef()
  const spotlightRef = useRef()
  const targetRef = useRef(); // Ref for the target mesh
  const { popupFor } = usePopupStore()
  const [cameraOscillationVisible, setCameraOscillationVisible] = useState(true); // state for CameraOscillation visibility

  const handleClick = () => {
    setCameraOscillationVisible(false); // Hide the CameraOscillation on click/tap
  };

  // Function to determine the FOV based on screen size
  const updateFov = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setFov(120); // For mobile devices
    } else {
      setFov(80); // For desktop
    }
  };

  useEffect(() => {
    updateFov(); // Set initial FOV based on screen size
    window.addEventListener('load', updateFov); // Add resize listener

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('load', updateFov);
    };
  }, []);

  // Invisible object's position
  const spotlightPosition = [-6.803, 2.809, -6.059];

  return (
    <div className="h-screen w-full bg-black">



      {/* Overlay */}
      <Popup type='interaction' time={0}>
        <div class=" p-4 mb-6 text-center border-white border-2">
          <h2 class="lg:text-2xl font-bold lg:mb-4">Moving the View</h2>
          <ul class=" text-sm text-center inline-block lg:leading-8">
            <li>. Use your mouse to move the camera view around the room.</li>
            <li>. Click and drag to look in any direction and explore the environment.</li>
            <li>. Hover over objects like the guitar, piano, desk, and computer screen for possible interactions.</li>
          </ul>
        </div>

        <div class=" p-4 text-center border-white border-2">
          <h2 class="lg:text-2xl font-bold lg:mb-4">Interacting with Objects</h2>
          <ul class=" text-sm text-center inline-block lg:leading-8">
            <li>. When you see an object highlighted or clickable:</li>
            <li>. Click on it to focus on and interact with that object.</li>
            <li>. Return to the main room view by moving the mouse away or clicking outside the object's area.</li>
          </ul>
        </div>

      </Popup>


      <Popup type='piano' time={1000}>
        <div class="p-4 mb-6 text-center border-white border-2">
          <h2 class="text-2xl font-bold mb-4">Piano Controls</h2>
          <ul class="text-center inline-block lg:leading-8">
            <li>. To play the piano, use the A to K keys on your keyboard.</li>
            <li>. Each key corresponds to a specific note in a single octave:</li>
            <li><strong>A</strong> - C</li>
            <li><strong>S</strong> - D</li>
            <li><strong>D</strong> - E</li>
            <li><strong>F</strong> - F</li>
            <li><strong>G</strong> - G</li>
            <li><strong>H</strong> - A</li>
            <li><strong>J</strong> - B</li>
            <li><strong>K</strong> - C (next octave up)</li>
            <li>. Visual Feedback: When you press a key, the corresponding piano key will depress on the screen.</li>
          </ul>
        </div>

      </Popup>


      <Popup type='guitar' time={1000}>
        <div class="p-4 mb-6 text-center border-white border-2">
          <h2 class="text-2xl font-bold mb-4">Guitar Controls</h2>
          <ul class="text-center lg:leading-8">
            <li>. To play the guitar, use the A, S, D, and F keys on your keyboard.</li>
            <li>. Each key corresponds to a string, allowing you to strum a basic range of notes:</li>
            <li>  <strong>A</strong> - String 1 (highest pitch)</li>
            <li>  <strong>S</strong> - String 2</li>
            <li>  <strong>D</strong> - String 3</li>
            <li>  <strong>F</strong> - String 4 (lowest pitch)</li>
            <li>. Visual Feedback: When you press a key, the corresponding string will vibrate to mimic realistic guitar strumming.</li>
          </ul>
        </div>

      </Popup>



      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [15, 20, 25], fov: fov }}>

          {/* Spotlight on invisible object */}
          <spotLight
            ref={spotlightRef}
            position={[0, 0, 0]}
            intensity={1000}
            angle={Math.PI / 8}
            penumbra={1}
            castShadow
            color='gray'
            target={targetRef.current} // Target the dummy object
          />

          {/* Directional Light */}
          <directionalLight position={[4, 1, 4]} intensity={4} />

          {/* Environment Lighting */}
          <Environment resolution={512}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
          </Environment>

          {/* Effects and room */}
          <Selection>
            {fov === 80 ? <Effects /> : <ambientLight intensity={2} />}
            <Room />
            {/* {popupFor !== "interaction" && <CameraAnimation />} */}
            {popupFor !== "interaction" && <CameraOscillation />}
          </Selection>

          {/* Invisible Object */}
          <mesh ref={targetRef} position={spotlightPosition} visible={true}>
            <sphereGeometry args={[0.1, 32, 32]} /> {/* Invisible sphere */}
            <meshBasicMaterial opacity={0} transparent={true} /> {/* Invisible material */}
          </mesh>

        </Canvas>
      </Suspense>
    </div>
  );
}
