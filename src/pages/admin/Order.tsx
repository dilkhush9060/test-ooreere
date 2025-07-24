import {DataTable} from "@/components/tables/data-table";
import {OrderColumns} from "@/components/tables/orderColumn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/Loader";
import {useHandler} from "@/store/handlebar";
import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";
import {ScrollText} from "lucide-react";

const Order = () => {
  const {onOpen} = useHandler((state) => state);
  const {data, isLoading} = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await Api.get("/order/all");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  console.log("Orders data:", data?.orders);

  return (
    <div
      className={`h-screen ${onOpen ? "ml-64" : "ml-0"} my-8 transition-all duration-300 ease-in-out`}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5" />
            Orders
          </CardTitle>
          <CardDescription>
            Manage and view all orders in your system with advanced filtering
            and sorting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={OrderColumns}
            data={data?.orders || []}
            searchColumn="customerName"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Order;
