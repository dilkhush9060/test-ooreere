import {BlurFade} from "../animation/BlurFade";
import {H2, P1} from "../ui/Typography";

export default function Services() {
  const SERVICES = [
    "Dynamic LED display installations on traffic signal poles.",
    "End-to-end solutions for maximizing brand visibility and engagement.",
    "Stream & control ad content remotely via our cloud-based platform for flexibility and efficiency.",
  ];
  return (
    <div id="services" className="px-8 pb-5 pt-[60px]">
      <BlurFade inView>
        <H2 className="text-center">Our Services</H2>
      </BlurFade>
      <BlurFade inView delay={0.2}>
        <P1 className="mx-auto mt-3 max-w-[668px] text-center">
          From local businesses to multinational corporations, we deliver
          impactful advertising solutions tailored to diverse needs.
        </P1>
      </BlurFade>
      <div className="mx-auto mt-[67px] flex flex-wrap justify-center gap-10">
        {SERVICES.map((service, index) => (
          <BlurFade inView delay={index * 0.1} key={index}>
            <div className="flex min-h-[188px] w-[357.33px] items-center rounded-xl border border-[#FFF7ED] px-10 py-[30px] shadow-[8px_7.11px_0px_0px_#FFCC89]">
              {service}
            </div>
          </BlurFade>
        ))}
      </div>
      <BlurFade inView delay={0.4}>
        <div>
          <img
            src="/services.webp"
            alt=""
            className="mx-auto mt-12 aspect-[808/538] w-[808px]"
          />
        </div>
      </BlurFade>
    </div>
  );
}
