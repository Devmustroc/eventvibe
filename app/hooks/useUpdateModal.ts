import {create} from "zustand";


interface UpdateModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    updateEvent: object;
    updateListing: () => void;
}

const useUpdateModal = create<UpdateModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    updateEvent: {},
    updateListing: () => set(obj => ({updateEvent: obj.updateEvent}))
}));

export default useUpdateModal;