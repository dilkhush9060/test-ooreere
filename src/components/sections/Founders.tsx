import {BlurFade} from "../animation/BlurFade";
import {H2, H4, P1} from "../ui/Typography";

export default function Founders() {
  return (
    <section className=" ">
      <BlurFade
        inView
        className="flex flex-col items-center justify-center gap-2"
      >
        <H2 className="text-center">Meet our Founders</H2>
        <P1 className="mx-auto max-w-[552px] text-center">
          With a background in Mechanical and Automation, we are passionate
          about solving major OOH advertising challenges through tech
          innovation.
        </P1>
      </BlurFade>
      <BlurFade
        inView
        className="mt-20 flex flex-wrap items-center justify-center gap-10"
      >
        <FOUNDER_CARD
          img="Jatin.webp"
          name="Jatin Sapra"
          designation="Founder"
          education="B.tech 2023 @ ITM GOI"
        />
        <FOUNDER_CARD
          img="Krishnakant.webp"
          name="Krishnakant Sharma"
          designation="Founder"
          education="B.tech 2023 @ ITM GOI"
        />
        <FOUNDER_CARD
          img="Ravi.webp"
          name="Ravi Rajput"
          designation="Founder"
          education="B.tech 2023 @ ITM GOI"
        />
      </BlurFade>
    </section>
  );
}

const FOUNDER_CARD = ({
  img,
  name,
  designation,
  education,
}: {
  img: string;
  name: string;
  designation: string;
  education: string;
}) => (
  <div
    className="relative aspect-[3/4] w-full max-w-[300px] bg-cover bg-top bg-no-repeat"
    style={{backgroundImage: `url(/${img})`}}
  >
    <div className="absolute bottom-0 left-0 right-0 mx-auto w-[90%] border-t-8 border-primary bg-white p-4">
      <H4 className="text-center">{name}</H4>
      <P1 className="text-center">{designation}</P1>
      <P1 className="text-center">{education}</P1>
    </div>
  </div>
);
