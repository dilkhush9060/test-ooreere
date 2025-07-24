"use client";

import type {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/Button";

// import {Checkbox} from "@/components/ui/checkbox";

import {ArrowUpDown, CheckCircle, XCircle, Building2} from "lucide-react";
import type {Profile} from "@/types/profile";
import Avatar from "react-avatar";
import TableDropdown from "./tableDropdown";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const columns: ColumnDef<Profile>[] = [
  // {
  //   id: "select",
  //   header: ({table}) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({row}) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar
            name={profile.name}
            round={true}
            size="40"
            alt={profile.name}
            src={profile.picture ? `/images/${profile.picture}` : undefined}
          />
          <div>
            <div className="font-medium">{profile.name}</div>
            <div className="text-sm capitalize text-muted-foreground">
              {profile.role}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div>
          <div className="text-sm">{profile.email}</div>
          <div className="text-sm text-muted-foreground">{profile.phone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      return <div className="capitalize">{row.getValue("city")}</div>;
    },
  },
  {
    accessorKey: "isVerified",
    header: "Status",
    cell: ({row}) => {
      const profile = row.original;
      return (
        <div className="flex flex-col gap-1">
          <Badge
            variant={profile.isVerified ? "secondary" : "outline"}
            className="w-fit cursor-pointer hover:bg-gray-100"
          >
            {profile.isVerified ? (
              <CheckCircle className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {profile.isVerified ? "Verified" : "Unverified"}
          </Badge>
          {profile.isSuspended && (
            <Badge variant="destructive" className="w-fit">
              Suspended
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "companyname",
    header: "Company",
    cell: ({row}) => {
      const profile = row.original;
      if (!profile.companyname) {
        return <span className="text-sm text-muted-foreground">-</span>;
      }
      return (
        <div>
          <div className="flex items-center gap-1 text-sm">
            <Building2 className="h-3 w-3" />
            {profile.companyname}
          </div>
          {profile.gstnumber && (
            <div className="text-xs text-muted-foreground">
              GST: {profile.gstnumber}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      return (
        <div className="text-sm">{formatDate(row.getValue("createdAt"))}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const data = row.original;

      return <TableDropdown profile={data} />;
    },
  },
];
