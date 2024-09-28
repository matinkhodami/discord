import useModalStore from "@/hooks/use-modal-store";

// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import MemberItem from "@/components/server/MemberItem";

const ManageUser = () => {
  const {
    type,
    data: { server },
    isOpen,
    onClose,
  } = useModalStore();
  if (!server) return null;

  const isManageUserOpen = type === "manageUser" && isOpen;

  return (
    <Dialog
      open={isManageUserOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent className="dark:bg-dark bg-light p-6 shadow-lightPrimary/50">
        <DialogHeader>
          <DialogTitle className="text-center text-lightSecondary dark:text-darkPrimary">Manage User</DialogTitle>
          <DialogDescription className="text-center text-lightSecondary/60">
            {server?.members.length}
            {server?.members.length > 1 ? " members" : " member"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-6">
          <div className="flex flex-col gap-2">
            {server.members.map((member) => (
              <MemberItem member={member} serverID={server.id} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUser;
