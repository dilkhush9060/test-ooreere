import {PricingCard} from "@/components/cards/PricingCard";
import AddAndEditPrice from "@/components/modal/AddPlan";
import {Button} from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import {DeletePlan} from "@/hooks/mutation/DeletePlan";
import {GetAllPlans} from "@/hooks/querry/Plans";
import {useHandler} from "@/store/handlebar";
import {IPlan} from "@/types/IPlan";

export default function ChangePrice() {
  const {onOpen} = useHandler((state) => state);
  const {data, isLoading} = GetAllPlans();

  const {mutate, isPending} = DeletePlan();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleDeletePlan = (id: string) => {
    mutate(id);
  };

  return (
    <div
      className={`min-h-screen ${onOpen ? "ml-64" : "ml-0"} my-20 transition-all duration-300 ease-in-out`}
    >
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        {!data ? (
          <AddAndEditPrice />
        ) : (
          <>
            {data?.data?.map((items: IPlan, index: number) => (
              <div key={index} className="group relative flex-none">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-50 hidden items-center justify-center rounded-[16px] bg-black/20 p-4 text-white backdrop-blur-[2px] group-hover:flex">
                  <div className="flex flex-col gap-4">
                    <Button className="w-24 border-none">
                      <AddAndEditPrice id={items?._id} />
                    </Button>

                    <Button
                      variant={"destructive"}
                      disabled={isPending}
                      onClick={() => handleDeletePlan(items?._id)}
                    >
                      {isPending ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
                <div>
                  <PricingCard
                    title={items?.name}
                    price={items?.price}
                    // description="Ideal for growing businesses and enterprises!"
                    features={items?.features}
                    highlightText="Best Value for Professionals"
                    buttonText="Buy Now"
                  />
                </div>
              </div>
            ))}
            <AddAndEditPrice />
          </>
        )}
      </div>
    </div>
  );
}
