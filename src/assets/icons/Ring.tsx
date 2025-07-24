import {cn} from "../../utils/cn";

export default function RingIcon({className}: {className?: string}) {
  return (
    <div className={cn("aspect-square h-6 w-6 text-[#FF6524]", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 654 654"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.1"
          d="M654 327C654 507.597 507.597 654 327 654C146.403 654 0 507.597 0 327C0 146.403 146.403 0 327 0C507.597 0 654 146.403 654 327ZM114.201 327C114.201 444.525 209.475 539.799 327 539.799C444.525 539.799 539.799 444.525 539.799 327C539.799 209.475 444.525 114.201 327 114.201C209.475 114.201 114.201 209.475 114.201 327Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
