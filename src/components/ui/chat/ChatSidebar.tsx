import {useSocketStore} from "@/store/socket";
import {Ticket} from "@/types";
import {cn} from "@/utils/cn";
import {formatDate} from "@/utils/formateDate";
import {useCallback} from "react";
// import {Button} from "../Button";
// import {CreateTicket} from "@/hooks/mutation/Support";
import {NewTicket} from "@/components/modal/NewTicket";
import {ArrowLeft, X} from "lucide-react";
import Avatar from "react-avatar";

interface SidebarProps {
  tickets: Ticket[];
  setOpen: (open: boolean) => void;
  isAdmin?: boolean;
  user?: {id: string; name: string; picture: string};
}

export const ChatSidebar: React.FC<SidebarProps> = ({
  tickets,
  setOpen,
  isAdmin,
  user = {id: "", name: "", picture: ""},
}) => {
  const {currentTicketId, switchTicket} = useSocketStore();

  const handleTicketClick = useCallback(
    (ticketId: string) => {
      switchTicket(ticketId);
    },
    [switchTicket]
  );
  // const {mutate, isPending} = CreateTicket();

  // const handleNewTicketClick = ({topic}: {topic: string}) => {
  //   mutate({topic});
  // };

  return (
    <>
      <div className="h-full w-full overflow-y-auto border border-[#E6E9F5] bg-white p-5 md:w-[380px] md:rounded-[10px]">
        <div className="mb-5 flex justify-end">
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">
            <button
              onClick={() => window.history.back()}
              className="mb-2 flex cursor-pointer items-center gap-2"
            >
              <ArrowLeft size={20} />
              My Tickets
            </button>
          </div>
          {!isAdmin && <NewTicket />}
        </div>
        {/* <div className="mt-[27px] flex items-center gap-[10px] rounded-lg border border-[#E6E9F5] bg-[#F7F7F8] px-4 py-3">
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.38477 7.15858C1.38477 4.33546 3.70052 2.04688 6.55715 2.04688C7.92895 2.04688 9.24457 2.58543 10.2146 3.54406C11.1846 4.50269 11.7295 5.80287 11.7295 7.15858C11.7295 9.9817 9.41378 12.2703 6.55715 12.2703C3.70052 12.2703 1.38477 9.9817 1.38477 7.15858ZM11.6442 11.2757L13.1847 12.4915H13.2114C13.5231 12.7995 13.5231 13.2989 13.2114 13.6069C12.8998 13.9149 12.3945 13.9149 12.0828 13.6069L10.8044 12.1743C10.6836 12.0553 10.6156 11.8936 10.6156 11.725C10.6156 11.5564 10.6836 11.3947 10.8044 11.2757C11.0375 11.0493 11.4111 11.0493 11.6442 11.2757Z"
                fill="#200E32"
              />
            </g>
          </svg>

          <input
            type="text"
            className="bg-transparent focus:border-0 focus:outline-none focus:ring-0"
            placeholder="Search"
          />
        </div> */}
        <div className="flex flex-col gap-[50px] pt-6">
          {tickets.map((ticket, index) => (
            <Conversation
              onClick={() => handleTicketClick(ticket._id)}
              key={index}
              //@ts-expect-error name and profile might be undefined
              name={ticket?.account?.name}
              //@ts-expect-error name and profile might be undefined
              profile={ticket?.account?.profile}
              isAdmin={isAdmin}
              user={user}
              message={ticket.messages[0]?.message}
              time={formatDate(ticket.updatedAt)}
              active={currentTicketId === ticket._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

function Conversation({
  name,
  message,
  time,
  profile,
  className,
  onClick,
  user = {id: "", name: "", picture: ""},
  active,
  isAdmin = false,
}: {
  name: string;
  user: {id: string; name: string; picture: string};
  message: string;
  profile: string | undefined;
  time: string;
  isAdmin?: boolean;
  className?: string;
  onClick?: () => void;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-xl p-4",
        active && "bg-black/10",
        className
      )}
      onClick={onClick}
    >
      <div className="w-full">
        <div className="text-end text-[0.625rem]">{time}</div>
        <div className="text-base font-normal capitalize leading-5 text-[#030229]">
          {isAdmin ? (
            <Avatar
              name={name}
              src={profile}
              size="30"
              round
              className="mr-2 inline-block"
            />
          ) : (
            <Avatar
              name={user?.name || ""}
              src={user?.picture || ""}
              size="30"
              round
              className="mr-2 inline-block"
            />
          )}

          {isAdmin ? name : user?.name}
        </div>
        {message && (
          <div className="truncate px-4 pt-2 text-sm text-gray-500">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
