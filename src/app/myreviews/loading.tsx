"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-1 justify-center items-center ">
      <LoadingSpinner />
    </div>
  );
}
