
import React from 'react'

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export default Loader