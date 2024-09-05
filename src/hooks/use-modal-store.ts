import { create } from "zustand";

type ModalType = "createServer";

interface modalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

const useModalStore = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen(type) {
    set({ isOpen: true, type });
  },
  onClose() {
    set({ isOpen: false, type: null });
  },
}));

export default useModalStore