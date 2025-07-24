export const NavBar = () => {
  return (
    <div className="NavContainer flex items-center justify-between border-2 px-6 py-4">
      {/* logo */}
      <div className="logo flex items-center justify-center">
        <img src="/apple-icon.png" alt="Logo" width={55} height={55} />
        <h3 className="">ADITYA RAJ</h3>
      </div>

      <nav className="relative shrink-0 border-2">
        {/* navigation */}
        <div className="md:hidden"></div>
        {/* Navigation Links (Hidden on small screens) */}
        <div className="max-w-screen border-2 bg-amber-400">
          <div
            className={`absolute left-0 right-0 top-[65px] w-full transition-all duration-300 md:hidden`}
          >
            <ul className="flex w-full flex-col gap-4">
              <li className="w-full border-2 p-4">
                <div>HOME</div>
              </li>
              <li className="border-2 p-4">
                <div>ABOUT</div>
              </li>
              <li className="border-2 p-4">
                <div>PROKECTS</div>
              </li>
              <li className="border-2 p-4">
                <div>CONTACT</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* desktop screen */}
      <div className="hidden border-2 md:block">
        <ul className="flex flex-row items-center justify-center gap-5 p-2">
          <li>
            <div>Home</div>
          </li>
          <li>
            <div>ABOUT</div>
          </li>
          <li>
            <div>PROKECTS</div>
          </li>
          <li>
            <div>CONTACT</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
