// store.ts or store.js
import {create} from 'zustand';  // Correct import statement

// Define the store type
interface StoreState {
  focusedObject: string; // The object that is focused
  setFocusedObject: (id: string | null) => void; // Action to set the focused object
}

// Create Zustand store with proper type annotations
export const useStore = create<StoreState>((set:any) => ({
  focusedObject: "", // Initial value for focusedObject
  setFocusedObject: (id: string | null) => set({ focusedObject: id }), // Correct property name for focusedObject
}));
