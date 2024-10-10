"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import UserButtonComponent from "./UserButton";
const NavbarAuth = () => {
  return (
    <div className="flex justify-center items-center">
      <Suspense fallback={<Skeleton width={50} height={50} />}>
        <SignedIn>
          <UserButtonComponent />
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
