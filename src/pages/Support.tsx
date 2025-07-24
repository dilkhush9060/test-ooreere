import {useEffect, useState} from "react";

import {useSocketStore} from "@/store/socket";

import {GetTicket} from "@/hooks/querry/Support";
import {ChatSidebar} from "@/components/ui/chat/ChatSidebar";
import {AuthStore} from "@/store/auth";
import {cn} from "@/utils/cn";
import ChatView from "@/components/ui/chat/ChatView";

export function Support() {
  const [open, setOpen] = useState(false);
  const {connectSocket, disconnectSocket} = useSocketStore();
  const user = AuthStore((state) => state?.auth?.user);
  const userId = AuthStore((state) => state?.auth?.user?.id);
  const {data, isLoading, error} = GetTicket();
  useEffect(() => {
    if (!data) {
      return;
    }
    connectSocket(userId, data?.data.tickets[0]?._id || "");
    return () => disconnectSocket();
  }, [connectSocket, disconnectSocket, userId, data]);

  return (
    <div className="flex h-screen bg-gray-100">
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
                "fixed -left-full bottom-0 top-14 transition-transform duration-200 ease-in-out md:static",
                open && "left-0 right-0"
              )}
            >
              <ChatSidebar
                tickets={data?.data?.tickets || []}
                setOpen={setOpen}
                user={
                  user
                    ? {
                        id: user?.id,
                        name: user?.name,
                        picture: user?.picture || "",
                      }
                    : undefined
                }
              />
            </div>

            <ChatView setOpen={setOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
