import {Link} from "react-router";

export default function ChatIcon() {
  return (
    <>
      <Link to={"/support"}>
        <div className="fixed bottom-10 right-10 z-40 cursor-pointer rounded-full bg-primary p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <img src="/bot.png" width={40} height={40} />
        </div>
      </Link>
    </>
  );
}
