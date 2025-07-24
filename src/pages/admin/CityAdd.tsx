/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from "react";
// import {UpdateCityMutation} from "@/hooks/mutation/UpdateCityMutation";
import {AddCity} from "@/components/modal/AddCity";
import Loader from "@/components/ui/Loader";
import {GetAllCitys} from "@/hooks/querry/Citys";
import {useHandler} from "@/store/handlebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Trash2, Edit} from "lucide-react";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/Button";
import {UpdateCityMutation} from "@/hooks/mutation/UpdateCityMutation";
import {DeleteCityMutation} from "@/hooks/mutation/DeleteCityMutation";

export default function CityAdd() {
  const {onOpen} = useHandler((state) => state);

  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState({
    _id: "",
    name: "",
    slots: "",
  });
  const [updateForm, setUpdateForm] = useState({
    name: "",
    slots: "",
  });

  const {data: cityData, isError, isLoading} = GetAllCitys();

  //api call update city
  const {mutate: updateCity} = UpdateCityMutation(selectedCity._id);

  const {mutate: deleteCity} = DeleteCityMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("city not found");
  }

  const handleUpdateClick = (city: any) => {
    setSelectedCity(city);
    setUpdateForm({
      name: city.name,
      slots: city.slots,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (e: any) => {
    e.preventDefault();
    updateCity(updateForm);
    setIsUpdateModalOpen(false);
  };

  const handleDelete = (cityId: string) => {
    // console.log("Delete city:", cityId);
    deleteCity(cityId);
  };

  return (
    <>
      <div
        className={`h-screen ${onOpen ? "ml-64" : "ml-0"} transition-all duration-300 ease-in-out my-16`}
      >
        <div className="flex flex-wrap p-4">
          {cityData?.data.map(
            (city: {_id: string; name: string; slots: string}) => (
              <div
                className="m-2 flex h-32 w-56 flex-col rounded-md bg-white p-4 shadow-md"
                key={city._id}
              >
                <div className="flex flex-grow flex-col items-center">
                  <p className="text-xl font-bold">{city.name}</p>
                  <p className="text-xl font-bold">Slot: {city.slots}</p>
                </div>
                <div className="mt-2 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateClick(city)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(city._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          )}

          <div className="w-52">
            <AddCity />
          </div>
        </div>
      </div>

      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update City</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City Name</label>
              <Input
                value={updateForm.name}
                onChange={(e) =>
                  setUpdateForm({...updateForm, name: e.target.value})
                }
                placeholder="Enter city name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slots</label>
              <Input
                value={updateForm.slots}
                onChange={(e) =>
                  setUpdateForm({
                    ...updateForm,
                    slots: e.target.value,
                  })
                }
                placeholder="Enter number of slots"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
