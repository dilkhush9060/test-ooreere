export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-row gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
