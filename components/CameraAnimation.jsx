import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function CameraAnimation() {
  const { camera } = useThree();
  const [isAnimating, setIsAnimating] = useState(true);

  const startPos = useRef(new THREE.Vector3(0, 8, 10));

  // Waypoints for the camera path
  const waypoint1 = useRef(new THREE.Vector3(-5.924, 5, 5.187));
  const waypoint2 = useRef(new THREE.Vector3(-5.803, 2.809, -2.059));
  const targetPos = useRef(new THREE.Vector3(0.7, 5, -3));
  const lookAtTarget = useRef(new THREE.Vector3(0.7, 4.5, -5));
  const upVector = useRef(new THREE.Vector3(0, 0, 0)); // Custom up vector

  // Create a curve that goes through the waypoints
  const curve = useRef(
    new THREE.CatmullRomCurve3([
      startPos.current,
      waypoint1.current,
      waypoint2.current,
      targetPos.current,
    ])
  );

  const t = useRef(0); // Time or progress along the curve (0 to 1)

  useEffect(() => {
    camera.position.copy(startPos.current);
    camera.rotation.copy(new THREE.Euler(0, 0, 0));
  }, []);

  useFrame((state, delta) => {
    if (isAnimating) {
      // Increment progress t along the curve
      t.current += delta * 0.1; // Adjust speed by modifying 0.1

      if (t.current < 1) {
        // Sample position along the curve
        camera.position.copy(curve.current.getPointAt(t.current));

        // Optionally, smoothly rotate the camera as it moves along the curve
        const lookAt = new THREE.Vector3().lerpVectors(camera.position, lookAtTarget.current, 0.1);
        camera.lookAt(lookAt);

        // Smooth rotation is no longer needed since we're using `lookAt`
      } else {
        // Once camera reaches target position, set the final lookAt and up vector
        camera.position.copy(targetPos.current);
        camera.lookAt(lookAtTarget.current);
        camera.up.copy(upVector.current); // Set custom up vector

        // Stop the animation
        setIsAnimating(false);
      }
    }
  });

  return null;
}
