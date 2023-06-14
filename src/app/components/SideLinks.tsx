// noinspection SpellCheckingInspection

import { FC } from "react";
import Link from "next/link";
import Version from "./Version";
interface LinksProps {
  showHome?: boolean;
}

const Links: FC<LinksProps> = () => {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Write a Review",
      link: "/createreview",
    },
    {
      name: "Businesses",
      link: "/fetch",
    },
    {
      name: "Search",
      link: "/search",
    },
    {
      name: "My Reviews",
      link: "/test",
    },
    {
      name: "My Profile",
      link: "/user",
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen mt-8`}>
      {links.map((link, index) => (
        <Link href={link.link} key={index}>
          <li className=" hover:text-myTheme-accent hover:bg-slate-100 duration-300 px-4 transition-all ease-in-out rounded-lg gap-3 py-2">
            {link.name}
          </li>
        </Link>
      ))}
      <div className="flex flex-1 justify-center items-center">
        <Version />
      </div>
    </div>
  );
};

export default Links;
