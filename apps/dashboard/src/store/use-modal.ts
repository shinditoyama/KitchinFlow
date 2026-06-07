import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  order: IOrder | null;

  openModal: (order: IOrder) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  order: null,

  openModal: (order) => set({ isOpen: true, order }),
  closeModal: () => set({ isOpen: false }),
}));
