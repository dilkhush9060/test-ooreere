import {cn} from "../../utils/cn";

export const ArrowIcon = ({className}: {className?: string}) => {
  return (
    <div className={cn("h-[10px] w-[18px]", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Vector"
          d="M0.918945 6.49911L19.0816 6.49911M19.0816 6.49911L15.026 1.5M19.0816 6.49911L15.026 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
