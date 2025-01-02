import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { usePopupStore } from '@/lib/popupStore';

function Loader() {
  const { progress } = useProgress();
  const { setPopupFor } = usePopupStore();
  const [hasLoaded, setHasLoaded] = useState(false); // Track if the popup has already been set

  useEffect(() => {
    if (Math.round(progress) === 100 && !hasLoaded) {
      // Set the flag to true immediately to prevent further calls
      setHasLoaded(true);

      // Set a timeout to call setPopupFor after 10 seconds
        setPopupFor('interaction');
    }
  }, [progress, hasLoaded, setPopupFor]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-white text-xl">{`${Math.round(progress)}%`}</span>
    </div>
  );
}

export default Loader;
