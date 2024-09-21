import CreateServerModal from "@/components/modals/createServer";
import InviteModal from "@/components/modals/InviteModal";
import LeaveServer from "@/components/modals/LeaveServer";
import DeleteServer from "@/components/modals/DeleteServer";
import ServerSettingsModal from "../modals/ServerSettingsModal";

const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <LeaveServer />
      <DeleteServer />
      <ServerSettingsModal />
    </>
  );
};

export default ModalProvider;
