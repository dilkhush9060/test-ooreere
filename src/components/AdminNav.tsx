import {AlignJustify} from "lucide-react";
import {Link} from "react-router";
import SideBar from "./SideBar";
import {useHandler} from "@/store/handlebar";
import {AuthStore} from "@/store/auth";
import LoggedUser from "./ui/LoggedUser";
import {Button} from "./ui/Button";

export default function AdminNav() {
  const {onOpen, open, close} = useHandler((state) => state);
  const currentPath = window.location.pathname;
  const isLoogedIn = AuthStore((state) => state.auth.status);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 mb-[52px]  z-50 bg-white">
        <nav className="flex items-center justify-between px-8 py-2 shadow-sm">
          <div className="flex items-center gap-4 ">
            <AlignJustify
            className="cursor-pointer"
              onClick={() => {
                if (onOpen) {
                  close();
                } else {
                  open();
                }
              }}
            />
            <Link to={"/"} className="text-xl font-semibold leading-7">
              OOR<span className="text-primary">OOR</span>EE
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* <MessageCircleMore size={20} /> */}
            {isLoogedIn ? (
              <LoggedUser />
            ) : (
              <div className="flex items-center gap-8">
                <Link
                  to={"/signin"}
                  className={`text-base font-medium leading-[1.125rem] ${currentPath === "/login" ? "text-primary" : "text-black"}`}
                >
                  Sign in
                </Link>
                <Link to={"/register"} className="hidden sm:block">
                  <Button>Create free account</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div
          className={`absolute top-12 z-50 h-[100vh] w-56 bg-white ${onOpen ? "left-0 transition-all duration-300 ease-in-out" : "-left-[100%]"} transition-all duration-300 ease-in-out`}
        >
          <SideBar />
        </div>
      </header>
    </>
  );
}
