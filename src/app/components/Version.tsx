"use client";
import { useClerk } from "@clerk/nextjs";

const Version = () => {
  const { signOut } = useClerk();
  return <p className="text-sm text-gray-500">v-0.5</p>;
};

export default Version;
