import {BlurFade} from "../animation/BlurFade";

export default function About() {
  return (
    <section id="about">
      <div className="mx-auto grid grid-cols-1 gap-[40px] md:max-w-screen-xl md:grid-cols-2 lg:gap-[90px]">
        <BlurFade inView delay={0.2} className="h-full w-full">
          <img src="/about.png" alt="" className="h-full w-full object-cover" />
        </BlurFade>
        <div className="-order-1 flex max-w-[469px] flex-col items-start gap-2 md:order-1">
          <BlurFade inView delay={0.3}>
            <div className="self-stretch text-[3.5rem] font-bold">About Us</div>
          </BlurFade>
          <BlurFade inView delay={0.4}>
            <div className="self-stretch leading-7">
              At OOROREE, we are revolutionizing the outdoor advertising
              industry with cutting-edge AI and technology. Our innovative
              solutions help businesses maximize ad reach, optimize costs, and
              enhance engagement like never before. Backed by a visionary team,
              we strive to make outdoor advertising smarter, more effective, and
              impactful. Join us in transforming the future of digital ads!
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
