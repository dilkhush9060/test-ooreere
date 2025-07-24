import {useHandler} from "@/store/handlebar";
import {
  ChartLine,
  CheckCheck,
  CopyPlus,
  IndianRupee,
  MessageSquareText,
  RefreshCcw,
  ScrollText,
  UserRound,
  X,
} from "lucide-react";
import {Link, useLocation} from "react-router";

export default function SideBar() {
  const {onOpen, close} = useHandler((state) => state);
  const location = useLocation();

  // useEffect(() => {
  //   if (onOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [onOpen]);

  const SidebarLink = [
    {
      label: "Users",
      path: "/admin",
      icons: <UserRound size={20} />,
    },
    {
      label: "Validate data",
      path: "/validate",
      icons: <CheckCheck size={20} />,
    },
    {
      label: "Subscription Analysis",
      path: "/Subscription",
      icons: <ChartLine size={20} />,
    },
    {
      label: "Order",
      path: "/order",
      icons: <ScrollText size={20} />,
    },
    {
      label: "City Add-ons",
      path: "/city-addons",
      icons: <CopyPlus size={20} />,
    },

    {
      label: "Add Plans",
      path: "/change-price",
      icons: <IndianRupee size={20} />,
    },
    {
      label: "Hero's Section",
      path: "/hero-section",
      icons: <RefreshCcw size={20} />,
    },
    {
      label: "Messages",
      path: "/messages",
      icons: <MessageSquareText size={20} />,
    },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 top-[52px] h-full overflow-y-auto">
        {onOpen && (
          <div className="flex h-full w-64 gap-4 border-2 px-2 py-2">
            <X onClick={close} className="absolute right-4 cursor-pointer" />
            <ul className="my-8 flex flex-col gap-4">
              {SidebarLink?.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex select-text items-center justify-start gap-2 rounded-md px-2 py-4 font-semibold transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {link.icons} {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
