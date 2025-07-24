export interface IMessage {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  media?: {
    fileUrl: string;
    fileName: string;
    fileType: string;
  };
}

export interface Ticket {
  _id: string;
  topic: string;
  account: string;
  isClosed: boolean;
  messages: IMessage[];
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
}

export enum SocketStatus {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  RECONNECTING = "reconnecting",
}

export interface TicketResponse {
  statusCode: number;
  message: string;
  data: {
    tickets: Ticket[];
  };
}
