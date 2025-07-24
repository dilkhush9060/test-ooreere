import {BlurFade} from "../animation/BlurFade";

export default function Mission() {
  return (
    <section>
      <div className="mx-auto grid grid-cols-1 gap-[40px] md:max-w-screen-xl md:grid-cols-2 lg:gap-[90px]">
        <BlurFade inView delay={0.2} className="h-full w-full">
          <img
            src="/mission.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </BlurFade>
        <div className="-order-1 flex max-w-[469px] flex-col items-start gap-2">
          <BlurFade inView delay={0.3}>
            <div className="self-stretch text-[3.5rem] font-bold">
              Our Mission
            </div>
          </BlurFade>
          <BlurFade inView delay={0.4}>
            <div className="self-stretch leading-7">
              Revolutionizing the Outdoor AD industry through innovation. We aim
              to provide impactful and engaging advertising solutions that not
              only benefit brands but also enhance safety and convenience for
              commuters. By strategically placing LED displays on traffic signal
              poles & synchronizing AD's with red lights. We strive to create a
              seamless and immersive advertising experience while promoting road
              safety.
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
