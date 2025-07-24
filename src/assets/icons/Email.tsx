import {cn} from "../../utils/cn";

export default function EmailIcon({className}: {className?: string}) {
  return (
    <div className={cn("h-6 w-6", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="ic:sharp-email">
          <path
            id="Vector"
            d="M22 4H2V20H22V4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
}
