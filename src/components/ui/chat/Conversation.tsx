import {cn} from "@/utils/cn";

export default function Conversation({
  name,
  message,
  time,
  className,
  onClick,
  active,
}: {
  name: string;
  message: string;
  time: string;
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
          {name}
        </div>
        {message && (
          <div className="truncate text-sm text-gray-500">{message}</div>
        )}
      </div>
    </div>
  );
}
