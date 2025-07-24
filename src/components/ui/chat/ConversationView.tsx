import {useEffect, useRef, useState} from "react";
import {formatDate} from "@/utils/formateDate";
import {cn} from "@/utils/cn";
import {useTicketStore} from "@/store/ticket";
import {AuthStore} from "@/store/auth";

export default function ConversationView({
  isAdmin,
  className,
}: {
  isAdmin?: boolean;
  className?: string;
}) {
  const [input, setInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const {
    connect,
    joinTicket,
    leaveTicket,
    sendMessage,
    ticketId,
    tickets,
    isConnected,
    setUserId,
    userId: storeUserId,
  } = useTicketStore();

  const ticket = ticketId ? tickets[ticketId] : null;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = AuthStore((state) => state.auth.user.id);
  const hasJoinedRef = useRef<string | null>(null);

  useEffect(() => {
    if (userId && userId !== storeUserId) {
      console.log("[ConversationView] Setting userId:", userId);
      setUserId(userId);
      connect();
    }
  }, [userId, storeUserId, setUserId, connect]);

  // Handle ticket joining/leaving
  useEffect(() => {
    if (ticketId && isConnected && hasJoinedRef.current !== ticketId) {
      console.log("[ConversationView] Joining ticket:", ticketId);
      joinTicket(ticketId);
      hasJoinedRef.current = ticketId;
    }

    return () => {
      // Only leave if we actually joined this ticket
      if (hasJoinedRef.current && hasJoinedRef.current === ticketId) {
        console.log("[ConversationView] Leaving ticket:", hasJoinedRef.current);
        leaveTicket(hasJoinedRef.current);
        hasJoinedRef.current = null;
      }
    };
  }, [ticketId, isConnected, joinTicket, leaveTicket]);

  // Scroll to bottom when new messages arrive
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  // }, [ticket?.messages?.length]);

  const handleSend = () => {
    if (!input.trim() || !ticketId || !isConnected || !userId) {
      console.warn(
        "[ConversationView] Cannot send message - missing requirements"
      );
      return;
    }
    sendMessage(ticketId, input.trim());
    setInput("");
  };

  if (!ticketId) {
    return (
      <div
        className={cn(
          "flex max-w-full flex-grow flex-col items-center justify-center overflow-hidden rounded-[14px] bg-white px-4 py-5 shadow-md",
          className
        )}
      >
        <div className="text-center text-gray-500">
          <img
            src="/chatbot.png"
            alt="Select a ticket"
            className="mx-auto mb-4 h-16 w-16 opacity-50"
          />
          <p>Select a ticket to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex max-w-full flex-grow flex-col justify-between overflow-hidden rounded-[14px] bg-white px-4 py-5 shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex w-full items-center justify-between gap-3 border-b pb-2">
        <div className="flex items-center gap-3">
          <img src="/chatbot.png" alt="Chatbot" className="h-9 w-9" />
          <div className="text-lg font-semibold">Help & Support</div>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-xs text-gray-500">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Off</span>
              <label className="relative flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <div className="peer-checked:bg-blue-500 peer h-5 w-9 rounded-full bg-gray-200 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-full" />
              </label>
              <span className="ml-2">On</span>
            </div>
            <button className="rounded-lg bg-red-500 px-3 py-1 text-white">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="h-full flex-grow overflow-y-auto px-2">
        {ticket?.messages?.length ? (
          <div className="flex flex-col space-y-4 pb-2">
            {ticket.messages.map((msg, index) => {
              const isOwn = msg._id === userId;
              console.log(msg, userId);
              console.log(isOwn);
              return (
                <div
                  key={msg._id || index}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg p-3",
                      isOwn
                        ? "bg-blue-500 rounded-br-none text-white"
                        : "rounded-bl-none bg-gray-200 text-gray-800"
                    )}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {formatDate(msg.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-gray-400">
            {!isConnected
              ? "Connecting..."
              : "No messages yet. Start the conversation!"}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t pt-3">
        <input
          type="text"
          className="focus:ring-blue-500 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 disabled:bg-gray-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isConnected ? "Type a message..." : "Connecting..."}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={!isConnected}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
          disabled={!isConnected || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
