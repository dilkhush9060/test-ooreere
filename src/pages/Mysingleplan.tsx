import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import {GetSingleplan} from "@/hooks/querry/Mysinglepurchase";
import {CircleCheckBig} from "lucide-react";
import toast from "react-hot-toast";
import {useParams} from "react-router";
import dateFormat from "dateformat";
import {useDropzone} from "react-dropzone";

import {UploadVideoMution} from "@/hooks/mutation/UploadVideoMutation";
import {GetMyvideos} from "@/hooks/querry/Myvideo";

import CustomVideoPlayer from "@/components/VideoPlayer";

import {DeleteVideoMutation} from "@/hooks/mutation/DeleteVideo";
import {RenewSubs} from "@/hooks/mutation/RenewSubs";
import {AxiosError} from "axios";

export default function Myplan() {
  const {id} = useParams<{id: string}>();
  const planId = id || "";
  const [files, setFiles] = useState<Array<File & {preview: string}>>([]);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const MAX_VIDEO_LENGTH = 15; // seconds

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/ogg": [".ogg"],
      "video/avi": [".avi"],
      "video/mov": [".mov"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
      "video/3gpp": [".3gp"],
      "video/x-ms-wmv": [".wmv"],
      "video/x-flv": [".flv"],
      "video/mkv": [".mkv"],
      "video/x-matroska": [".mkv"],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
    noClick: false, // Allow clicking
    noKeyboard: false, // Allow keyboard
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
      // Only show errors if files were actually dropped/selected
      if (fileRejections.length > 0) {
        fileRejections.forEach(({errors}) => {
          if (errors[0]?.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
            );
          } else if (errors[0]?.code === "file-invalid-type") {
            toast.error("Only video files are allowed");
          } else if (errors[0]?.code === "too-many-files") {
            toast.error("Only one file is allowed");
          } else {
            toast.error("Error uploading file");
          }
        });
      }
    },
  });

  useEffect(() => {
    return () => {
      // Cleanup previews on unmount
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const {mutate, isPending} = UploadVideoMution(planId);
  const uploadFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formdata = new FormData();

      formdata.append("video", files[0]);
      formdata.append("subscription", planId);

      mutate(formdata);
    } catch (error) {
      // console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.message || "An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const {data: myvideos, isLoading: isVideoLoading} = GetMyvideos(planId);

  const {mutate: deleteVideo, isPending: deletePending} =
    DeleteVideoMutation(planId);

  const {data: purchase, isError, error, isLoading} = GetSingleplan(planId);

  const {mutate: Renew, isSuccess, data, isError: RenewError} = RenewSubs();
  // console.log(purchase);

  if (RenewError) {
    if (error instanceof AxiosError) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    }
  }
  if (isSuccess) {
    if (data) {
      const options = {
        key: data?.data?.key,
        amount: data?.data?.totalPrice,
        currency: "INR",
        name: "Oorooree",
        description: "Transaction for subscription",
        image: "https://example.com/your_logo",
        order_id: data?.data?.payment?.id,
        callback_url: `${import.meta.env.VITE_API_URL}/subscription/renew/verify`,
        prefill: {
          name: data?.data?.user?.name,
          email: data?.data?.user?.email,
          contact: data?.data?.user?.phone,
        },
        theme: {
          color: "#232424",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  }

  const currentDate = new Date().toISOString().slice(0, 10);

  const expairDate = purchase?.[0]?.expireAt
    ? new Date(purchase[0].expireAt).toISOString().slice(0, 10)
    : null;

  // get 7 day before the expair date
  const expairDate7DaysBefore = expairDate
    ? new Date(new Date(expairDate).getTime() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : null;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("Something went wrong");
    return;
  }

  return (
    <>
      <div className="object-fit my-2 mb-8 grid h-96 grid-cols-1 gap-4 bg-[url('/mobile-blue.svg')] bg-cover bg-center shadow-lg md:mx-4 md:h-48 md:grid-cols-3 md:bg-[url('/public/Basic-Plan-card.png')]">
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl text-gray-200 md:items-start">
          <h1 className="text-4xl font-bold">{purchase?.[0]?.plan?.name}</h1>
          {/* <Button className="bg-white text-black">Download Invoice</Button> */}
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-2 rounded-xl p-4">
          {purchase?.[0]?.plan?.features?.map((item: string) => (
            <div className="flex items-center gap-2" key={item}>
              <CircleCheckBig className="text-gray-200" />
              <p className="text-gray-200">{item}</p>
            </div>
          ))}
        </div>
        <div className="m-auto mx-4 my-4 flex max-h-48 flex-col items-center justify-center gap-2 rounded-xl bg-white shadow-lg">
          <p>City: {purchase?.[0]?.city?.name}</p>
          <p>
            Started:{" "}
            {purchase?.[0]?.updatedAt
              ? dateFormat(purchase[0].updatedAt, "mmmm dS, yyyy")
              : "N/A"}
          </p>

          {expairDate7DaysBefore && expairDate7DaysBefore <= currentDate && (
            <p className="text-red-500">
              Expired on :{" "}
              {purchase?.[0]?.expireAt
                ? dateFormat(purchase[0].expireAt, "mmmm dS, yyyy")
                : "N/A"}
            </p>
          )}

          {!purchase?.[0]?.isExpired ? (
            <p className="text-green-500">Status: Active</p>
          ) : (
            <Button
              className="bg-red-500 text-white"
              onClick={() => purchase?.[0]?._id && Renew(purchase[0]._id)}
            >
              Renew Subscription
            </Button>
          )}
        </div>
      </div>
      <div className="mx-auto min-h-[calc(100vh-40rem)] max-w-4xl px-4 md:px-8">
        {isVideoLoading ? (
          <Loader />
        ) : myvideos ? (
          <div className="my-4 flex flex-col items-center justify-center gap-4">
            <CustomVideoPlayer url={myvideos?.video?.url} fileName={"subs"} />

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
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-300 p-4 shadow-lg md:flex-row md:gap-12">
                  <img src="/upload.svg" alt="Upload icon" />
                  <div>
                    <p className="text-xl font-semibold text-black">
                      Drag and drop files here
                    </p>
                    <p className="text-gray-400">Video quality: HD</p>
                    <p className="text-gray-400">Video format: All</p>
                    <p className="text-gray-400">Less than 50MB per file</p>
                    <p className="text-gray-400">Max video length: 15sec</p>
                  </div>
                  <Button
                    className="rounded-md bg-[#3B82F6] px-4 text-white"
                    type="button"
                  >
                    Browse
                  </Button>
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

                  <div className="w-full text-center text-sm text-gray-500">
                    {isPending ? (
                      <>
                        <Button
                          type="submit"
                          className="mx-auto rounded-md"
                          variant="outline"
                        >
                          <Loader />
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="submit"
                        className="mx-auto rounded-md bg-[#3B82F6] text-white"
                        disabled={isPending || files.length === 0}
                      >
                        Upload Video
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
