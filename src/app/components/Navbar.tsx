// noinspection GrazieInspection
"use client";
import HomeLink from "./HomeLink";
import TopLinks from "./TopLinks";
import SideLinks from "./SideLinks";
import NavbarAuth from "./NavbarAuth";
import { Suspense } from "react";
import Image from "next/image";
import { useState } from "react";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSideLinkClick = () => {
    setIsDrawerOpen(false); // Close the drawer when a sidelink is clicked
  };

  return (
    <div className="drawer sticky top-0 ">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-myTheme-lightbg dark:bg-myTheme-niceBlack z-10">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 mx-1">
            <HomeLink />
            <div className="flex-none hidden lg:block">
              <div className="hidden md:flex flex-1 font-normal items-center justify-center text-center ml-4">
                <ul className="menu menu-horizontal">
                  <TopLinks />
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <Suspense
              fallback={
                <Image src="/logo.png" alt="loading" width={50} height={50} />
              }
            >
              <NavbarAuth />
            </Suspense>
          </div>
        </div>
        <div className=" flex flex-col w-full h-full overflow-y-auto ">
          {children}
        </div>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-3" className="drawer-overlay "></label>
        <div className="flex flex-col gap-4 font-bold menu p-4 w-60 h-full bg-myTheme-lightbg dark:bg-myTheme-niceBlack">
          {/* <HomeLink /> */}
          <SideLinks onSideLinkClick={handleSideLinkClick} />
          <div className="flex justify-center items-end p-4">
            <NavbarAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
