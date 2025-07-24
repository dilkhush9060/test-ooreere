import Conversation from "./Conversation";

export default function Conversations() {
  const DATA = [
    {
      name: "Christina Cameron",
      message:
        "Process pattern call last. Sort resource necessary behavior. Interview product six site nation question indicate. War expect parent provide wide seem.",
      profile: "https://dummyimage.com/993x28",
      time: "2025-01-03 11:00:23",
    },
    {
      name: "Ryan Clayton",
      message:
        "All bit read employee. Owner one follow manager such. Easy fund beautiful TV. Point require ability member standard election. Worry at majority might join truth.",
      profile: "https://www.lorempixel.com/594/875",
      time: "2025-01-11 15:53:00",
    },
    {
      name: "David Mayo",
      message:
        "Focus participant meeting approach hour how. Information oil she child role focus probably. For pull analysis somebody friend central.",
      profile: "https://placeimg.com/88/348/any",
      time: "2025-01-12 00:44:44",
    },
    {
      name: "Jessica Reyes",
      message:
        "Conference product newspaper. So tend figure end painting what. Go black Congress perform toward. Can though college election throughout forget big city.",
      profile: "https://dummyimage.com/736x864",
      time: "2025-01-22 05:44:42",
    },
    {
      name: "Lauren Diaz",
      message:
        "Appear serious open professional car billion radio. Shake yeah quite condition deal might. Figure stand hit remain meet hospital control.",
      profile: "https://www.lorempixel.com/425/128",
      time: "2025-01-13 14:41:39",
    },
    {
      name: "Matthew Bennett",
      message:
        "Speak relationship support trial market drive. Like amount school resource. Memory off require administration require throughout sing work. Involve another choose then skill from I.",
      profile: "https://www.lorempixel.com/655/665",
      time: "2025-01-10 13:15:41",
    },
    {
      name: "Erica Stevens",
      message:
        "Feel method environmental field. Who series water rule amount life more ago. Fall glass ahead between military nor north. Huge even PM make. Imagine year action thought try measure hour rest.",
      profile: "https://dummyimage.com/359x53",
      time: "2025-01-07 14:29:54",
    },
    {
      name: "Shari Shannon",
      message:
        "Result goal hair blue herself grow. Consumer financial reduce treat. Specific why within chance.",
      profile: "https://placeimg.com/900/24/any",
      time: "2025-01-03 05:24:41",
    },
    {
      name: "Christina Mueller",
      message:
        "Wear edge positive avoid day politics now. Either difference technology wish former enough manage sport. Property class ground age value.",
      profile: "https://placeimg.com/222/242/any",
      time: "2025-01-01 06:51:42",
    },
    {
      name: "Holly Deleon",
      message:
        "Seven feeling decade research despite continue late. Close listen blood development. Argue notice apply close money no. Where serve sign myself establish seven bag. Blood daughter prove whose news.",
      profile: "https://placeimg.com/795/42/any",
      time: "2025-01-11 23:06:55",
    },
  ];
  return (
    <div className="w-[380px] overflow-y-auto rounded-[10px] border border-[#E6E9F5] bg-white p-5">
      <div className="text-base font-semibold">Messages</div>
      <div className="mt-[27px] flex items-center gap-[10px] rounded-lg border border-[#E6E9F5] bg-[#F7F7F8] px-4 py-3">
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.38477 7.15858C1.38477 4.33546 3.70052 2.04688 6.55715 2.04688C7.92895 2.04688 9.24457 2.58543 10.2146 3.54406C11.1846 4.50269 11.7295 5.80287 11.7295 7.15858C11.7295 9.9817 9.41378 12.2703 6.55715 12.2703C3.70052 12.2703 1.38477 9.9817 1.38477 7.15858ZM11.6442 11.2757L13.1847 12.4915H13.2114C13.5231 12.7995 13.5231 13.2989 13.2114 13.6069C12.8998 13.9149 12.3945 13.9149 12.0828 13.6069L10.8044 12.1743C10.6836 12.0553 10.6156 11.8936 10.6156 11.725C10.6156 11.5564 10.6836 11.3947 10.8044 11.2757C11.0375 11.0493 11.4111 11.0493 11.6442 11.2757Z"
              fill="#200E32"
            />
          </g>
        </svg>

        <input
          type="text"
          className="bg-transparent focus:border-0 focus:outline-none focus:ring-0"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-col gap-[50px] pt-6">
        {DATA.map((item, index) => (
          <Conversation
            key={index}
            name={item.name}
            message={item.message}
            //@ts-expect-error fix this later
            profile={item.profile}
            time={item.time}
          />
        ))}
      </div>
    </div>
  );
}
