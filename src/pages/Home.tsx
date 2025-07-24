import {Link} from "react-router";
import {ArrowIcon} from "../assets/icons";
import RingIcon from "../assets/icons/Ring";
import TrafficLightSystem from "../components/TrafficLightSystem";
import {H2, P1} from "../components/ui/Typography";
import FadeIn from "@/components/animation/FadeIn";
import ContactForm from "@/components/ContactForm";
import About from "@/components/sections/About";
import Mission from "@/components/sections/Mission";
import Vision from "@/components/sections/Vision";
import Founders from "@/components/sections/Founders";
import Pricing from "@/components/sections/Pricing";
import Services from "@/components/sections/Services";
import {BlurFade} from "@/components/animation/BlurFade";

export default function Home() {
  const handleScrollAndNavigate = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <div className="">
      {/* Hero Section */}
      <div className="bg-[#FFF7EB]">
        <div className="relative mx-auto max-w-screen-2xl overflow-hidden md:min-h-[674px]">
          <div className="hidden md:block">
            <RingIcon className="absolute left-[-402px] top-[200px] h-[654px] w-[654px]" />
            <RingIcon className="absolute left-[195px] top-[622px] h-[82px] w-[82px]" />
            <RingIcon className="absolute left-[758px] top-[491px] h-[344px] w-[344px]" />
            <RingIcon className="absolute left-[1375px] top-[-21px] h-[110px] w-[110px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-screen-xl p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
              <div className="mx-auto max-w-xs md:max-w-full">
                <FadeIn delay={0.2}>
                  <p className="text-center text-sm font-medium uppercase leading-10 text-[#828282] md:text-start md:text-2xl md:leading-[4.5rem]">
                    OOROOREE digital
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <h1 className="md-leading-[4rem] mt-4 text-center text-[2.5rem] font-semibold leading-[3.375rem] text-black md:-mt-4 md:max-w-[588px] md:text-start md:text-[3.2rem] md:font-bold lg:text-[3.75rem] lg:leading-[4.5rem]">
                    Revolutionizing Outdoor Ad Industry
                  </h1>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p className="my-6 text-center text-sm font-semibold leading-6 text-black md:my-10 md:max-w-[468px] md:text-start md:text-xl md:leading-[2rem]">
                    OOROOREE Comes with a Technology to Save 9k+ Motorists Lives
                    Every Year
                  </p>
                </FadeIn>
                <FadeIn delay={0.35}>
                  <button
                    onClick={() => handleScrollAndNavigate("about")}
                    className="mx-auto flex w-max items-center gap-6 rounded-[10px] bg-primary px-5 py-4 text-white md:mx-0"
                  >
                    <span>Get Started ! </span>
                    <ArrowIcon />
                  </button>
                </FadeIn>
              </div>
              <FadeIn delay={0.4}>
                <div>
                  <TrafficLightSystem
                    poleHeight={"md:h-[580px]"}
                    lightClassName={"w-14 p-2 gap-2"}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      <BlurFade inView delay={0.1}>
        <div className="px-6 py-20 text-center text-[1.75rem] italic leading-10 md:mx-auto md:max-w-[820px] md:text-[2.5rem] md:leading-[5rem]">
          “The solution is not just about finding a fix, it is about making a
          meaningful impact.”
        </div>
      </BlurFade>

      {/* Welcom Section */}
      <div id="about" className="pb-28">
        <BlurFade inView delay={0.1}>
          <div className="text-center text-base font-bold leading-[3.375rem] text-[#454E58]">
            WELCOME TO
          </div>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <div className="text-center text-5xl font-bold leading-[3.375rem]">
            OOR<span className="text-primary">OOR</span>EE
          </div>
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <P1 className="mx-auto px-12 text-center md:mt-3 md:max-w-[950px] md:px-0">
            Merging outdoor advertising with innovation. Our LED displays on
            traffic poles redefine engagement, appearing strategically at red
            lights. Plus, we're your hub for broadcasting public info and
            alerts.
          </P1>
        </BlurFade>
      </div>

      <div className="mt-10 flex flex-shrink-0 flex-col gap-[45px] px-4 md:mt-[100px] lg:gap-[135px]">
        <About />
        <Mission />
        <Vision />
        <Founders />
        <Services />
        <Pricing />
      </div>

      {/* Compare Price Section */}
      <FadeIn>
        <img
          draggable={false}
          src="/HeroPricingSmall.svg"
          className="mx-auto mt-20 w-full max-w-screen-xl px-6 md:mt-[194px] md:hidden"
        />
        <img
          draggable={false}
          src="/HeroPricing.svg"
          className="mx-auto mt-20 hidden w-full max-w-screen-xl px-6 md:mt-[194px] md:block"
        />
      </FadeIn>

      {/* Get in Touch Section */}
      {/* Form */}
      <div
        id="contact"
        className="mx-auto mt-20 grid max-w-screen-xl grid-cols-1 px-5 pb-32 md:grid-cols-2"
      >
        <BlurFade className="flex h-full items-center">
          <div className="mx-6 mb-6 rounded-2xl bg-[#061A3A] px-4 py-6 md:my-auto md:px-10 md:py-8">
            <div className="flex flex-col items-center text-center text-[.9375rem] leading-6 text-white md:flex-row md:items-center md:gap-4 md:text-start">
              <svg
                width={24}
                height={19}
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_177_1143)">
                  <path
                    d="M5.45621 18.0026V8.73029L2.58059 6.09953L0.00195312 4.63965V16.3663C0.00195312 17.2716 0.735505 18.0026 1.63827 18.0026H5.45621Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M18.5459 18.0025H22.3638C23.2693 18.0025 24.0002 17.2688 24.0002 16.3662V4.63965L21.0794 6.31177L18.5459 8.7302V18.0025Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.45477 8.73012L5.06348 5.10717L5.45477 1.63965L11.9998 6.54849L18.5449 1.63965L18.9826 4.91996L18.5449 8.73012L11.9998 13.639L5.45477 8.73012Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M18.5459 1.6399V8.73037L24.0002 4.63973V2.45801C24.0002 0.434532 21.6903 -0.718996 20.0732 0.494529L18.5459 1.6399Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M0.00195312 4.63977L2.51047 6.52123L5.45621 8.73041V1.63994L3.92892 0.494572C2.30901 -0.719047 0.00195312 0.434575 0.00195312 2.45796V4.63968V4.63977Z"
                    fill="#C5221F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_177_1143">
                    <rect width={24} height="18.0927" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>
                <div className="mt-3 font-semibold">EMAIL</div>
                <Link to={"mailto:digitaloorooree@gmail.com"}>
                  digitaloorooree@gmail.com
                </Link>
              </div>
            </div>
            {/* Call */}
            <div className="mt-6 flex flex-col items-center text-center text-[.9375rem] leading-6 text-white md:flex-row md:gap-4 md:text-start">
              <svg
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.23 15.3535L16.69 15.0635C16.3914 15.0284 16.0886 15.0615 15.8046 15.1602C15.5205 15.259 15.2626 15.4208 15.05 15.6335L13.21 17.4735C10.3712 16.0297 8.06382 13.7223 6.62004 10.8835L8.47004 9.03352C8.90004 8.60352 9.11004 8.00352 9.04004 7.39352L8.75004 4.87352C8.69335 4.38569 8.45923 3.93575 8.09228 3.60936C7.72532 3.28298 7.25115 3.10293 6.76004 3.10352H5.03004C3.90004 3.10352 2.96004 4.04352 3.03004 5.17352C3.56004 13.7135 10.39 20.5335 18.92 21.0635C20.05 21.1335 20.99 20.1935 20.99 19.0635V17.3335C21 16.3235 20.24 15.4735 19.23 15.3535Z"
                  fill="#2196F3"
                />
              </svg>
              <div>
                <div className="mt-3 font-semibold uppercase">Call</div>
                <div className="mt-2 flex flex-col gap-2 md:flex-row">
                  <Link to={"tel:+919109597215"}>+91 91095 97215</Link>
                  <Link to={"tel:+917024937315"}>+91 70249 37315</Link>
                  <Link to={"tel:+919111390007"}>+91 91113 90007</Link>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mt-6 flex flex-col items-center text-center text-[.9375rem] leading-6 text-white md:flex-row md:gap-4 md:text-start">
              <svg
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8008 11.9941C11.1377 11.9941 10.5019 11.7307 10.033 11.2619C9.56417 10.7931 9.30078 10.1572 9.30078 9.49414C9.30078 8.8311 9.56417 8.19521 10.033 7.72637C10.5019 7.25753 11.1377 6.99414 11.8008 6.99414C12.4638 6.99414 13.0997 7.25753 13.5685 7.72637C14.0374 8.19521 14.3008 8.8311 14.3008 9.49414C14.3008 9.82244 14.2361 10.1475 14.1105 10.4508C13.9848 10.7542 13.8007 11.0298 13.5685 11.2619C13.3364 11.4941 13.0608 11.6782 12.7575 11.8038C12.4542 11.9295 12.1291 11.9941 11.8008 11.9941ZM11.8008 2.49414C9.94427 2.49414 8.16379 3.23164 6.85103 4.54439C5.53828 5.85715 4.80078 7.63762 4.80078 9.49414C4.80078 14.7441 11.8008 22.4941 11.8008 22.4941C11.8008 22.4941 18.8008 14.7441 18.8008 9.49414C18.8008 7.63762 18.0633 5.85715 16.7505 4.54439C15.4378 3.23164 13.6573 2.49414 11.8008 2.49414Z"
                  fill="#FF1F00"
                />
              </svg>
              <div>
                <div className="mt-3 font-semibold uppercase">Location</div>
                <div>
                  ITM INCUBATION CENTER, Sithouli Village, Gwalior, Madhya
                  Pradesh India.
                </div>
                <Link
                  to={"https://maps.app.goo.gl/cijZjHveYAqjUru59"}
                  className="underline"
                >
                  Check on map
                </Link>
              </div>
            </div>

            {/* Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5144006594637!2d78.18546097541335!3d26.147371677111526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c4964532abdd%3A0xe71fa0450b77e0a5!2sITM%20Gwalior!5e0!3m2!1sen!2sin!4v1751034090489!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-10 h-[300px] w-full rounded-xl"
            ></iframe>
          </div>
        </BlurFade>
        <div className="max-w-[564px] md:col-start-1 md:row-start-1">
          <BlurFade>
            <H2 className="mt-20 max-w-[570px] md:mt-0">
              Get in <span className="text-primary"> Touch</span>
            </H2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <P1 className="mt-3 max-w-[1050px]">
              Ready to elevate your brand with our innovative advertising
              solutions?Get in touch now and let's make an impact together.
            </P1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <ContactForm />
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
