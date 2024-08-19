"use client"; // Still required for client-side font loading

import { FC } from "react";
import { Bungee } from "next/font/google";

const bungeeTint = Bungee({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

interface BungeeTintTextProps {
  children: React.ReactNode;
  className?: string;
}

const BungeeTintText: FC<BungeeTintTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`${bungeeTint.className} ${className}`}>
      {children}
    </span>
  );
};

export default BungeeTintText;
