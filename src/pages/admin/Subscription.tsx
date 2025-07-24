import DashboardOverview from "@/components/charts/DashboardOverview";
import Header from "@/components/charts/Header";
import RevenueChart from "@/components/charts/RenewChart";
import SubscriptionChart from "@/components/charts/SubscriptionChart";
import Loader from "@/components/ui/Loader";

import {GetAnalytics, GetChartAnalytics} from "@/hooks/querry/Analytics";
import {useHandler} from "@/store/handlebar";

export default function Subscription() {
  const {onOpen} = useHandler((state) => state);

  const {data, isLoading} = GetChartAnalytics();

  const {data: analyticsData, isLoading: isLoadingAnalytics} = GetAnalytics();

  if (isLoading && isLoadingAnalytics) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-4 pt-8 ${onOpen ? "ml-64" : "ml-0"} transition-all duration-300 ease-in-out`}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="container mx-auto">
            <div className="my-8 flex flex-col space-y-8">
              <Header />
              <DashboardOverview data={analyticsData} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <RevenueChart data={data?.revenueChart} />
                <SubscriptionChart data={data?.subscriptionTrend} />
                {/* <PlanChart /> */}
              </div>
              {/* <TopPlansTable /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
