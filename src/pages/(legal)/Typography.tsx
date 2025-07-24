import {cn} from "../../utils/cn";

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("text-2xl font-bold leading-[2.125rem]", className)}>
      {children}
    </h1>
  );
};

export const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-sm font-semibold leading-6", className)}>
      {children}
    </h2>
  );
};

export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm font-normal leading-6", className)}>{children}</p>
  );
};

export const LinkText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm font-medium leading-6", className)}>{children}</p>
  );
};

export const ItalicText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm font-medium italic leading-6", className)}>
      {children}
    </p>
  );
};

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn("mx-auto max-w-screen-xl px-6 lg:px-8 xl:px-0", className)}
    >
      {children}
    </main>
  );
};
