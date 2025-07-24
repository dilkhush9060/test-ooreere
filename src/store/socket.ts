import {create} from "zustand";
import {io, Socket} from "socket.io-client";
import {IMessage, Ticket, SocketStatus} from "../types/index";

interface SocketState {
  socket: Socket | null;
  messages: IMessage[];
  unreadCount: number;
  ticket: Ticket | null;
  error: string | null;
  status: SocketStatus;
  isLoading: boolean;
  currentTicketId: string | null;
  connectSocket: (userId: string, ticketId: string) => void;
  switchTicket: (newTicketId: string) => void;
  sendMessage: (ticketId: string, message: string) => void;
  markAsRead: (ticketId: string, messageId: string) => void;
  getUnreadCount: () => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  messages: [],
  unreadCount: 0,
  ticket: null,
  error: null,
  status: SocketStatus.DISCONNECTED,
  isLoading: true,
  currentTicketId: null,
  connectSocket: (userId, ticketId) => {
    const {socket, currentTicketId} = get();
    if (socket && currentTicketId === ticketId) return; // Prevent duplicate connections

    if (socket) {
      socket.emit("leaveTicket", currentTicketId);
      socket.disconnect();
    }

    const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
      query: {userId},
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    newSocket.on("connect", () => {
      set({status: SocketStatus.CONNECTED, isLoading: false});
      // console.log("Connected to server:", newSocket.id);
      newSocket.emit("joinTicket", ticketId);
      set({currentTicketId: ticketId});
    });

    newSocket.on("messageHistory", (messages: IMessage[]) => {
      set({messages, isLoading: false});
    });

    newSocket.on("newMessage", ({message}: {message: IMessage}) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    newSocket.on("ticketUpdated", ({ticket}: {ticket: Ticket}) => {
      set({ticket});
    });

    newSocket.on("messageRead", ({messageId}: {messageId: string}) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? {...msg, isRead: true} : msg
        ),
      }));
    });

    newSocket.on("unreadCount", ({unreadCount}: {unreadCount: number}) => {
      set({unreadCount});
    });

    newSocket.on("error", ({message}: {message: string}) => {
      set({error: message});
    });

    newSocket.on("reconnect_attempt", () => {
      set({status: SocketStatus.RECONNECTING});
    });

    newSocket.on("reconnect", () => {
      set({status: SocketStatus.CONNECTED});
      newSocket.emit("joinTicket", ticketId);
      set({currentTicketId: ticketId});
    });

    newSocket.on("reconnect_failed", () => {
      set({error: "Failed to reconnect. Please refresh the page."});
    });

    newSocket.on("disconnect", () => {
      set({status: SocketStatus.DISCONNECTED});
      // console.log("Disconnected from server");
    });

    set({socket: newSocket});
  },
  switchTicket: (newTicketId) => {
    const {socket, currentTicketId} = get();
    if (socket && socket.connected && newTicketId !== currentTicketId) {
      socket.emit("leaveTicket", currentTicketId);
      socket.emit("joinTicket", newTicketId);
      set({currentTicketId: newTicketId, messages: [], isLoading: true});
    }
  },
  sendMessage: (ticketId, message) => {
    const {socket} = get();
    if (socket && socket.connected) {
      socket.emit("sendMessage", {ticketId, message});
    } else {
      set({error: "Cannot send message: Disconnected"});
    }
  },
  markAsRead: (ticketId, messageId) => {
    const {socket} = get();
    if (socket && socket.connected) {
      socket.emit("markAsRead", {ticketId, messageId});
    }
  },
  getUnreadCount: () => {
    const {socket} = get();
    if (socket && socket.connected) {
      socket.emit("getUnreadCount");
    }
  },
  disconnectSocket: () => {
    const {socket, currentTicketId} = get();
    if (socket) {
      socket.emit("leaveTicket", currentTicketId);
      socket.disconnect();
      set({
        socket: null,
        messages: [],
        unreadCount: 0,
        ticket: null,
        error: null,
        status: SocketStatus.DISCONNECTED,
        currentTicketId: null,
      });
    }
  },
}));
