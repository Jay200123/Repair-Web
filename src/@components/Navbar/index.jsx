import NavLogo from "@assets/Nav-logo.png";

export default function Navbar() {
  return (
    <>
      <nav className="lg:w-full lg:h-15 bg-[#63C6B5] flex items-center justify-between shadow lg:p-1.5 rounded-md text-white">
        <div className="w-1/4 h-full flex items-center">
          <div>
            <img
              src={NavLogo}
              className="h-14 w-14 lg:mr-1.5"
              alt="Anymall.PH"
            />
          </div>
          <h3 className="lg:text-lg font-medium cursor-pointer">Repair Web</h3>
        </div>

        <div className="h-full w-[25%] flex items-center">
          <ul className="flex w-full justify-between font-medium">
            <li className="lg:text-base cursor-pointer lg:p-2 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-[#63C6B5]">
              <i className="fa-solid fa-chart-area mr-1"></i>Dashboard
            </li>
            <li className="lg:text-base cursor-pointer lg:p-2 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-[#63C6B5]">
              <i className="fa-solid fa-wrench mr-1"></i>Repairs
            </li>
            <li className="lg:text-base cursor-pointer lg:p-2 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-[#63C6B5]">
              <i className="fa-solid fa-box mr-1"></i>Units
            </li>
            <li className="lg:text-base cursor-pointer lg:p-2 rounded-md transition-all ease-in-out duration-500 hover:bg-white hover:text-[#63C6B5]">
              <i className="fa-solid fa-user mr-1"></i>Technicians
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
