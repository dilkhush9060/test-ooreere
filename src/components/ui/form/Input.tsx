import * as React from "react";

export interface InputFieldProps {
  icon: string;
  label: string;
  type?: string;
  showPasswordToggle?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  icon,
  label,
  type = "text",
  showPasswordToggle,
}) => {
  const inputId = `${label.toLowerCase().replace(/\s/g, "-")}-input`;

  return (
    <div className="flex w-full flex-col items-start justify-center rounded-[30px] border border-solid border-zinc-100 bg-white px-7 py-5 text-sm text-zinc-800 max-md:px-5">
      <label htmlFor={inputId} className="flex max-w-full items-center gap-2">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="aspect-square w-6 shrink-0 object-contain"
        />
        <span>{label}</span>
      </label>
      <input
        type={type}
        id={inputId}
        className="mt-2 w-full outline-none"
        aria-label={label}
      />
      {showPasswordToggle && (
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/521e969a6ed443df1d31e6dc4ae1643db2e55e0e6a36a39eebe56d6f09605658?placeholderIfAbsent=true&apiKey=78640e5ad6de4532a35ee4b3754f32ce"
          alt=""
          className="my-auto aspect-[1.15] w-[15px] self-stretch object-contain"
        />
      )}
    </div>
  );
};
