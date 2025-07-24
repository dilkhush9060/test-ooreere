import {Button} from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import {Input} from "@/components/ui/input";
// import {Label} from "@/components/ui/label";

import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";

import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

// import {Plus} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";

export function RejectModal(item: {isApproved: boolean; _id: string}) {
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);

  const {mutate: rejectMutate, isPending: rejectPending} = useMutation({
    mutationFn: async (videoId: string) => {
      const res = await Api.patch(`video/reject/${videoId}`, {
        reason,
      });
      return res.data;
    },

    onError: (error: AxiosError) => {
      if (error instanceof AxiosError) {
        toast.error(
          (error.response?.data as {message?: string})?.message ||
            "Error rejecting video"
        );
      }
    },

    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);
      setOpen(false);
      setReason("");

      querryClient.invalidateQueries({
        queryKey: ["all videos"],
      });

      window.location.reload(); // Reload the page to reflect changes
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <div
        className="m-2 flex h-32 w-full cursor-pointer items-center justify-center rounded-md bg-white p-4 shadow-md"
        onClick={() => setOpen(true)}
      >
        <Plus />
      </div> */}

      <Button variant={"destructive"} onClick={() => setOpen(true)}>
        Reject
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Reason</DialogTitle>
          <DialogDescription>
            Write your reason for rejection here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <textarea
              id="name"
              cols={8}
              value={reason}
              placeholder="Write your reason here"
              className="border-gray- 300 focus:border-blue-500 focus:ring-blue-500 col-span-3 h-32 resize-none rounded-md border bg-white p-2 text-sm text-gray-900 shadow-sm"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={item.isApproved || rejectPending}
            onClick={() => rejectMutate(item._id)}
          >
            Reject Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
