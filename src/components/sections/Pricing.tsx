import {GetAllPlans} from "@/hooks/querry/Plans";
import {BlurFade} from "../animation/BlurFade";
import {PricingCard} from "../cards/PricingCard";
import {H2, P1} from "../ui/Typography";
import {IPlan} from "@/types/IPlan";

export default function Pricing() {
  const {data} = GetAllPlans();

  // if(isError){

  // }
  // console.log(data);
  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10"
    >
      <div className="mt-16 px-8">
        <BlurFade inView>
          <H2 className="mx-auto max-w-[570px] text-center">
            Choose the Plan That’s{" "}
            <span className="text-primary">Perfect For You</span>
          </H2>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <P1 className="mx-auto mt-3 max-w-xl text-center">
            At OOROOREE, we cater to all businesses, big and small. Our
            customized advertising solutions ensure that every client receives
            targeted visibility and engagement tailored to their unique needs.
          </P1>
        </BlurFade>
        <BlurFade
          inView
          delay={0.3}
          className="mt-20 flex flex-wrap justify-center gap-4 lg:flex-nowrap xl:gap-8"
        >
          {data?.data?.map((items: IPlan) => (
            <PricingCard
              title={items?.name}
              price={`${items?.price}`}
              // description="Ideal for growing businesses and enterprises!"
              features={items?.features}
              highlightText="Best Value for Professionals"
              buttonText="Buy Now"
            />
          ))}
        </BlurFade>
      </div>
    </section>
  );
}
