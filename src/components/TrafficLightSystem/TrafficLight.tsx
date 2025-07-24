import {cn} from "../../utils/cn";

interface TrafficLightProps {
  activeLight: string;
  className?: string;
}

export default function TrafficLight({
  activeLight,
  className,
}: TrafficLightProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl bg-gray-800 p-3",
        className
      )}
    >
      <div
        className={`aspect-square w-6 shrink-0 rounded-full md:w-8 ${
          activeLight === "red"
            ? "bg-red-500 shadow-[0_0_2rem_rgba(255,0,0,0.6)]"
            : "bg-gray-500"
        }`}
      ></div>
      <div
        className={`aspect-square w-6 shrink-0 rounded-full md:w-8 ${
          activeLight === "yellow"
            ? "bg-yellow-500 shadow-[0_0_2rem_rgba(255,255,0,0.6)]"
            : "bg-gray-500"
        }`}
      ></div>
      <div
        className={`aspect-square w-6 shrink-0 rounded-full md:w-8 ${
          activeLight === "green"
            ? "bg-green-500 shadow-[0_0_2rem_rgba(0,255,0,0.6)]"
            : "bg-gray-500"
        }`}
      ></div>
    </div>
  );
}
