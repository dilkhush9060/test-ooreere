import {useEffect, useRef, useState} from "react";
import {Menu} from "../assets/icons";
import {Close} from "../assets/icons/Close";
import {Button} from "./ui/Button";
import {Link, useNavigate, useLocation} from "react-router";
import LoggedUser from "./ui/LoggedUser";
import {AuthStore} from "@/store/auth";
import {useOutsideClick} from "@/utils/outsideClick";
import {cn} from "@/utils/cn";
import {useSectionObserver} from "@/utils/useSectionObserver";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const location = useLocation();

  console.log(currentPath);
  const handleToggle = () => setIsOpen(!isOpen);

  const isLoogedIn = AuthStore((state) => state.auth.status);

  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the section based on the hash in the URL
    const hash = location.hash;
    if (hash) {
      const section = document.getElementById(hash.replace("#", ""));
      if (section) {
        section.scrollIntoView({behavior: "smooth"});
      }
      setIsHomeClicked(false); // Reset home clicked state when hash changes
      setIsInitialLoad(false);
    } else {
      // If no hash and it's initial load or navigating back to home, set home as active
      if (
        (isInitialLoad && currentPath === "/") ||
        (!hash && currentPath === "/")
      ) {
        setIsHomeClicked(true);
      }
      setIsInitialLoad(false);
    }
  }, [location, isInitialLoad, currentPath]);

  const handleScrollAndNavigate = (id: string) => {
    setIsHomeClicked(false); // Reset home clicked state when navigating to sections
    // Always navigate to home page with hash, regardless of current path
    navigate(`/#${id}`);
    setIsOpen(false);
  };

  // Add a handler for Home link to clear hash and scroll to top
  const handleHomeClick = () => {
    setIsHomeClicked(true); // Set home as clicked
    // Navigate to home page and clear any hash
    navigate("/", {replace: true});
    // Scroll to top of the page
    window.scrollTo({top: 0, behavior: "smooth"});
    setIsOpen(false);
  };

  const navLinks = [
    {
      label: "About",
      id: "about",
      onClick: () => handleScrollAndNavigate("about"),
    },
    {
      label: "Services",
      id: "services",
      onClick: () => handleScrollAndNavigate("services"),
    },
    {
      label: "Pricing",
      id: "pricing",
      onClick: () => handleScrollAndNavigate("pricing"),
    },
    {
      label: "Contact",
      id: "contact",
      onClick: () => handleScrollAndNavigate("contact"),
    },
  ];

  // Use the custom hook to get the active section ID
  const sectionIds = navLinks.map((link) => link.id);
  const activeSectionId = useSectionObserver(sectionIds, {threshold: 0.5});

  // Fixed: Better logic for determining if Home should be active
  const isHomeActive =
    currentPath === "/" &&
    (!activeSectionId || isHomeClicked) &&
    (!location.hash || isHomeClicked);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <div className="relative z-40 flex items-center gap-4">
        <button
          onClick={handleToggle}
          className="h-6 w-6 cursor-pointer lg:hidden"
        >
          {isOpen ? <Close /> : <Menu />}
        </button>
        <Link
          to={"/"}
          onClick={handleHomeClick}
          className="text-xl font-semibold leading-7"
        >
          OOR<span className="text-primary">OOR</span>EE
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-11">
          <button
            onClick={handleHomeClick}
            className={cn(
              `text-base font-medium leading-[1.125rem]`,
              isHomeActive ? "text-primary" : "text-black"
            )}
          >
            Home
          </button>

          {navLinks.map((link) => (
            <button
              onClick={link.onClick}
              key={link.id}
              className={cn(
                `text-base font-medium leading-[1.125rem]`,
                // Check if this section is currently active (either by hash or scroll position)
                (activeSectionId === link.id ||
                  location.hash === `#${link.id}`) &&
                  !isHomeClicked
                  ? "text-primary"
                  : "text-black"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {isLoogedIn ? (
        <LoggedUser />
      ) : (
        <div className="flex items-center gap-8">
          <Link
            to={"/signin"}
            className={`text-base font-medium leading-[1.125rem] ${currentPath === "/signin" ? "text-primary" : "text-black"}`}
          >
            Sign in
          </Link>
          <Link to={"/register"} className="hidden sm:block">
            <Button>Create free account</Button>
          </Link>
        </div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed bottom-0 left-0 top-0 z-30 w-[280px] bg-white px-12 pt-24 duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-[53px] text-start">
          <button
            onClick={handleHomeClick}
            className={cn(
              `w-max text-base font-medium leading-[1.125rem]`,
              isHomeActive ? "text-primary" : "text-black"
            )}
          >
            Home
          </button>
          {navLinks.map((link) => (
            <button
              onClick={link.onClick}
              key={link.id}
              className={cn(
                `w-max text-base font-medium leading-[1.125rem]`,
                // Check if this section is currently active (either by hash or scroll position)
                (activeSectionId === link.id ||
                  location.hash === `#${link.id}`) &&
                  !isHomeClicked
                  ? "text-primary"
                  : "text-black"
              )}
            >
              {link.label}
            </button>
          ))}

          {!isLoogedIn && (
            <>
              <Link
                to={"/signin"}
                className={`text-base font-medium leading-[1.125rem] ${currentPath === "/signin" ? "text-primary" : "text-black"}`}
              >
                Sign in
              </Link>
              <Link to={"/register"}>
                <Button>Create free account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-10 -translate-x-full bg-black/30 opacity-0 transition-opacity duration-500 ease-out lg:hidden",
          isOpen && "translate-x-0 opacity-100"
        )}
      />
    </nav>
  );
}
