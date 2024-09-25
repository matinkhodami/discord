"use client";
import { Button } from "@/components/ui/button";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

import { useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useModalStore from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";
interface SearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[];
  }[];
}
const Search = ({ data }: SearchProps) => {
  const router = useRouter();
  const { serverID } = useParams<{
    serverID: string;
  }>();
  const { isOpen, onClose, type, onOpen } = useModalStore();
  const isSearchModalOpen = isOpen && type === "searchInServer";

  useEffect(() => {
    if (!isSearchModalOpen) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          onOpen("searchInServer");
        }
      });
    }
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          onOpen("searchInServer");
        }
      });
    };
  }, []);

  function openPage(id: string, type: "member" | "channel") {
    if (type === "channel") {
      onClose();

      router.push(`/servers/${serverID}/channel/${id}`);
    } else if (type === "member") {
      onClose();

      router.push(`/servers/${serverID}/conversation/${id}`);
    }
  }
  return (
    <>
      <Button
        variant="outline"
        size="full"
        onClick={() => {
          onOpen("searchInServer");
        }}
      >
        <span className="w-full flex items-center gap-2 p-2">
          <Icon path={mdiMagnify} size={0.8} />
          Search
        </span>
        <code className="ml-auto mr-2 text-xs">Ctrl+K</code>
      </Button>

      <CommandDialog open={isSearchModalOpen} onOpenChange={onClose}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found!</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, icon, name }) => {
                  return (
                    <CommandItem key={id}>
                      <span
                        className="flex items-center gap-2 capitalize cursor-pointer"
                        onClick={() => {
                          openPage(id, type);
                        }}
                      >
                        {icon}
                        {name}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
