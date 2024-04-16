"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
const NavbarAuth = () => {
  return (
    <div className="flex justify-center items-center">
      <Suspense fallback={<Skeleton width={50} height={50} />}>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard:
                  "dark:bg-myTheme-niceGrey dark:text-myTheme-light",
                userPreviewSecondaryIdentifier: "dark:text-myTheme-light",
                userButtonPopoverActionButtonIcon__manageAccount:
                  "dark:text-myTheme-light",
                userButtonPopoverActionButtonText: "dark:text-myTheme-light",
                userButtonPopoverActionButtonIcon__signOut:
                  "dark:text-myTheme-light",
              },
            }}
          />
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
