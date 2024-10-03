import {
  MdFastfood,
  MdDeliveryDining,
  MdOutlineElectricalServices,
  MdBusinessCenter,
  MdOtherHouses,
  MdOutlineLocalTaxi,
} from "react-icons/md";
import { IoMdCar } from "react-icons/io";
import { GiClothes } from "react-icons/gi";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

const QuickTabs = () => {
  const categories = [
    {
      name: "Fast Food",
      icon: <MdFastfood />,
      link: `/browse?tags=${encodeURIComponent("Fast Food")}`,
    },
    {
      name: "Car Rental",
      icon: <IoMdCar />,
      link: `/browse?tags=${encodeURIComponent("Car Rental")}`,
    },
    {
      name: "Delivery Service",
      icon: <MdDeliveryDining />,
      link: `/browse?tags=${encodeURIComponent("Delivery Service")}`,
    },
    {
      name: "Electronics",
      icon: <MdOutlineElectricalServices />,
      link: `browse?tags=${encodeURIComponent("Electronics")}`,
    },
    {
      name: "Insurance Agency",
      icon: <MdBusinessCenter />,
      link: `browse?tags=${encodeURIComponent("Insurance Agency")}`,
    },
    {
      name: "Real Estate",
      icon: <MdOtherHouses />,
      link: `browse?tags=${encodeURIComponent("Real Estate")}`,
    },
    {
      name: "Clothing Store",
      icon: <GiClothes />,
      link: `browse?tags=${encodeURIComponent("Clothing Store")}`,
    },
    {
      name: "Taxi Service",
      icon: <MdOutlineLocalTaxi />,
      link: `browse?tags=${encodeURIComponent("Taxi Service")}`,
    },
    {
      name: "See All",
      icon: <LuExternalLink />,
      link: "/browse",
    },
  ];

  // this component will be quick search little clickable cards categories for the home page
  return (
    <div className="flex flex-col justify-center items-center w-full  bg-myTheme-lightbg ">
      <p className="flex pr-2 justify-center items-center text-lg">
        Quick Categories
      </p>
      <div className="flex flex-row justify-center w-full text-myTheme-lightTextBody  shadow-lg rounded-lg ">
        <div className="flex flex-wrap justify-center w-full">
          {categories.map((category, index) => (
            <div className="inline-block" key={index}>
              <Link
                href={category.link}
                className=" text-2xl hover:bg-neutral-200  cursor-pointer  flex flex-col bg-transparent rounded justify-around items-center p-2 transition-all ease-in-out"
              >
                {category.icon}
                <p className=" text-xs">{category.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickTabs;
