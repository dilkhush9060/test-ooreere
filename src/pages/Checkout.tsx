/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import {Minus, Plus} from "lucide-react";

import {PricingCard} from "@/components/cards/PricingCard";
import {Connector, Step} from "@/components/stepper";
import {Button} from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import {SubText} from "@/components/ui/Typography";

import {useHandleSubscription} from "@/hooks/mutation/Subscription";
import {GetAllCitys} from "@/hooks/querry/Citys";
import {GetAllPlans} from "@/hooks/querry/Plans";

import {IPlan} from "@/types/IPlan";
interface FormData {
  city: string;
}

interface FormErrors {
  city?: string;
}

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors] = useState<FormErrors>({});
  const [plandata, setPlanData] = useState<IPlan>();
  const {data: city} = GetAllCitys();
  const [month, setMonth] = useState(1);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState<FormData>({city: ""});

  const paymentOpened = useRef(false); // <-- to prevent multiple opens

  const {mutate, data, isSuccess, isError, error} = useHandleSubscription();

  const {data: PLANS, isLoading} = GetAllPlans();

  useEffect(() => {
    setFormData({city: city?.data?.[0]?.name});
  }, [city]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    if (isError) {
      toast.error((error as any)?.response?.data?.message);
    }

    if (isSuccess && data && !paymentOpened.current) {
      paymentOpened.current = true;

      const options = {
        key: data?.data?.data?.key,
        amount: data?.data?.data?.totalPrice,
        currency: "INR",
        name: "Oorooree",
        description: "Transaction for subscription",
        //! add your logo URL here
        image: "https://example.com/your_logo",
        order_id: data?.data?.data?.payment?.id,
        callback_url: `${import.meta.env.VITE_API_URL}/subscription/purchase/verify`,
        prefill: {
          name: data?.data?.data?.user?.name,
          email: data?.data?.data?.user?.email,
          contact: data?.data?.data?.user?.phone,
        },
        theme: {
          color: "#232424",
        },

        modal: {
          ondismiss: () => {
            paymentOpened.current = false;
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoader(true);
    }
  }, [isSuccess, data, error, isError]);

  useEffect(() => {
    setTimeout(
      () => {
        paymentOpened.current = false; // Reset after 10 minutes
        setLoader(false);
        // 10 minutes timeout to reset the paymentOpened state
      },
      15 * 60 * 1000
    );
  });
  if (loader) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const steps = [
    {label: "Choose Location"},
    {label: "Choose Plan"},
    {label: "Cart"},
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      mutate({
        plan: plandata?._id || "",
        city:
          city?.data.find((item: any) => item.name === formData.city)?._id ||
          "",
        months: month.toString(),
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !plandata) return true;
    return false;
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Checkout</h1>

      <div className="mb-20 h-max">
        <div className="mb-8">
          <div className="flex">
            {steps.map((step, index) => (
              <>
                <Step
                  key={index}
                  label={step.label}
                  isActive={currentStep === index}
                  isCompleted={currentStep > index}
                  stepNumber={index + 1}
                />
                {index < steps.length - 1 && (
                  <Connector isActive={currentStep > index} />
                )}
              </>
            ))}
          </div>
        </div>

        <div className="mb-8">
          {currentStep === 0 && (
            <div className="flex flex-col items-center justify-center gap-4">
              <SubText>Where do you want to display your ad?</SubText>

              <div className="flex gap-4">
                <select
                  name="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className={`w-full rounded-lg border px-4 py-3 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                >
                  {city?.data?.map((item: any, index: number) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <div className="flex w-52 items-center rounded-xl border-2 border-gray-200 px-4 py-2">
                  {city?.data?.map((item: any, index: number) => (
                    <span className="" key={index}>
                      {formData.city === item.name && `Slots: ${item.slots}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="my-10 mt-16 flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap xl:gap-8">
              {PLANS?.data?.map((item: IPlan) => (
                <PricingCard
                  key={item._id}
                  title={item?.name}
                  price={item?.price}
                  // description="Ideal for growing businesses and enterprises!"
                  features={item?.features}
                  highlightText="Best Value for Professionals"
                  buttonText={
                    plandata?._id === item._id ? "Selected" : "Select"
                  }
                  onClick={() => setPlanData(item)}
                />
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="my-20 grid grid-cols-1 gap-6 md:grid-cols-2">
              {plandata && (
                <PricingCard
                  title={plandata?.name}
                  price={plandata.price}
                  // description="Ideal for growing businesses and enterprises!"
                  features={plandata?.features}
                  highlightText="Best Value for Professionals"
                />
              )}

              <div className="my-auto grid max-h-[400px] grid-rows-5 gap-8 text-xl">
                <div className="grid grid-cols-3 gap-4">
                  <p>Plan Price</p>:<p>{Number(plandata?.price) * month}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <p>GST</p>:
                  <p>{plandata && parseInt(plandata?.price) * month * 0.18}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <p>Payment Charge</p>:
                  <p>
                    {(plandata &&
                      (parseInt(plandata?.price) * month * 0.02 * 1.18).toFixed(
                        2
                      )) ||
                      0}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <p>Order Total</p>:
                  <p>
                    {(
                      Number(plandata?.price) * month +
                      Number(plandata?.price) * month * 0.18 +
                      Number(plandata?.price) * month * 0.02 * 1.18
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <p>No. of months</p>:
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      onClick={() =>
                        month <= 1 ? 1 : setMonth((prev) => prev - 1)
                      }
                    >
                      <Minus />
                    </Button>
                    <span className="text-center">{month}</span>
                    <Button
                      onClick={() => {
                        const selectedCity = city?.data?.find(
                          (item: any) => item.name === formData.city
                        );
                        if (month < selectedCity?.slots) {
                          setMonth((prev) => prev + 1);
                        }
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="w-32"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className="w-32"
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
