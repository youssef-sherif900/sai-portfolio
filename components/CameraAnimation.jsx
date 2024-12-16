import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useState } from "react";
import * as THREE from "three";


export default function CameraAnimation() {
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(true);
    const startPos = useRef(new THREE.Vector3(0, 0, 0));
    const targetPos = useRef(new THREE.Vector3(-0.5, 4, -3));

    const targetRotation = useRef(new THREE.Euler(0, 0, 0)); 
    
  
    useEffect(() => {
      camera.position.copy(startPos.current);

      camera.rotation.copy(new THREE.Euler(0, 0, 0));

      

    }, []);
  
    useFrame((state, delta) => {
      if (isAnimating) {
        // Move the camera towards the target position
        camera.position.lerp(targetPos.current, 0.1);


              // Lerp the camera's rotation towards the target rotation
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, 0.1);
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, 0.1);
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.current.z, 0.1);

  
        // Check if the camera is close enough to the target position
        if (camera.position.distanceTo(targetPos.current) < 0.1) {
          // Stop the animation once the target is reached
          setIsAnimating(false);
        }
      }
    });
  
    return null;
  }
  