import {useEffect, useState} from "react";

import {useSocketStore} from "@/store/socket";

import {GetAllTicket} from "@/hooks/querry/Support";
import {ChatSidebar} from "@/components/ui/chat/ChatSidebar";
import {AuthStore} from "@/store/auth";
import ChatView from "@/components/ui/chat/ChatView";
import {cn} from "@/utils/cn";
import {useHandler} from "@/store/handlebar";

export default function Message() {
  const [open, setOpen] = useState(false);
  const {connectSocket, disconnectSocket} = useSocketStore();

  const userId = AuthStore((state) => state?.auth?.user?.id); // Replace with auth mechanism
  const {data, isLoading, error} = GetAllTicket();
  const {onOpen} = useHandler((state) => state);
  useEffect(() => {
    connectSocket(userId, data?.data.tickets[0]?._id || ""); // Join first ticket by default
    return () => disconnectSocket();
  }, [connectSocket, disconnectSocket, userId, data]);

  return (
    <div
      className={`${onOpen ? "ml-64" : "ml-0"} transition-all duration-300 ease-in-out`}
    >
      <div className="mt-16 flex h-screen bg-gray-100">
        <div className="flex w-full flex-col">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              Loading tickets...
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center text-red-600">
              Error: {(error as Error).message}
            </div>
          ) : (
            <div className="relative flex h-[calc(100vh-68px)] gap-4 p-4">
              <div
                className={cn(
                  "fixed -left-full bottom-0 top-10 transition-transform duration-200 ease-in-out md:static",
                  open && "left-0 right-0"
                )}
              >
                <ChatSidebar
                  setOpen={setOpen}
                  tickets={data?.data.tickets || []}
                  isAdmin={true}
                />
              </div>
              <ChatView setOpen={setOpen} isAdmin={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
