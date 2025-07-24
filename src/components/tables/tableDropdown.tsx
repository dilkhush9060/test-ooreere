import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "../ui/Button";
import {MoreHorizontal} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {querryClient} from "@/utils/querryClient";
import {Api} from "@/utils/axios";

const TableDropdown = ({
  profile,
}: {
  profile: {
    _id: string;
    email: string;
    isSuspended: boolean;
  };
}) => {
  // account suspend
  const {mutate, isPending} = useMutation({
    mutationFn: async (accountId: string) => {
      const res = await Api.post(`profile/suspend/${accountId}`, {});
      return res.data;
    },

    onError: (error: {
      response: {
        data: {
          message: string;
        };
      };
    }) => {
      toast.error(error?.response?.data?.message);
    },

    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);
      querryClient.invalidateQueries({
        queryKey: ["all profiles"],
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(profile?.email)}
        >
          Copy Email ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View profile</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => mutate(profile._id)}
          disabled={isPending}
        >
          {profile.isSuspended ? "Unsuspend user" : "Suspend user"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropdown;
