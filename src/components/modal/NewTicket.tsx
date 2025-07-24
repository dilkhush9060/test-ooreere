import {Button} from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {CreateTicket} from "@/hooks/mutation/Support";

import {useState} from "react";
import {Input} from "../ui/input";
import {AxiosError} from "axios";
import {querryClient} from "@/utils/querryClient";

export function NewTicket() {
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const {mutate, isPending} = CreateTicket({
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("Error creating ticket:", error.message);
      }
    },

    onSuccess: (data: {message: string}) => {
      console.log("Ticket created successfully:", data.message);
      setOpen(false);
      setReason("");

      querryClient.invalidateQueries({
        queryKey: ["my tickets"],
      });
    },
  });

  const handleNewTicketClick = ({topic}: {topic: string}) => {
    mutate({topic});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant={"destructive"} onClick={() => setOpen(true)}>
        New Ticket
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new ticket</DialogTitle>
          <DialogDescription>
            <p className="text-sm text-gray-500">
              This will create a new ticket for you to discuss.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="topic"
              value={reason}
              placeholder="Write your reason here"
              onChange={(e) => setReason(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => handleNewTicketClick({topic: reason})}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
