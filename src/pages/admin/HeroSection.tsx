import {Button} from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import CustomVideoPlayer from "@/components/VideoPlayer";
import {DeleteHomeVideoMutation} from "@/hooks/mutation/DeleteHomeVideoMutation";
import {HomeVideoMutation} from "@/hooks/mutation/HomeVideoMutation";
import {GetHomeVideo} from "@/hooks/querry/HomeVideoQuery";
import {useHandler} from "@/store/handlebar";
import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import toast from "react-hot-toast";

export default function HeroSection() {
  const {onOpen} = useHandler((state) => state);
  const [files, setFiles] = useState<Array<File & {preview: string}>>([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_VIDEO_LENGTH = 16; // seconds

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // Clear previous files
      files.forEach((file) => URL.revokeObjectURL(file.preview));

      // Validate and process new files
      acceptedFiles.forEach((file) => {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          if (video.duration > MAX_VIDEO_LENGTH) {
            toast.error(
              `Video must be shorter than ${MAX_VIDEO_LENGTH} seconds`
            );
            return;
          }

          setFiles([
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        };

        video.src = URL.createObjectURL(file);
      });
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({errors}) => {
        if (errors[0]?.code === "file-too-large") {
          toast.error(
            `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
          );
        } else if (errors[0]?.code === "file-invalid-type") {
          toast.error("Only MP4 videos are allowed");
        } else {
          toast.error("Error uploading file");
        }
      });
    },
  });

  const {mutate} = HomeVideoMutation();
  const uploadFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate({video: files[0]});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup previews on unmount
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  const {mutate: deleteVideo, isPending: deletePending} =
    DeleteHomeVideoMutation();

  const {data: myvideos, isLoading} = GetHomeVideo();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section
        id="home"
        className={`min-h-screen px-6 py-5 ${onOpen ? "ml-64" : "ml-0"} my-8 transition-all duration-300 ease-in-out`}
      >
        {myvideos?.url ? (
          <div className="my-4 flex flex-col items-center justify-center gap-4">
            <CustomVideoPlayer url={myvideos?.url} fileName={"subs"} />

            <Button
              className="items-center"
              variant={"destructive"}
              onClick={() => deleteVideo(myvideos?.video?._id)}
              disabled={deletePending}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            {files.length === 0 && (
              <img
                src="/vid-not-found.svg"
                alt="No video uploaded"
                className="object-fit"
              />
            )}
            <form
              onSubmit={uploadFiles}
              className="container mx-auto my-4 max-w-[32rem]"
            >
              <div className="cursor-pointer" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex items-center justify-center gap-12 rounded-xl border-2 border-dashed border-gray-300 p-4 shadow-lg">
                  <img src="/upload.svg" alt="Upload icon" />
                  <div>
                    <p className="text-xl font-semibold text-black">
                      Drag and drop files here
                    </p>
                    <p className="text-gray-400">Video quality: HD</p>
                    <p className="text-gray-400">Video format: MP4</p>
                    <p className="text-gray-400">Less than 5MB per file</p>
                    <p className="text-gray-400">Max video length: 15sec</p>
                  </div>
                  <div className="rounded-md bg-[#3B82F6] px-4 py-2 text-white">
                    Browse
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-4">
                  {files.map((file) => (
                    <div key={file.name} className="rounded-lg bg-gray-50 p-4">
                      <video
                        src={file.preview}
                        className="mx-auto max-h-[200px]"
                        controls
                      />
                      <p className="mt-2 text-center text-sm text-gray-600">
                        {file.name}
                      </p>
                    </div>
                  ))}
                  <Button
                    type="submit"
                    className="mt-4 w-full bg-[#3B82F6] text-white"
                  >
                    Upload Video
                  </Button>
                </div>
              )}
            </form>
          </div>
        )}
      </section>
    </>
  );
}
