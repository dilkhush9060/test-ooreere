"use client";

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
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isLoggedIn = AuthStore((state) => state.auth.status);
  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, () => {
    setIsOpen(false);
  });

  // Handle body scroll lock when mobile menu is open
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

  // Handle initial scroll to section if hash is present
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        const section = document.getElementById(hash.replace("#", ""));
        if (section) {
          const navbarHeight = 80;
          const elementPosition = section.offsetTop - navbarHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location.hash]);

  const scrollToSection = (sectionId: string) => {
    // Only navigate with hash if we're on the home page
    if (currentPath === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
        // Update URL hash without triggering navigation
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    } else {
      // Navigate to home page with hash
      navigate(`/#${sectionId}`);
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    if (currentPath === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // Clear hash from URL
      window.history.replaceState(null, "", "/");
    } else {
      navigate("/");
    }
    setIsOpen(false);
  };

  const handleToggle = () => setIsOpen(!isOpen);

  const navLinks = [
    {
      label: "About",
      id: "about",
      onClick: () => scrollToSection("about"),
    },
    {
      label: "Services",
      id: "services",
      onClick: () => scrollToSection("services"),
    },
    {
      label: "Pricing",
      id: "pricing",
      onClick: () => scrollToSection("pricing"),
    },
    {
      label: "Contact",
      id: "contact",
      onClick: () => scrollToSection("contact"),
    },
  ];

  // Use the section observer only on the home page
  const sectionIds = navLinks.map((link) => link.id);
  const observedSectionId = useSectionObserver(sectionIds, {threshold: 0.5});
  const activeSectionId = currentPath === "/" ? observedSectionId : null;

  // Home is active when on home page and no section is active (at top of page)
  const isHomeActive = currentPath === "/" && !activeSectionId;

  // Helper function to determine if a nav link should be active
  const isNavLinkActive = (linkId: string) => {
    if (currentPath !== "/") return false;
    return activeSectionId === linkId || location.hash === `#${linkId}`;
  };

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
          to="/"
          onClick={scrollToTop}
          className="text-xl font-semibold leading-7"
        >
          OOR<span className="text-primary">OOR</span>EE
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-11">
          <button
            onClick={scrollToTop}
            className={cn(
              "text-base font-medium leading-[1.125rem]",
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
                "text-base font-medium leading-[1.125rem]",
                isNavLinkActive(link.id) ? "text-primary" : "text-black"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auth section */}
      {isLoggedIn ? (
        <LoggedUser />
      ) : (
        <div className="flex items-center gap-8">
          <Link
            to="/signin"
            className={cn(
              "text-base font-medium leading-[1.125rem]",
              currentPath === "/signin" ? "text-primary" : "text-black"
            )}
          >
            Sign in
          </Link>
          <Link to="/register" className="hidden sm:block">
            <Button>Create free account</Button>
          </Link>
        </div>
      )}

      {/* Mobile menu */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed bottom-0 left-0 top-0 z-30 w-[280px] bg-white px-12 pt-24 duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-[53px] text-start">
          <button
            onClick={scrollToTop}
            className={cn(
              "w-max text-base font-medium leading-[1.125rem]",
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
                "w-max text-base font-medium leading-[1.125rem]",
                isNavLinkActive(link.id) ? "text-primary" : "text-black"
              )}
            >
              {link.label}
            </button>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/signin"
                className={cn(
                  "text-base font-medium leading-[1.125rem]",
                  currentPath === "/signin" ? "text-primary" : "text-black"
                )}
              >
                Sign in
              </Link>
              <Link to="/register">
                <Button>Create free account</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-10 -translate-x-full bg-black/30 opacity-0 transition-opacity duration-500 ease-out lg:hidden",
          isOpen && "translate-x-0 opacity-100"
        )}
      />
    </nav>
  );
}
