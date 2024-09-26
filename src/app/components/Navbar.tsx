"use client";
import HomeLink from "./HomeLink";
import TopLinks from "./TopLinks";
import SideLinks from "./SideLinks";
import NavbarAuth from "./NavbarAuth";
import { useState } from "react";
import { Toaster } from "sonner";
import Footer from "./Footer";
import NotificationBell from "./notification-components/OwnerNotification";
import { useAuth } from "@clerk/nextjs";
import NotificationDropdown from "./notification-components/NavNotification";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const auth = useAuth();
  const { userId } = auth;


  const handleSideLinkClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-white z-10 sticky top-0">
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
          <div className="mx-4 flex gap-4">
            {userId && <NotificationDropdown />}
            <NavbarAuth />
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto ">
          <Toaster position="top-right" />
          {children}
          <Footer />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="flex flex-col gap-4 font-bold menu p-4 w-60 h-full bg-myTheme-lightbg ">
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
