"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { useClerk, useUser } from "@clerk/nextjs";
const NavbarAuth = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className="flex justify-center items-center">
      <Suspense fallback={<Skeleton width={50} height={50} />}>
        <SignedIn>
          <div className="flex justify-center items-center text-sm mr-1">
            {user?.username}
          </div>
          <UserButton />
        </SignedIn>
      </Suspense>
      <Suspense fallback={<Skeleton width={50} height={50} />}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </Suspense>
    </div>
  );
};

export default NavbarAuth;
