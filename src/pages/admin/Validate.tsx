import {RejectModal} from "@/components/modal/RejectModal";
import WatchVideo from "@/components/modal/WatchVideo";
import {Button} from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import {useHandler} from "@/store/handlebar";
import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export default function Validate() {
  const {onOpen} = useHandler((state) => state);

  // get all profile
  const {data, isLoading} = useQuery({
    queryKey: ["all videos"],
    queryFn: async () => {
      const res = await Api.get("/video/get");
      return res.data?.data;
    },
    retry: false,
  });

  // approve video
  const {mutate, isPending} = useMutation({
    mutationFn: async (videoId: string) => {
      const res = await Api.patch(`video/approve/${videoId}`, {});
      return res.data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(`Error approving video: ${error.message}`);
      }
    },
    onSuccess: () => {
      toast.success("Video approved successfully!");

      querryClient.invalidateQueries({
        queryKey: ["all videos"],
      });
    },
  });

  // reject video
  // const {mutate: rejectMutate, isPending: rejectPending} = useMutation({
  //   mutationFn: async (videoId: string) => {
  //     const res = await Api.patch(`video/reject/${videoId}`, {});
  //     return res.data;
  //   },
  // });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`h-screen ${onOpen ? "ml-64" : "ml-0"} my-8 transition-all duration-300 ease-in-out`}
    >
      <div className="overflow-hidden p-4">
        <div className="mt-4 flex flex-col rounded-xl border-2">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                      >
                        ID
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                      >
                        User Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                      >
                        Video
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data ? (
                      data?.videos?.map(
                        (
                          item: {
                            _id: string;
                            url: string;
                            city: string;
                            isApproved: boolean;
                            account: {
                              name: string;
                            };
                          },
                          index: number
                        ) => (
                          <tr className="border-b" key={item._id}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                              {item.city}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                              {item.account.name}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                              <WatchVideo url={item?.url} />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                              <div className="flex gap-2">
                                {item.isApproved ? (
                                  <Button
                                    variant={"destructive"}
                                    disabled={item.isApproved}
                                  >
                                    Reject
                                  </Button>
                                ) : (
                                  <RejectModal
                                    _id={item?._id}
                                    isApproved={item?.isApproved}
                                  />
                                )}
                                <Button
                                  disabled={item.isApproved || isPending}
                                  onClick={() => mutate(item._id)}
                                  variant={"default"}
                                  className="bg-[#53C897]"
                                >
                                  Approve
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <div className="flex items-center justify-center">
                        <h1>No Data</h1>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
