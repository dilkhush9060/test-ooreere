import {Button} from "@/components/ui/Button";
import {SendDeleteMutation} from "@/hooks/mutation/SenddeleteMutation";
import {Trash} from "lucide-react";
import {useNavigate} from "react-router";

export default function Deleteaccount() {
  const navigate = useNavigate();

  const {mutate, isPending} = SendDeleteMutation();

  return (
    <div className="mx-auto my-10 flex min-h-[100vh] max-w-2xl flex-col items-start justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Delete Account</h1>
        <p>
          All your plans will be deleted{" "}
          <span className="text-red-500">no refund</span> will be provided to
          you.
        </p>
        <p>
          After clicking on "Delete Account" button, an OTP will be sent to your
          email.
        </p>
      </div>

      <Button
        onClick={() => (navigate("/delete-otp"), mutate())}
        disabled={isPending}
        className="mb-2 mt-4 bg-primary text-gray-100"
      >
        <Trash /> Delete Account
      </Button>
    </div>
  );
}
