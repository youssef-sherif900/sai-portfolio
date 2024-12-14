import { Html, useProgress } from '@react-three/drei'
import React from 'react'

function Loader() {
    const { progress } = useProgress()
    return (
      <Html fullscreen>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-blue-500">{progress.toFixed(0)}% loaded</p>
        </div>
      </Html>
    )
}

export default Loader