import { ParameterIcon } from "./icons/ParameterIcon.tsx";
import { Link } from "@tanstack/react-router";

export const NavBar = () => {
  return (
    <div className="relative flex size-full flex-col bg-white group/design-root overflow-x-hidden font-[Manrope]">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
              <Link className="hover:text-[#1980e6] transition-colors" to="/">
                Quentin Sautière
              </Link>
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link
                className="text-[#111418] text-sm font-medium leading-normal"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-[#111418] text-sm font-medium leading-normal"
                to="/services"
              >
                Services
              </Link>
              <Link
                className="text-[#111418] text-sm font-medium leading-normal"
                to="/projects"
              >
                Projects
              </Link>
              <Link
                className="text-[#111418] text-sm font-medium leading-normal"
                to="/about"
              >
                About
              </Link>
              <Link
                className="text-[#111418] text-sm font-medium leading-normal"
                to="/contact"
              >
                Contact
              </Link>
            </div>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f0f2f4] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <ParameterIcon />
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default NavBar;
