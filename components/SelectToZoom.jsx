import { useBounds } from "@react-three/drei";
import { useRef } from "react";

export default function SelectToZoom({ children }) {
 
  const api = useBounds()
  const initialPosition = useRef([5,4.5,11]); // Set your initial position here
  const camera = useRef(null);

  const resetCameraPosition = () => {
    if (camera.current) {
      camera.current.position.set(...initialPosition.current);
      camera.current.updateMatrixWorld();
    }
  };

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta <= 2){

          if (e.object.name=== "piano"){
            api.refresh(e.object).moveTo([-4,5,8]).lookAt({target:[-12,5,1] , up:[0,5,0]})
          }else{
            api.refresh(e.object).fit();
          } 
           } // Zoom effect when clicked
      }}
      onPointerMissed={(e) =>  {if (e.button === 0) {
          resetCameraPosition();  // Reset camera position
          api.refresh().fit().moveTo([5,4.5,8]).lookAt({ target:[1,1,1] ,up:[0,0.8,0]});   
      }
        }}
    >
     <perspectiveCamera ref={camera} position={initialPosition.current} />
      {children}
    </group>
  );
}
