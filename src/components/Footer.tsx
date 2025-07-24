import {Link} from "react-router";
import PhoneIcon from "../assets/icons/Phone";
import EmailIcon from "../assets/icons/Email";
import {LocationIcon} from "../assets/icons/Location";

export default function Footer() {
  const QUICK_LINKS = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/#about",
    },
    {
      label: "Services",
      href: "/#services",
    },
    {
      label: "Pricing",
      href: "/#pricing",
    },
    {
      label: "Contact",
      href: "/#contact",
    },
  ];

  const LEGAL_LINKS = [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Services",
      href: "/terms-and-conditions",
    },
    {
      label: "Terms of Use",
      href: "/terms-of-use",
    },
    {
      label: "Refund Policy",
      href: "/refund-policy",
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-screen-xl px-6 py-8 md:px-8">
        <div className="pb-[54px] pt-[89px] text-center text-[2.5rem] font-semibold leading-[1.625rem]">
          OOR<span className="text-primary">OOR</span>EE
        </div>
        <div className="h-[1px] w-full bg-white" />

        <div className="flex flex-col flex-wrap items-center justify-between pt-8 md:flex-row md:items-start">
          {/* Left */}
          <div className="flex max-w-[330px] flex-col gap-6">
            <div className="text-center text-lg font-semibold leading-[1.625rem] md:text-start">
              Reach us
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-6">
              <div>
                <PhoneIcon />
              </div>
              <div className="flex flex-col gap-1">
                <Link to="">(+91) 91095 97215</Link>
                <Link to="">(+91) 70249 37315</Link>
                <Link to="">(+91) 91113 90007</Link>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-6">
              <div>
                <EmailIcon />
              </div>
              <div className="text-center md:text-start">
                <Link to="mailto:digitaloorooree@gmail.com">
                  digitaloorooree@gmail.com
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-6">
              <div>
                <LocationIcon />
              </div>
              <div className="text-center md:text-start">
                ITM Incubation center, Sithouli Village, Gwalior, Madhya Pradesh
                India.
              </div>
            </div>
          </div>

          <div className="my-10 h-[1px] w-full bg-[#282828] md:hidden" />

          {/* Center */}
          <div className="flex w-max flex-col gap-6">
            <div className="text-center text-lg font-semibold leading-[1.625rem] md:text-start">
              Quick Links
            </div>
            <div className="flex flex-col items-center gap-4 md:items-start">
              {QUICK_LINKS.map((link) => (
                <Link key={link.label} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="my-10 h-[1px] w-full bg-[#282828] md:hidden" />

          {/* Right */}
          <div className="flex w-[200px] flex-col gap-6">
            <div className="text-center text-lg font-semibold leading-[1.625rem] md:text-start">
              Legal Links
            </div>
            <div className="flex flex-col items-center gap-4 md:items-start">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.label} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
