import type {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/Button";

import {ArrowUpDown, IndianRupee} from "lucide-react";
// import type {Profile} from "@/types/profile";
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
  //   {
  //     id: "select",
  //     header: ({table}) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({row}) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "account",
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
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar
            name={profile?.account?.name || "Unknown"}
            round={true}
            size="40"
            alt={profile?.account?.name || "Unknown"}
            // src={profile.picture ? `/images/${profile.picture}` : undefined}
          />
          <div>
            <div className="font-medium">{profile?.account?.name}</div>
            <div className="text-sm capitalize text-muted-foreground">
              {profile?.account.email}
            </div>
            <div className="text-sm capitalize text-muted-foreground">
              {profile?.city?.name || "Unknown City"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Plan",
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
            {" "}
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
