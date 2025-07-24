
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPie } from "lucide-react";

const PlanChart: React.FC = () => {
  return (
    <Card className="col-span-4 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <ChartPie className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle className="text-base">Plan Popularity</CardTitle>
            <CardDescription>Distribution of subscription plans</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex h-[300px] items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">No plan data available</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanChart;
