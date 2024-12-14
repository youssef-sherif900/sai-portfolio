'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import Loader from '../Loader';
import { CameraControls, Environment } from '@react-three/drei';
import { Model } from './models/Room';



export function Scene() {

  return (
    <div className="h-screen w-full ">
      <Canvas>
        <Suspense fallback={<Loader/>}>
         <Environment preset='city' />
          <CameraControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model/>
        </Suspense>
      </Canvas>
    </div>
  )
}