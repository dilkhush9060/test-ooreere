/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";
import {io, Socket} from "socket.io-client";
import {devtools} from "zustand/middleware";

/* ----------------------- Types ----------------------- */
export interface Message {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface Ticket {
  _id: string;
  messages: Message[];
  updatedAt: string;
  isClosed: boolean;
}

interface TicketStore {
  socket: Socket | null;
  tickets: Record<string, Ticket>;
  unreadCount: number;
  ticketId: string;
  userId: string;
  isConnected: boolean;

  setTicketId: (id: string) => void;
  setUserId: (id: string) => void;

  connect: () => void;
  disconnect: () => void;

  joinTicket: (ticketId: string) => void;
  leaveTicket: (ticketId: string) => void;
  sendMessage: (ticketId: string, text: string) => void;
  markAsRead: (ticketId: string, messageId: string) => void;
  refreshUnread: () => void;
}

/* ----------------------- Store ----------------------- */
export const useTicketStore = create<TicketStore>()(
  devtools((set, get) => ({
    socket: null,
    tickets: {},
    unreadCount: 0,
    ticketId: "",
    userId: "",
    isConnected: false,

    setTicketId: (id: string) => set({ticketId: id}),
    setUserId: (id: string) => set({userId: id}),

    connect: () => {
      const {socket, isConnected, userId} = get();

      // Don't create multiple connections
      if (socket && isConnected) {
        console.log("[socket] Already connected");
        return;
      }

      // Disconnect existing socket if any
      if (socket) {
        console.log("[socket] Cleaning up existing socket");
        socket.removeAllListeners();
        socket.disconnect();
      }

      if (!userId) {
        console.warn("[socket] No userId provided");
        return;
      }

      const socketUrl =
        import.meta.env.VITE_SOCKET_URL ||
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000";
      console.log("[socket] Connecting to:", socketUrl, "with userId:", userId);

      const newSocket: Socket = io(socketUrl, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        auth: {
          userId: userId,
        },
        forceNew: true,
      });

      newSocket.on("connect", () => {
        console.log("[socket] Connected with ID:", newSocket.id);
        set({isConnected: true});

        // Re-join current ticket if any
        const currentTicketId = get().ticketId;
        if (currentTicketId) {
          console.log("[socket] Re-joining ticket:", currentTicketId);
          newSocket.emit("joinTicket", currentTicketId);
        }
      });

      newSocket.on("disconnect", (reason: string) => {
        console.log("[socket] Disconnected:", reason);
        set({isConnected: false});
      });

      newSocket.on("connect_error", (error: any) => {
        console.error("[socket] Connection error:", error?.message || error);
        set({isConnected: false});
      });

      newSocket.on("reconnect", (attemptNumber: number) => {
        console.log("[socket] Reconnected after", attemptNumber, "attempts");
        set({isConnected: true});
      });

      newSocket.on("reconnect_error", (error: any) => {
        console.error("[socket] Reconnection error:", error?.message || error);
      });

      newSocket.on("reconnect_failed", () => {
        console.error("[socket] Reconnection failed");
        set({isConnected: false});
      });

      // Message handlers
      newSocket.on("messageHistory", (messages: Message[]) => {
        console.log("[socket] Received message history:", messages.length);
        const ticketId = get().ticketId;
        if (!ticketId) return;

        set((state) => ({
          tickets: {
            ...state.tickets,
            [ticketId]: {
              _id: ticketId,
              messages: messages,
              updatedAt: new Date().toISOString(),
              isClosed: false,
            },
          },
        }));
      });

      newSocket.on(
        "newMessage",
        ({ticketId, message}: {ticketId: string; message: Message}) => {
          console.log("[socket] New message for ticket:", ticketId);
          console.log("🚀", message);
          set((state) => {
            const ticket = state.tickets[ticketId];
            if (!ticket) {
              return {
                tickets: {
                  ...state.tickets,
                  [ticketId]: {
                    _id: ticketId,
                    messages: [message],
                    updatedAt: new Date().toISOString(),
                    isClosed: false,
                  },
                },
              };
            }

            return {
              tickets: {
                ...state.tickets,
                [ticketId]: {
                  ...ticket,
                  messages: [...ticket.messages, message],
                  updatedAt: new Date().toISOString(),
                },
              },
            };
          });
        }
      );

      newSocket.on(
        "ticketUpdated",
        ({ticketId, ticket}: {ticketId: string; ticket: Ticket}) => {
          console.log("[socket] Ticket updated:", ticketId);
          set((state) => ({
            tickets: {
              ...state.tickets,
              [ticketId]: ticket,
            },
          }));
        }
      );

      newSocket.on(
        "messageRead",
        ({ticketId, messageId}: {ticketId: string; messageId: string}) => {
          set((state) => {
            const ticket = state.tickets[ticketId];
            if (!ticket) return state;

            const updatedMessages = ticket.messages.map((m) =>
              m._id === messageId ? {...m, isRead: true} : m
            );

            return {
              tickets: {
                ...state.tickets,
                [ticketId]: {
                  ...ticket,
                  messages: updatedMessages,
                },
              },
            };
          });
        }
      );

      newSocket.on("unreadCount", ({unreadCount}: {unreadCount: number}) => {
        set({unreadCount});
      });

      set({socket: newSocket});
    },

    disconnect: () => {
      const {socket} = get();
      console.log("[socket] Manual disconnect");
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
      set({
        socket: null,
        isConnected: false,
      });
    },

    joinTicket: (ticketId: string) => {
      const {socket, isConnected} = get();
      console.log(
        "[socket] Attempting to join ticket:",
        ticketId,
        "Connected:",
        isConnected
      );

      if (socket && isConnected) {
        socket.emit("joinTicket", ticketId);
        console.log("[socket] Joined ticket:", ticketId);
      } else {
        console.warn("[socket] Cannot join ticket - not connected");
      }
    },

    leaveTicket: (ticketId: string) => {
      const {socket, isConnected} = get();
      console.log("[socket] Leaving ticket:", ticketId);

      if (socket && isConnected) {
        socket.emit("leaveTicket", ticketId);
      }
    },

    sendMessage: (ticketId: string, text: string) => {
      const {socket, isConnected, userId} = get();
      console.log(
        "[socket] Sending message to ticket:",
        ticketId,
        "Connected:",
        isConnected,
        "UserId:",
        userId
      );

      if (socket && isConnected && userId) {
        socket.emit("sendMessage", {ticketId, message: text, userId});
        console.log("[socket] Message sent");
      } else {
        console.warn(
          "[socket] Cannot send message - not connected or no userId"
        );
      }
    },

    markAsRead: (ticketId: string, messageId: string) => {
      const {socket, isConnected} = get();
      if (socket && isConnected) {
        socket.emit("markAsRead", {ticketId, messageId});
      }
    },

    refreshUnread: () => {
      const {socket, isConnected} = get();
      if (socket && isConnected) {
        socket.emit("getUnreadCount");
      }
    },
  }))
);
