
import Links from "./Links";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";


const Navbar = ({children,}: {children: React.ReactNode;}) => {
  return (
    <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">

    <div className="w-full navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
          <div className="flex-1 px-2 mx-2">
          <div className="flex flex-row items-center justify-center align-middle">
            <Link
              href="/"
              className="flex ml-1 p-1 rounded-sm pr-1 transition-all duration-300 ease-linear items-center justify-center text-center"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={30}
                height={30}
                className="hidden md:flex"
              />
              <div className=" flex items-center justify-center text-center align-middle ml-2 self-center text-xl font-semibold  dark:text-mycolours-light  hover:text-mycolours-c1 duration-300 ease-linear transition-all">
                  [REVIEW IT]
                  
              </div>
            </Link>
          </div>
      </div>
      <div className="flex-none hidden lg:block">
      <div className="hidden md:flex flex-1 font-semibold items-center justify-center text-center">
      <ul className="menu menu-horizontal">
            <Links directionOfLinks="flex-row" />
            </ul>
          </div>
          </div>
          <div className="ml-4">
          <UserButton />
          </div>
    </div>
    {children}
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100">

    <Links directionOfLinks="flex-col" />
      
    </ul>
    
  </div>
</div>
  )
}

export default Navbar
