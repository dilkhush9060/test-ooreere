import {Button} from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {AddCityMutation} from "@/hooks/mutation/AddCityMutation";
import {querryClient} from "@/utils/querryClient";

import {Plus} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";

export function AddCity() {
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);

  const {mutate, isPending} = AddCityMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);
      querryClient.invalidateQueries({
        queryKey: ["citys"],
      });
      setOpen(false);
    },
  });

  const handleCityAdd = () => {
    mutate({name: city});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className="m-2 flex h-32 w-full cursor-pointer items-center justify-center rounded-md bg-white p-4 shadow-md"
        onClick={() => setOpen(true)}
      >
        <Plus />
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add city</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={city}
              className="col-span-3"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCityAdd} disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
