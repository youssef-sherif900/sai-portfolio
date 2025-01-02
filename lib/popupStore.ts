import { create } from 'zustand';  // Correct import statement

// Define the store type
interface StoreState {
  popupFor: string | null; // The object that is focused
  setPopupFor: (id: string | null) => void; // Action to set the focused object
}

// Create Zustand store with proper type annotations
export const usePopupStore = create<StoreState>((set) => ({
  popupFor: "", // Initial value for focusedObject
  setPopupFor: (id: string | null) => set({ popupFor: id }), // Correct property name for focusedObject
}));
