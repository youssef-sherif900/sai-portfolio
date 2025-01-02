import { useBounds } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { usePopupStore } from "@/lib/popupStore";

export default function SelectToZoom({ children }) {

  const api = useBounds()
  // const initialPosition = useRef([5,4.5,11]); // Set your initial position here
  const camera = useRef(null);

  const resetCameraPosition = () => {
    if (camera.current) {
      camera.current.position.set(...initialPosition);
      camera.current.updateMatrixWorld();
    }
  };

  const [initialPosition, setInitialPosition] = useState([5, 4.5, 8]); // Default to desktop


  const { setFocusedObject } = useStore()
  const { setPopupFor } = usePopupStore()

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta <= 2) {

          console.log(e.object.name)

          if (["Cube015", "Cube015_1", "Cube015_2", "Cube015_3", "Cube015_4", "Cube015_5", "Cube015_6", "Cube015_7", "Cube015_8", "Cube015_9", "Cube015_10", "Cube015_11", "Cube015_12", "Cube015_13"].includes(e.object.name)) {

            api.refresh(e.object).moveTo([-5.924, 6, 5.187]).lookAt({
              target: [-5.924, 2.27, 5.187],
              up: [-1, 1, 0]
            });

            setPopupFor("piano")

            setFocusedObject("piano")
          } else if (["TV_1", "TV_2", 'TV'].includes(e.object.name)) {
            api.refresh(e.object).moveTo([0.7, 5, -3]).lookAt({ target: [0.7, 3.5, -5], up: [0, 0, 0] })

            setPopupFor("tv")

            console.log("tv")
          }
          else {
            console.log(false)
            api.refresh(e.object).moveTo([-7 + 1.75, 2.5, -6.059 + 1.5]).lookAt({
              target: [-7, 1.33, -6.059],
              up: [0.15, 1, 0]
            });

            setPopupFor("guitar")

            setFocusedObject("guitar")

          }
        } // Zoom effect when clicked
      }}
      onPointerMissed={(e) => {
        if (e.button === 0) {
          resetCameraPosition();  // Reset camera position
          api.refresh().fit().moveTo([3, 4.5, 3]).lookAt({ target: [1, 3, 1], up: [0, 0.8, 0] });
          setFocusedObject(null)
          setPopupFor(null)
        }
      }}
    >
      <perspectiveCamera ref={camera} position={initialPosition.current} />
      {children}
    </group>
  );
}
