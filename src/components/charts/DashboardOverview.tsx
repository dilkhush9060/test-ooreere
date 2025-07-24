import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Users, TrendingDown, IndianRupee} from "lucide-react";
// import { dashboardData } from "@/data/dashboardData";

export interface DashboardOverviewProps {
  revenue: {
    total: number;
    monthly: number;
    yearly: number;
  };
  subscriptions: {
    total: number;
    active: number;
    expired: number;
    renewed: number;
  };
  topPlans: Array<{
    name?: string;
    subscribers?: number;
    revenue?: number;
    growth?: string;
  }>;
}

const DashboardOverview = ({data}: {data: DashboardOverviewProps}) => {
  // const { revenue, subscriptions } = dashboardData;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            &#x20b9; {data?.revenue.total.toFixed(2)}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">
              Monthly: &#x20b9; {data?.revenue.monthly.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              Yearly: &#x20b9; {data?.revenue.yearly.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Subscriptions
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.subscriptions.total}</div>
          <div className="flex flex-col space-y-1">
            <p className="flex items-center text-xs text-muted-foreground">
              <span className="inline-block w-16">Active:</span>{" "}
              {data?.subscriptions.active}
            </p>
            <p className="flex items-center text-xs text-muted-foreground">
              <span className="inline-block w-16">Expired:</span>{" "}
              {data?.subscriptions.expired}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData.topPlans.length}</div>
          <p className="text-xs text-muted-foreground">
            {dashboardData.topPlans.length > 0 ? `${dashboardData.topPlans.length} plans available` : 'No active plans'}
          </p>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renewal Rate</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.subscriptions.total > 0
              ? `${((data?.subscriptions.renewed / data?.subscriptions.total) * 100).toFixed(1)}%`
              : "0%"}
          </div>
          <p className="text-xs text-muted-foreground">
            {data?.subscriptions.renewed} renewals out of{" "}
            {data?.subscriptions.total}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
