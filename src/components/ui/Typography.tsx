import {cn} from "../../utils/cn";

export const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-[0.938rem] leading-6 md:text-lg md:font-medium md:leading-[1.875rem]",
        className
      )}
    >
      {children}
    </p>
  );
};

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={cn(
      "self-stretch text-[3.5rem] font-bold leading-[3.8rem]",
      className
    )}
  >
    {children}
  </h2>
);

export const H4 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={cn("self-stretch text-2xl font-semibold", className)}>
    {children}
  </h2>
);

export const P1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={cn("self-stretch leading-7", className)}>{children}</p>;
