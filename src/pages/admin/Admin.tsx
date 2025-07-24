import {useHandler} from "@/store/handlebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {Button} from "@/components/ui/Button";
import {User} from "lucide-react";
import {DataTable} from "@/components/tables/data-table";
import {columns} from "@/components/tables/columns";
// import { profilesData } from "./data/profiles-data"

import {useQuery} from "@tanstack/react-query";
import {Api} from "@/utils/axios";
import Loader from "@/components/ui/Loader";

export default function Admin() {
  const {onOpen} = useHandler((state) => state);

  // get all profile
  const {data, isLoading} = useQuery({
    queryKey: ["all profiles"],
    queryFn: async () => {
      const res = await Api.get("/profile/all");
      return res.data?.data;
    },

    retry: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={`h-screen ${onOpen ? "ml-64" : "ml-0"} my-8 transition-all duration-300 ease-in-out`}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profiles
            </CardTitle>
            <CardDescription>
              Manage and view all user profiles in your system with advanced
              filtering and sorting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data?.profiles} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
