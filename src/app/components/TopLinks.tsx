import { FC } from "react";
import Link from "next/link";
interface LinksProps {
  showHome?: boolean;
}

const Links: FC<LinksProps> = ({ showHome }) => {
  const links = [
    {
      name: "Write a Review",
      link: "/createreview",
    },
    {
      name: "Businesses",
      link: "/fetch",
    },
    {
      name: "Services",
      link: "/",
    },
    {
      name: "My Reviews",
      link: "/",
    },
  ];

  if (showHome) {
    links.unshift({
      name: "Home",
      link: "/",
    });
  }
  return (
    <div className={`flex flex-row`}>
      {links.map((link, index) => (
        <Link href={link.link} key={index}>
          <li className=" hover:text-mycolours-c1 hover:bg-slate-100 duration-300 px-4 transition-all ease-in-out rounded-lg gap-3 py-2">
            {link.name}
          </li>
        </Link>
      ))}
    </div>
  );
};

export default Links;
