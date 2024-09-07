import Link from "next/link";
import Version from "./Version";
import { sideLinks } from "@/app/util/links";
import { IconContext } from "react-icons";
import { FiHome, FiPackage, FiGrid, FiPlusSquare, FiUser, FiHelpCircle } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";


interface SideLinksProps {
  onSideLinkClick: () => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  home: FiHome,
  product: FiPackage,
  category: FiGrid,
  add: FiPlusSquare,
  user: FiUser,
  price: IoPricetagOutline,
};

const SideLinks: React.FC<SideLinksProps> = ({ onSideLinkClick }) => {
  return (
    <IconContext.Provider value={{ className: "w-5 h-5 mr-3" }}>
      <div className="flex flex-col mt-20 flex-1 justify-start items-start">
        <ul className="w-full">
          {sideLinks.map((link, index: number) => {
            const Icon = iconMap[link.icon] || FiHelpCircle;
            return (
              <li key={index} className="w-full">
                <Link href={link.link}>
                  <div
                    onClick={onSideLinkClick}
                    className="flex items-center hover:text-myTheme-accent hover:bg-slate-100 duration-400 px-4 transition-all ease-in-out rounded-lg gap-3 py-2 cursor-pointer w-full"
                  >
                    <Icon />
                    <span>{link.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex h-full flex-1 justify-center items-end w-full">
          <Version />
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default SideLinks;
