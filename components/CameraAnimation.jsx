import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useState } from "react";
import * as THREE from "three";


export default function CameraAnimation() {
    const { camera } = useThree();
    const [isAnimating, setIsAnimating] = useState(true);
    const startPos = useRef(new THREE.Vector3(0, 0, 0));
    const targetPos = useRef(new THREE.Vector3(5, 8, 10));
    
  
    useEffect(() => {
      camera.position.copy(startPos.current);
    }, []);
  
    useFrame((state, delta) => {
      if (isAnimating) {
        // Move the camera towards the target position
        camera.position.lerp(targetPos.current, 0.1);
  
        // Check if the camera is close enough to the target position
        if (camera.position.distanceTo(targetPos.current) < 0.1) {
          // Stop the animation once the target is reached
          setIsAnimating(false);
        }
      }
    });
  
    return null;
  }
  