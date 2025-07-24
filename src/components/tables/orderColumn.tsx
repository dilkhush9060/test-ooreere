import type {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/Button";

import {ArrowUpDown, IndianRupee} from "lucide-react";
import type {Order} from "@/types/order";
import Avatar from "react-avatar";
import DownloadInvoice from "../downloadInvoice";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const OrderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "customerName", // Simple string-based accessor
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // Extract customer name for filtering
    accessorFn: (row) => {
      const name = row?.account?.name || "Unknown";
      console.log("Accessor function called for:", name); // Debug log
      return name;
    },
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar
            name={profile?.account?.name || "Unknown"}
            round={true}
            size="40"
            alt={profile?.account?.name || "Unknown"}
          />
          <div>
            <div className="font-medium">{profile?.account?.name}</div>
            <div className="text-sm text-muted-foreground">
              {profile?.account?.email}
            </div>
            <div className="text-sm text-muted-foreground">
              {profile?.city?.name || "Unknown City"}
            </div>
          </div>
        </div>
      );
    },
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "planName",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plan & Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => row?.plan?.name || "No Plan",
    cell: ({row}) => {
      const plans = row.original;
      return (
        <div className="flex flex-col pl-4">
          <div className="text-sm">{plans?.plan?.name || "No Plan"}</div>
          <div className="text-sm text-muted-foreground">
            {plans?.months} Month(s)
          </div>
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "totalPaidAmount",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amounts
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex flex-col pl-4">
          <div className="flex items-center text-sm font-bold">
            <IndianRupee size={15} /> {profile?.totalPaidAmount}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isSuccessPayment",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      );
    },
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex flex-col pl-3">
          <div className="flex items-center text-sm font-bold">
            {profile?.isSuccessPayment ? (
              <Badge variant="secondary">Successful</Badge>
            ) : (
              <Badge variant="destructive">Failed</Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "razorpay_order_id",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex flex-col">
          <div className="text-sm">{profile?.razorpay_order_id}</div>
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdAt",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex flex-col pl-4">
          <div className="text-sm">
            {formatDate(profile?.createdAt || new Date().toString())}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          <DownloadInvoice order={data} />
        </div>
      );
    },
  },
];
