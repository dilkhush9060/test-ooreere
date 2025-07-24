import {Check, Circle} from "lucide-react";

interface StepProps {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  stepNumber: number;
}

const Step = ({label, isActive, isCompleted}: StepProps) => {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full md:h-8 md:w-8 ${
          isActive
            ? "bg-[#0043CE] text-white"
            : isCompleted
              ? "bg-[#0043CE] text-white"
              : "bg-gray-200 text-gray-400"
        }`}
      >
        {isCompleted ? (
          <Check className="h-2 w-2 md:h-5 md:w-5" />
        ) : (
          <Circle className="h-2 w-2 md:h-5 md:w-5" fill="currentColor" />
        )}
      </div>
      <span
        className={`absolute left-0 right-0 top-[calc(100%+1px)] mt-2 text-center text-xs font-semibold ${
          isActive || isCompleted ? "text-blue-700" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const Connector = ({isActive}: {isActive: boolean}) => (
  <div className="mt-[6px] flex-1 md:mt-[16px]">
    <div
      className={`h-[2px] w-full ${isActive ? "bg-[#0043CE]" : "bg-gray-200"}`}
    />
  </div>
);

export {Step, Connector};
