/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {AuthStore} from "@/store/auth";
import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
// import {useEffect} from "react";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

export default function LoggedUser() {
  const user = AuthStore((state) => state.auth.user);
  const logout = AuthStore((state) => state.logout);
  const navigate = useNavigate();

  // api call
  const {mutate, isPending} = useMutation({
    mutationKey: ["signin"],
    mutationFn: async () => {
      return Api.post("/auth/signout").then((res) => res.data);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      toast.success(data?.message);
      logout();
      querryClient.clear();
      navigate("/signin");
    },
  });

  return (
    <div className="flex items-center gap-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-transparent">
            <Avatar
              name={user.name}
              src={user?.picture}
              size="30"
              round={true}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
            {user.role === "admin" ? (
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                Dashboard
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => navigate("/my-purchase")}>
                My purchase
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/change-password")}>
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/delete-account")}>
              Delete Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={() => mutate()} disabled={isPending}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
