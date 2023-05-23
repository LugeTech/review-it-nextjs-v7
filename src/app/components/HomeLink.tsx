import Link from "next/link";
import Image from "next/image";

const HomeLink = () => {
  return (
    <div className="flex flex-row items-center justify-center align-middle">
      <Link
        href="/"
        className="flex  p-1 rounded-sm pr-1 transition-all duration-300 ease-linear items-center justify-center text-center"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={30}
          height={30}
          className=""
        />
        <div className=" flex items-center justify-center text-center align-middle ml-1 self-center md:text-xl font-semibold  dark:text-mycolours-light  hover:text-mycolours-c1 duration-300 ease-linear transition-all">
          [REVIEW IT]
        </div>
      </Link>
    </div>
  );
};

export default HomeLink;
