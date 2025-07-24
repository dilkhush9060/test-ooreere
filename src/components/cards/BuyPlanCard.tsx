import {cn} from "@/utils/cn";
import dateFormat from "dateformat";
interface BuyPlanCardProps {
  Plan: string;
  planColor: string;
  city: string;
  start: Date;
  end: Date;
}

export default function BuyPlanCard({
  Plan,
  planColor,
  city,
  start,
  end,
}: BuyPlanCardProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-2">
        <div
          className={cn(
            planColor,
            "flex w-full items-center justify-center rounded-t-xl py-6"
          )}
        >
          <div className="text-xl font-bold text-white">{Plan}</div>
        </div>
        <div
          className={cn(
            "w-72 cursor-pointer rounded-b-xl border border-[#E5E5E5] bg-white p-4"
          )}
        >
          <p className="py-2 text-xl font-bold"> City: {city}</p>
          <p className="py-2 text-lg font-semibold">
            Start: {dateFormat(start, "mmmm dS, yyyy")}
          </p>
          <p className="py-2 text-lg font-semibold">
            End: {dateFormat(end, "mmmm dS, yyyy")}
          </p>
        </div>
      </div>
    </>
  );
}
