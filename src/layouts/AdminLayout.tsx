import AdminNav from "@/components/AdminNav";
import {AuthStore} from "@/store/auth";
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router";

export default function AdminLayout() {
  const user = AuthStore((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main className="min-h-screen">
      <AdminNav  />
      <Outlet />
    </main>
  );
}
