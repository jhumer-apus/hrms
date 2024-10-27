import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define your modal store interface
interface ModalStore {
    [name:string]: boolean; // Dynamic keys for modals with boolean values
    setModal: any; // Method to set modal state
}

// Create your Zustand store
export const useModalStore = create<any>()(
    immer(set => ({
        // Initial state and methods
        setModal: (modalName: string, isOpen: boolean) =>
            set((state:ModalStore) => 
                {
                    state[modalName] = isOpen;
                }
            ),
        })
    )
);
