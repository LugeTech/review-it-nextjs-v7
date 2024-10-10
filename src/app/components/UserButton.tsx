import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClerk, useUser, SignInButton } from "@clerk/nextjs";
import { ChevronDown, LogOut, SquareUserRound } from "lucide-react";

const UserButtonComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <SignInButton />;
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAccountClick = () => {
    router.push("/userprofile");
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    signOut();
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <div className="relative h-full rounded ">
      <button
        onClick={handleMenuToggle}
        className="flex items-center space-x-2 dark:text-dark-text sm:text-light-text text-base focus:outline-none"
      >
        <span className="hidden md:inline font-semibold">{user?.fullName}</span>
        <Image
          src={user?.imageUrl || ""}
          alt="avatar"
          width={24}
          height={24}
          className="rounded-full shadow-xl"
        />
        <ChevronDown size={16} />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 font-semibold">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleAccountClick}
              className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              <div className="flex gap-2 justify-start items-center">
                <SquareUserRound /> My Profile
              </div>
            </button>
            <button
              onClick={handleLogoutClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              <div className="flex gap-2 justify-start items-center">
                <LogOut /> Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButtonComponent;
