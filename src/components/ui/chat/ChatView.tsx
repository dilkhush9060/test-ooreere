import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {useSocketStore} from "@/store/socket";
import {Message} from "./message";
import {SocketStatus} from "@/types";
import {AuthStore} from "@/store/auth";
import {Menu, Paperclip, Trash2, Image, Video, File, X} from "lucide-react";
import {Button} from "../Button";
import {DeleteTicket, MediaUpload} from "@/hooks/mutation/Support";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

export default function ChatView({
  setOpen,
  isAdmin = false,
}: {
  setOpen: (open: boolean) => void;
  isAdmin?: boolean;
}) {
  const {
    messages,
    sendMessage,
    error,
    getUnreadCount,
    status,
    isLoading,
    currentTicketId,
  } = useSocketStore();
  const [input, setInput] = useState("");
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const userId = AuthStore((state) => state?.auth?.user?.id);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileOptionsRef = useRef<HTMLDivElement>(null);

  // Close file options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fileOptionsRef.current &&
        !fileOptionsRef.current.contains(event.target as Node)
      ) {
        setShowFileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  // Scroll to bottom when messages change or when chat loads
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // Scroll to bottom when loading finishes
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      scrollToBottom();
    }
  }, [isLoading, messages.length, scrollToBottom]);

  useEffect(() => {
    if (status === SocketStatus.CONNECTED && currentTicketId) {
      getUnreadCount();
    }
  }, [status, getUnreadCount, currentTicketId]);

  const handleFileSelect = (acceptedTypes: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptedTypes;
      fileInputRef.current.click();
    }
    setShowFileOptions(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    // if (files.length <= 1) {
    //   setSelectedFiles((prev) => [...prev, ...files]);
    // }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  //Api call to send media files

  const {mutate: sendFiles, isPending: isUploading} = MediaUpload(
    currentTicketId as string,
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(
            error?.response?.data?.message || "An unexpected error occurred"
          );
        } else {
          toast.error("An unexpected error occurred");
        }
      },
      onSuccess: (data: {message: string}) => {
        toast.success(data?.message);
      },
    }
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if ((input.trim() || selectedFiles.length > 0) && currentTicketId) {
        // Here you would typically handle file uploads
        // For now, we'll just send the text message

        // Handle file uploads here
        if (selectedFiles.length > 0) {
          // You'll need to implement file upload logic
          console.log("Files to upload:", selectedFiles);
          const formData = new FormData();
          formData.append("media", selectedFiles[0]);
          sendFiles(formData);
          // sendFiles(currentTicketId, selectedFiles);
        } else {
          if (input.trim()) {
            sendMessage(currentTicketId, input);
          }
        }

        setInput("");
        setSelectedFiles([]);
        setTimeout(scrollToBottom, 100);
      }
    },
    [
      input,
      selectedFiles,
      sendMessage,
      currentTicketId,
      scrollToBottom,
      sendFiles,
    ]
  );

  const {mutate, isPending} = DeleteTicket();

  const handleDeleteTicket = (ticketId: string) => {
    mutate(ticketId);
  };

  const retryConnection = useCallback(() => {
    useSocketStore
      .getState()
      .connectSocket(userId, currentTicketId || "default");
  }, [userId, currentTicketId]);

  if (!currentTicketId) {
    return (
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center rounded-lg bg-white shadow-lg">
        <p className="text-gray-600">Select a ticket to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="mx-2 flex h-full w-full flex-col overflow-y-auto rounded-lg bg-white shadow-lg">
      <div className="bg-blue-600 flex items-center justify-between rounded-t-lg p-4 shadow-sm">
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu />
        </button>
        <h2 className="w-full text-center text-lg font-semibold">
          Help & Support
        </h2>

        {isAdmin && (
          <Button
            onClick={() => handleDeleteTicket(currentTicketId)}
            variant="destructive"
            disabled={isPending}
          >
            <Trash2 />
          </Button>
        )}
      </div>
      <div>
        {status === SocketStatus.RECONNECTING && (
          <div className="mb-2 text-center text-yellow-600">
            Reconnecting...
          </div>
        )}
        {status === SocketStatus.DISCONNECTED && error && (
          <div className="mb-2 text-center text-red-600">
            {error}
            <button
              onClick={retryConnection}
              className="text-blue-600 ml-2 underline"
            >
              Retry
            </button>
          </div>
        )}
        {isLoading && (
          <div className="text-center text-gray-600">Loading messages...</div>
        )}
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth p-4"
      >
        {!isLoading && messages.length === 0 && (
          <div className="text-center text-gray-500">No messages yet.</div>
        )}
        {messages.map((msg) => (
          <Message
            key={msg._id}
            message={msg}
            userId={userId}
            ticketId={currentTicketId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="border-t bg-gray-50 p-3">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border bg-white p-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  {file.type.startsWith("image/") ? (
                    <Image className="h-4 w-4 text-green-500" />
                  ) : file.type.startsWith("video/") ? (
                    <Video className="text-blue-500 h-4 w-4" />
                  ) : (
                    <File className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="max-w-32 truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex items-center space-x-2">
          <div className="relative" ref={fileOptionsRef}>
            <button
              type="button"
              onClick={() => setShowFileOptions(!showFileOptions)}
              className="rounded p-1 text-slate-500 hover:text-slate-700"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {showFileOptions && (
              <div className="absolute bottom-full left-0 z-10 mb-2 min-w-40 rounded-lg border bg-white py-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => handleFileSelect("image/*")}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  <Image className="h-4 w-4 text-green-500" />
                  Images
                </button>
                <button
                  type="button"
                  onClick={() => handleFileSelect("video/*")}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  <Video className="text-blue-500 h-4 w-4" />
                  Videos
                </button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Type your message... ${selectedFiles.length > 0 ? `(${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""})` : ""}`}
            className="focus:ring-blue-500 flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2"
            disabled={
              status !== SocketStatus.CONNECTED || selectedFiles.length > 0
            }
          />
          {selectedFiles.length > 0 ? (
            <button
              type="submit"
              disabled={isUploading || status !== SocketStatus.CONNECTED}
              className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 disabled:bg-gray-400"
            >
              <SendIcon />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 disabled:bg-gray-400"
              disabled={status !== SocketStatus.CONNECTED}
            >
              <SendIcon />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const SendIcon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0001 4.2265L10.2528 18.5207L9.00006 10.5774L2.74729 5.52073L20.0001 4.2265Z"
      fill="#3B82F6"
      stroke="#3B82F6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.9936 4.2268L9.02654 10.6898"
      stroke="#3B82F6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
