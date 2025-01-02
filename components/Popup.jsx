'use client'
import { usePopupStore } from "../lib/popupStore"

function Popup({ type, children, time }) {
  const { setPopupFor, popupFor } = usePopupStore()
  return (
    <div
      className={`${type !== popupFor
          ? "opacity-0 invisible"
          : "opacity-100 visible"
        } fixed h-screen w-screen bg-black rounded-lg p-6 z-50 text-gray-400 transition-opacity duration-300 overflow-y-auto`}
        style={{transitionDelay : `${time}ms`}}
    >
      <div className="p-4  h-full flex flex-col items-center justify-center">
        {children}
        <div className="mt-4 text-center">
          <button
            onClick={() => setPopupFor(null)}
            className="px-4 py-2 border-white border-2 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup
