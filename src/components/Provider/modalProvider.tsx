import CreateServerModal from "@/components/modals/createServer"
import InviteModal from "@/components/modals/InviteModal"
import LeaveServer from "../modals/LeaveServer"

const ModalProvider = () => {
  return (
    <>
        <CreateServerModal />
        <InviteModal />
        <LeaveServer />
    </>
  )
}

export default ModalProvider