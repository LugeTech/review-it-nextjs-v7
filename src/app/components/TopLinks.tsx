import { FC } from "react";
import Link from "next/link";
import { topLinks } from "@/app/util/links";
interface LinksProps {
  showHome?: boolean;
}

const Links: FC<LinksProps> = ({ showHome }) => {
  if (showHome) {
    topLinks.unshift({
      name: "Home",
      link: "/",
    });
  }
  return (
    <div className={`flex flex-row`}>
      {topLinks.map((link, index) => (
        <Link href={link.link} key={index}>
          <li className=" hover:text-myTheme-accent hover:bg-slate-100 duration-300 px-4 transition-all ease-in-out rounded-lg gap-3 py-2">
            {link.name}
          </li>
        </Link>
      ))}
    </div>
  );
};

export default Links;
