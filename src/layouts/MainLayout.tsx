import {Outlet, useLocation} from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatIcon from "@/components/ui/chat/ChatIcon";
import {AuthStore} from "@/store/auth";

export default function MainLayout() {
  const location = useLocation();
  const showChatIcon = location.pathname !== "/support";
  const user = AuthStore((state) => state?.auth?.user?.role) !== "admin";
  return (
    <div className="antialiased">
      <Navbar />
      <Outlet />
      <Footer />

      {user && showChatIcon && <ChatIcon />}
    </div>
  );
}
