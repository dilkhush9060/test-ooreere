import {Button} from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Upload, UserRoundPen} from "lucide-react";

import {useState} from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/ImageUpload";
import {Paperclip} from "lucide-react";
import {ProfileImageUpdate} from "@/hooks/mutation/UpdateProfile";
import toast from "react-hot-toast";
import {AuthStore} from "@/store/auth";
import {querryClient} from "@/utils/querryClient";
import {AxiosError} from "axios";

export default function ProfileImage() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [open, setOpen] = useState(false);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const updateUserPicture = AuthStore((state) => state.updateUserPicture);
  const {mutate, isPending} = ProfileImageUpdate({
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An unexpected error");
      } else {
        toast.error("An unexpected error");
      }
    },

    onSuccess: (data: {
      message: string;
      data?: {
        picture?: string;
      };
      picture?: string;
      user?: {
        picture?: string;
      };
    }) => {
      toast.success(data?.message);

      const pictureUrl =
        data?.data?.picture || data?.picture || data?.user?.picture;

      if (pictureUrl) {
        updateUserPicture(pictureUrl);
      } else {
        console.warn("No picture URL found in response");
      }
      setOpen(false);

      querryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  const uploadFile = () => {
    if (files && files.length > 0) {
      mutate({image: files[0]});
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UserRoundPen size={40} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile Image here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FileUploader
            value={files}
            onValueChange={setFiles}
            dropzoneOptions={dropZoneConfig}
            className="relative rounded-lg bg-background bg-gray-200 p-2"
          >
            <FileInput className="py-8 outline-dashed outline-1 outline-white">
              <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
                <Upload className="h-8 w-8 stroke-current text-gray-600" />
              </div>
            </FileInput>
            <FileUploaderContent>
              {files &&
                files.length > 0 &&
                files.map((file, i) => (
                  <FileUploaderItem key={i} index={i}>
                    <Paperclip className="h-4 w-4 stroke-current" />
                    <span>{file.name}</span>
                  </FileUploaderItem>
                ))}
            </FileUploaderContent>
          </FileUploader>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={uploadFile} disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
