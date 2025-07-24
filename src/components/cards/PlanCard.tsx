import CheckCircle from "../../assets/icons/CheckCircle";
import {cn} from "../../utils/cn";

interface PlanCardProps {
  index?: number;
  name: string;
  price: string;
  duration: string;
  features: string | string[];
  isSoldOut?: boolean;
  buttonText: string;
  className?: string;
  color?: string;
  secondaryColor?: string;
  buttonClasssName?: string;
  onClick?: () => void;
}

export default function PlanCard({
  index,
  name,
  price,
  duration,
  features,
  isSoldOut = false,
  buttonText,
  className,
  buttonClasssName,
  onClick,
  // color,
  secondaryColor,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] px-5 py-9 text-center text-white shadow-[0px_3.89px_8.74px_0px_#0000000D]",
        className
      )}
    >
      <div
        className={cn(
          `absolute left-1/2 top-[90px] aspect-square w-[582px] -translate-x-1/2 rounded-full ${index === 1 ? "bg-[#FFA734]" : "bg-[#3B82F6]"}`
        )}
        style={{backgroundColor: secondaryColor}}
      ></div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold leading-8 md:text-3xl md:leading-9">
          {name}
        </h3>
        <div className="relative mx-auto mb-[30px] mt-[52px] flex w-max items-end justify-center text-2xl font-semibold">
          <div className="absolute -left-4 -top-2 text-2xl font-semibold">
            ₹
          </div>
          <div className="text-5xl font-semibold leading-9">{price}</div>
          <span className="text-sm">/{duration}</span>
        </div>
        <ul className="mx-auto mb-4 w-[324.42px] space-y-2 rounded-[10px] bg-white text-black">
          <div className="mx-auto flex w-max flex-col gap-6 py-6">
            {features instanceof Array ? (
              features.map((feature, i) => (
                <li key={i} className={`flex items-center gap-2`}>
                  <div
                    className={cn(
                      `${index == 1 ? "text-[#FF9000]" : "text-[#3B82F6]"}`
                    )}
                    style={{color: secondaryColor}}
                  >
                    <CheckCircle />
                  </div>
                  {feature}
                </li>
              ))
            ) : (
              <li className={`flex items-center gap-2`}>
                <div
                  className={cn(
                    `${index == 1 ? "text-[#FF9000]" : "text-[#3B82F6]"}`
                  )}
                  style={{color: secondaryColor}}
                >
                  <CheckCircle />
                </div>
                {features}
              </li>
            )}
            <button
              onClick={!isSoldOut ? onClick : undefined}
              className={cn(
                "rounded-[19px] px-[77px] py-4 text-white",
                {
                  "cursor-not-allowed opacity-50": isSoldOut,
                },
                index == 1 ? "bg-[#FF9000]" : "bg-[#3B82F6]",
                buttonClasssName
              )}
              disabled={isSoldOut}
            >
              {buttonText}
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}
