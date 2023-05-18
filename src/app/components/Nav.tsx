'use client'
import { useEffect, useState } from 'react'
import Links from './Links'
import { BiMenu, BiLogIn, BiUserCircle, BiMenuAltRight, BiUserPlus } from 'react-icons/bi'
import { useRecoilState } from 'recoil';
import { showVerticalNav } from '@/app/util/recoil/atoms'
import Link from 'next/link';
import Image from 'next/image';
import SideNav from './SideNav';
function Nav() {
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [isOpen, setIsOpen] = useRecoilState(showVerticalNav); //switch to atom

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    // Close dropdown menu when login or signup is clicked
    const handleLinkClick = () => {
        setShowDropdown1(false);
        // setShowDropdown2(false);
    };
    // const loginClicked = () => {
    //     console.log('clicked')
    // }//

    // Close dropdown menu when user clicks outside of it
    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (e.target.closest(".dropdown") === null) {
                setShowDropdown1(false);
                // setIsOpen(false); // use click outside to close sidebar
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    return (
        <>
            <SideNav />

            <nav className={" flex bg-mycolours-light border-gray-200 sm:px-1 py-1 dark:bg-mycolours-dark min-w-full"}>
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <div className="ml-2 md:hidden flex">
                        <BiMenu className="text-mycolours-dark text-3xl mr-4 dark:text-mycolours-light hover:text-4xl hover:cursor-pointer transition-all" onClick={toggleSidebar} />
                    </div>

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
                            // className="animate-spin"
                            />
                            <div className=" flex items-center justify-center text-center align-middle ml-2 self-center text-xl font-semibold  dark:text-mycolours-light hover:text-2xl transition-all">
                                [REVIEW IT]
                            </div>
                        </Link>
                    </div>

                    {/* Nav links */}
                    <div className="hidden md:flex flex-1 font-semibold items-center justify-center text-center">
                        <Links directionOfLinks='flex-row' />
                    </div>

                    {/* Login dropdown */}
                    <div className="relative group mr-2 ">
                        <div
                            className="flex flex-row items-center cursor-pointer dropdown  dark:text-mycolours-light text-mycolours-dark text-2xl hover:text-3xl transition-all"
                            onClick={() => setShowDropdown1(!showDropdown1)}
                        >
                            <BiMenuAltRight />
                            <BiUserCircle />
                        </div>

                        <div
                            className={`absolute bg-mycolours-c3 right-0 mt-2 py-2 w-32 rounded-lg shadow-xl z-10 ${showDropdown1 ? "block" : "hidden"
                                } transition-all duration-300 ease-in-out dropdown`}>
                            <Link
                                href="/"
                                className="block px-2 py-2 hover:bg-mycolours-c4"
                            // onClick={handleLinkClick}
                            >
                                <div className='flex flex-row gap-1'>
                                    <BiLogIn className="text-2xl text-mycolours-dark" />
                                    Login
                                </div>
                            </Link>

                            <Link
                                href="#"
                                className="block px-2 py-2 hover:bg-gray-100"
                            // onClick={toggleSidebar}
                            >
                                <div className='flex flex-row gap-1'>
                                    <BiUserPlus className="text-2xl text-mycolours-dark" />
                                    Sign up
                                </div>
                            </Link>
                        </div>
                    </div>


                </div>

            </nav>
        </>

    );
}





export default Nav
