import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function CameraOscillation() {
  const { camera } = useThree();
  const [mouseX, setMouseX] = useState(0); // For horizontal mouse/touch position (affects X-axis)
  const [mouseY, setMouseY] = useState(0); // For vertical mouse/touch position (affects Z-axis)
  const [isButtonClicked, setIsButtonClicked] = useState(false); // To track button click
  const [isLookAtEnabled, setIsLookAtEnabled] = useState(true); // To track if lookAt should be active

  useEffect(() => {
    // Set the initial camera position
    camera.position.set(8, 10, 10); // Initial position with a slight offset

    // Function to handle mouse movement
    const onMouseMove = (event) => {
      const normalizedMouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to range [-1, 1]
      const normalizedMouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to range [-1, 1] for Y-axis

      setMouseX(normalizedMouseX); // Update mouseX for X-axis movement
      setMouseY(normalizedMouseY); // Update mouseY for Z-axis movement
    };

    // Function to handle touch movement
    const onTouchMove = (event) => {
      const touch = event.touches[0]; // Get the first touch point
      const normalizedTouchX = (touch.clientX / window.innerWidth) * 2 - 1; // Normalize to range [-1, 1]
      const normalizedTouchY = -(touch.clientY / window.innerHeight) * 2 + 1; // Normalize to range [-1, 1] for Y-axis

      setMouseX(normalizedTouchX); // Update mouseX with touch position for X-axis
      setMouseY(normalizedTouchY); // Update mouseY with touch position for Z-axis
    };

    // Add event listeners for mouse and touch movement
    if (!isButtonClicked) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove, { passive: true }); // Use passive for better performance
    }

    // Cleanup on unmount or when button is clicked
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [camera, isButtonClicked]); // The effect depends on `isButtonClicked`

  useFrame(() => {
    // If button is clicked, stop applying mouse/touch movement to the camera
    if (!isButtonClicked) {
      const movementAmountX = mouseX * 5; // Scale mouseX to move the camera on X-axis
      const movementAmountZ = mouseY * 5; // Scale mouseY to move the camera on Z-axis (forward/backward)

      // Update the camera's position
      camera.position.x = 8 + movementAmountX; // Keep initial offset (8) and move the camera on the X-axis
      camera.position.z = 10 + movementAmountZ; // Keep initial offset (10) and move the camera on the Z-axis
    }

    // Only apply lookAt if the lookAt is enabled
    if (isLookAtEnabled) {
      camera.lookAt(new THREE.Vector3(0, 3, 0)); // Look at a fixed point (adjust as needed)
    }
  });

  // Handle button click to remove button, disable mouse/touch movement, and move the camera to a new position
  const handleClick = () => {
    setIsButtonClicked(true); // Set the state to remove the button and stop the effect
    setIsLookAtEnabled(false); // Disable the lookAt functionality after the click

    // Move the camera to a new position after click
    camera.position.set(15, 15, 15); // Change this to the desired position
  };

  return (
    <Html as="div" fullscreen={!isButtonClicked} >
      {!isButtonClicked && (
        <div className="h-full w-full" onClick={handleClick}>
          <button
            className="text-white border-2 border-white p-2 px-4 whitespace-nowrap hover:bg-blue-800 bg-black absolute bottom-24 left-1/2 -translate-x-1/2">
            Click any where to begin
          </button>
        </div>
      )}
    </Html>
  );
}
