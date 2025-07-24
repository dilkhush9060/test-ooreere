import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {dashboardData} from "@/data/dashboardData";

const TopPlansTable: React.FC = () => {
  const {topPlans} = dashboardData;

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Top Subscription Plans</CardTitle>
        <CardDescription>
          Overview of most popular subscription plans
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topPlans.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPlans.map((plan, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {plan.name || `Plan ${index + 1}`}
                  </TableCell>
                  <TableCell>{plan.subscribers || 0}</TableCell>
                  <TableCell>${plan.revenue?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell className="text-right">
                    {plan.growth || "0%"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-muted-foreground">No plan data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopPlansTable;
