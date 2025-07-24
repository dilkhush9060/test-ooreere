
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthStore } from "../store/auth";
import Loader from "./ui/Loader";


export default function AuthProvider({
  children,
  authenticated = true,
}: {
  children: React.ReactNode;
  authenticated?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 const auth = AuthStore((state) => state.auth.status);
 

  useEffect(() => {
    if (authenticated && auth !== authenticated) {
      navigate("/signin");
    } else if (!authenticated && auth !== authenticated) {
      navigate("/");
    }

    setLoading(false);
  }, [auth, authenticated, navigate, loading]);

  return loading ? <h1><Loader/></h1> : <>{children}</>;
  
}
