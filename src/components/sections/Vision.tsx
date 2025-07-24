import {BlurFade} from "../animation/BlurFade";

export default function Vision() {
  return (
    <section>
      <div className="mx-auto grid grid-cols-1 gap-[40px] md:max-w-screen-xl md:grid-cols-2 lg:gap-[90px]">
        <BlurFade inView delay={0.2} className="h-full w-full">
          <img
            src="/vision.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </BlurFade>
        <div className="-order-1 flex max-w-[469px] flex-col items-start gap-2 md:order-1">
          <BlurFade inView delay={0.3}>
            <div className="self-stretch text-[3.5rem] font-bold">
              Our Vision
            </div>
          </BlurFade>
          <BlurFade inView delay={0.4}>
            <div className="self-stretch leading-7">
              OOROOREE vision is to lead global outdoor advertising solutions.
              Our innovative advertising approach will transform urban
              landscapes, making cities safer, more engaging, and better
              connected.A commitment to excellence and continuous innovation, we
              aim to shape the future of advertising while positively impacting
              communities and businesses worldwide.
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
