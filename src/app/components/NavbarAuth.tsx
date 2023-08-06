"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

const NavbarAuth = () => {
  return (
    <>
      <Suspense fallback={<Skeleton width={50} height={50} />}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Suspense>
      <Suspense fallback={<Skeleton width={50} height={50} />}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </Suspense>
    </>
  );
};

export default NavbarAuth;
