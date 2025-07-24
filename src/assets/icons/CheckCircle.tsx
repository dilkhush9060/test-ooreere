import {cn} from "../../utils/cn";

export default function CheckCircle({className}: {className?: string}) {
  return (
    <div className={cn("h-6 w-6", className)}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Subtract"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.476 26.1492C20.4498 26.1492 26.1033 20.4957 26.1033 13.5219C26.1033 6.54797 20.4498 0.894531 13.476 0.894531C6.50208 0.894531 0.848633 6.54797 0.848633 13.5219C0.848633 20.4957 6.50208 26.1492 13.476 26.1492ZM13.316 16.7229L18.2139 11.672L16.8192 10.3196L12.5913 14.6797L10.1048 12.3126L8.76534 13.7197L11.949 16.7503L12.646 17.4138L13.316 16.7229Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
