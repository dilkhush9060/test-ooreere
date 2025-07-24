import {memo, useCallback, useEffect, useRef, useState} from "react";
import {IMessage} from "@/types";
import {useSocketStore} from "@/store/socket";
import {cn} from "@/utils/cn";
import {formatDate} from "@/utils/formateDate";

interface MessageProps {
  message: IMessage;
  userId: string;
  ticketId: string;
}

export const Message: React.FC<MessageProps> = memo(
  ({message, userId, ticketId}) => {
    const {markAsRead} = useSocketStore();
    const isOwnMessage = message.senderId === userId;
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

    const messageRef = useRef<HTMLDivElement>(null);

    const handleMarkAsRead = useCallback(() => {
      if (!message.isRead && !isOwnMessage) {
        markAsRead(ticketId, message._id);
      }
    }, [message._id, message.isRead, isOwnMessage, markAsRead, ticketId]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleMarkAsRead();
              observer.disconnect(); // Stop observing after first visibility
            }
          });
        },
        {
          threshold: 0.6, // Adjust as needed (60% of message in view)
        }
      );

      if (messageRef.current) {
        observer.observe(messageRef.current);
      }

      return () => observer.disconnect();
    }, [handleMarkAsRead]);

    // Helper function to check if file is an image
    const isImageFile = (fileType: string) => {
      const imageTypes = [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp",
        "svg",
        "bmp",
        "tiff",
        "ico",
      ];
      return imageTypes.includes(fileType.toLowerCase());
    };

    // Handle image click
    const handleImageClick = () => {
      setIsImagePopupOpen(true);
    };

    // Handle popup close
    const handlePopupClose = () => {
      setIsImagePopupOpen(false);
    };

    // Handle escape key press
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isImagePopupOpen) {
          setIsImagePopupOpen(false);
        }
      };

      if (isImagePopupOpen) {
        document.addEventListener("keydown", handleEscapeKey);
      }

      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }, [isImagePopupOpen]);

    return (
      <>
        <div
          ref={messageRef}
          className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2 items-end gap-2`}
        >
          {!isOwnMessage && <div className="h-10 w-10" />}{" "}
          <div
            className={cn(
              "rounded-2xl p-[10px]",
              isOwnMessage
                ? "rounded-br-[4px] bg-[#ECF0FF]"
                : "rounded-bl-[4px] bg-[#FFF8F0]"
            )}
          >
            {message.message ? (
              <p className="text-sm">{message.message}</p>
            ) : (
              <>
                {message?.media?.fileType &&
                isImageFile(message.media.fileType) ? (
                  <img
                    src={message.media.fileUrl}
                    alt={message.media.fileName}
                    className="max-h-60 max-w-full cursor-pointer rounded-lg transition-opacity hover:opacity-90"
                    onClick={handleImageClick}
                  />
                ) : (
                  <video
                    src={message?.media?.fileUrl}
                    controls
                    className="max-h-60 max-w-full rounded-lg"
                  />
                )}
              </>
            )}
            <p className="mt-1 text-[10px] text-gray-400">
              {formatDate(message.timestamp)}
            </p>
          </div>
          <div>
            {isOwnMessage && (message.isRead ? <ReadIcon /> : <UnreadIcon />)}
          </div>
        </div>

        {/* Image Popup Modal */}
        {isImagePopupOpen &&
          message?.media?.fileType &&
          isImageFile(message.media.fileType) && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
              onClick={handlePopupClose}
            >
              <div className="relative max-h-[90vh] max-w-[90vw] p-4">
                <button
                  onClick={handlePopupClose}
                  className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-2 shadow-lg transition-colors hover:bg-gray-100"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <img
                  src={message.media.fileUrl}
                  alt={message.media.fileName}
                  className="max-h-full max-w-full rounded-lg object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                {message.media.fileName && (
                  <p className="mt-2 text-center text-sm text-white">
                    {message.media.fileName}
                  </p>
                )}
              </div>
            </div>
          )}
      </>
    );
  }
);

const UnreadIcon = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_367_3038)">
      <path
        d="M0.736328 13.4081L6.48604 18.9981L7.93633 17.5781L2.1969 11.9981M23.19 5.57812L12.3078 16.1681L8.0289 11.9981L6.55804 13.4081L12.3078 18.9981L24.6506 6.99812M18.8289 6.99812L17.3786 5.57812L10.8472 11.9281L12.3078 13.3381L18.8289 6.99812Z"
        fill="#808080"
      />
    </g>
    <defs>
      <clipPath id="clip0_367_3038">
        <rect
          width="24.6857"
          height="24"
          fill="white"
          transform="translate(0.314453)"
        />
      </clipPath>
    </defs>
  </svg>
);

const ReadIcon = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_367_3038)">
      <path
        d="M0.736328 13.4081L6.48604 18.9981L7.93633 17.5781L2.1969 11.9981M23.19 5.57812L12.3078 16.1681L8.0289 11.9981L6.55804 13.4081L12.3078 18.9981L24.6506 6.99812M18.8289 6.99812L17.3786 5.57812L10.8472 11.9281L12.3078 13.3381L18.8289 6.99812Z"
        fill="#3B82F6"
      />
    </g>
    <defs>
      <clipPath id="clip0_367_3038">
        <rect
          width="24.6857"
          height="24"
          fill="white"
          transform="translate(0.314453)"
        />
      </clipPath>
    </defs>
  </svg>
);
