import { Server } from "@prisma/client";

const ServerSideBar = ({ server }: { server: Server | null }) => {
    const textChannel = server?.channels


  return <>ServerSideBar</>;
};

export default ServerSideBar;
