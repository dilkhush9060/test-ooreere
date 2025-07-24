import BuyPlanCard from "@/components/cards/BuyPlanCard";
import Loader from "@/components/ui/Loader";
import {GetMypurchase} from "@/hooks/querry/Mypurchase";
import {IPurchase} from "@/types/IPlan";
import {Plus} from "lucide-react";
import {useNavigate} from "react-router";

export default function Mypurchase() {
  const {data: purchase, isError, isLoading} = GetMypurchase();

  // console.log("Purchase Data:", purchase);

  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="flex cursor-pointer flex-col items-center justify-center pt-2"
          onClick={() => navigate("/checkout")}
        >
          <div
            className={
              "flex w-full items-center justify-center rounded-t-xl bg-[#7D7D7D] py-6"
            }
          >
            <div className="text-xl font-bold text-white">
              Add New Subscription
            </div>
          </div>
          <div
            className={
              "flex h-[10rem] w-72 items-center justify-center rounded-b-xl border border-[#E5E5E5] bg-white p-4"
            }
          >
            <Plus className="text-[#7D7D7D]" size={72} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-20rem)] px-5 py-20">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2">
        {purchase?.map((item: IPurchase) => (
          <div
            key={item?._id}
            onClick={() => navigate(`/myplan/${item._id}`)}
            className="h-max w-max"
          >
            <BuyPlanCard
              Plan={item?.plan?.name}
              planColor="bg-[#FFA734]"
              city={item.city?.name}
              start={item.updatedAt}
              end={item.expireAt}
            />
          </div>
        ))}

        <div
          className="flex cursor-pointer flex-col items-center justify-center pt-2"
          onClick={() => navigate("/checkout")}
        >
          <div
            className={
              "flex w-full items-center justify-center rounded-t-xl bg-[#7D7D7D] py-6"
            }
          >
            <div className="text-xl font-bold text-white">
              Add New Subscription
            </div>
          </div>
          <div
            className={
              "flex h-[10rem] w-72 items-center justify-center rounded-b-xl border border-[#E5E5E5] bg-white p-4"
            }
          >
            <Plus className="text-[#7D7D7D]" size={72} />
          </div>
        </div>
      </div>
    </div>
  );
}
