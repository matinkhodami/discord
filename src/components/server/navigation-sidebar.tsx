import { Separator } from "@/components/ui/separator";
import NavigationAddButton from "@/components/server/navigation-add-button";
import ModeToggle from "@/components/ui/toggleTheme";
import { Server } from "@prisma/client";
import NavigationItem from "@/components/server/navigation-item";
import UserButton from "@/components/UserButton";
import { ScrollArea } from "@/components/ui/scroll-area";
const NavigationSideBar = ({ servers }: { servers: Server[] }) => {
  return (
    <aside className="hidden sm:flex sm:flex-col sm:justify-between sm:items-center w-[66px] h-full bg-secondary rounded-md p-2 shadow-inner">
      <div className="flex flex-col gap-2">
        <NavigationAddButton />
        <Separator className="w-full h-[1px] bg-gray" />
        <ScrollArea>
          <div className="flex flex-col py-2">
            {servers.map((server) => (
              <NavigationItem server={server} key={server.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </aside>
  );
};

export default NavigationSideBar;
