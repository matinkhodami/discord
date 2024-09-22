import { ServerInfo } from "@/components/server/lib/getServer";
import { create } from "zustand";

type ModalType = "createServer" | "invite" | "leaveServer" | "deleteServer" | "serverSettings" | "manageUser";
interface ModalData {
  server?: ServerInfo;
}
interface modalStore {
  type: ModalType | null; 
  data: ModalData
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

const useModalStore = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen(type, data = {}) {
    set({ isOpen: true, type, data });
  },
  onClose() {
    set({ isOpen: false, type: null });
  },
}));

export default useModalStore