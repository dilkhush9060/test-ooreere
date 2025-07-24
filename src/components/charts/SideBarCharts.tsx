import {Bar, BarChart, XAxis, YAxis} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {Citys: "Jaipur", Sells: 275, fill: "var(--color-Jaipur)"},
  {Citys: "Delhi", Sells: 200, fill: "var(--color-Delhi)"},
  {Citys: "Mumbai", Sells: 200, fill: "var(--color-Mumbai)"},
  {Citys: "Bangalore", Sells: 173, fill: "var(--color-Bangalore)"},
  {Citys: "Chennai", Sells: 0, fill: "var(--color-Chennai)"},
];

const chartConfig = {
  Sells: {
    label: "Sells",
  },
  Jaipur: {
    label: "Jaipur",
    color: "hsl(var(--chart-1))",
  },
  Delhi: {
    label: "Delhi",
    color: "hsl(var(--chart-2))",
  },
  Mumbai: {
    label: "Mumbai",
    color: "hsl(var(--chart-3))",
  },
  Bangalore: {
    label: "Bangalore",
    color: "hsl(var(--chart-4))",
  },
  Chennai: {
    label: "Chennai",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
export default function SideBarCharts() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Slot Sell</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 10,
              }}
            >
              <YAxis
                dataKey="Citys"
                type="category"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <XAxis dataKey="Sells" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="Sells" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
        </CardFooter>
      </Card>
    </div>
  );
}
