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
      <DialogContent className="dark:bg-darkSecondary">
        <DialogHeader>
          <DialogTitle className="text-center">Manage User</DialogTitle>
          <DialogDescription className="text-center">
            {server?.members.length}
            {server?.members.length > 1 ? " members" : " member"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-6">
          {server.members.map((member) => (
            <MemberItem member={member}/>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUser;
