import * as React from "react";

export interface BackButtonProps {
  icon: string;
  label: string;
}

export const BackButton: React.FC<BackButtonProps> = ({icon, label}) => {
  return (
    <button className="mr-36 flex items-center gap-2.5 self-end whitespace-nowrap rounded-[30px] px-7 py-8 text-sm font-medium text-zinc-600 max-md:mr-2.5 max-md:px-5">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="my-auto aspect-[1.05] w-5 shrink-0 self-stretch object-contain"
      />
      <span className="my-auto w-[35px] self-stretch rounded-none">
        {label}
      </span>
    </button>
  );
};
