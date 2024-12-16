"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { EffectComposer, Bloom, ToneMapping, N8AO, Outline, Selection } from '@react-three/postprocessing';
import Loader from '../Loader';
import { Environment, Lightformer } from '@react-three/drei';
import { Model } from './models/Room16';
import CameraAnimation from "../CameraAnimation"


function Effects() {
  const { size } = useThree();
  
  return (
    <EffectComposer stencilBuffer disableNormalPass autoClear={false} multisampling={4}>
      <Bloom luminanceThreshold={0.2} mipmapBlur />
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur width={size.width * 1.25} edgeStrength={10} /> 
      <ToneMapping />
    </EffectComposer>
  );
}

export function Scene() {
  return (
    <div className="h-screen w-full bg-black">
      <Suspense fallback={<Loader/>}>
        <Canvas camera={{ position: [15, 20, 25] }}>
          <Environment resolution={512}>
            {/* Ceiling */}
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
            {/* Sides */}
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
            {/* Key */}
            <Lightformer form="ring" color="red" intensity={10} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
          </Environment>
          <Selection>
            <Effects/>
            <Model/>
            <CameraAnimation />
          </Selection>
        </Canvas>
      </Suspense>
    </div>
  );
}