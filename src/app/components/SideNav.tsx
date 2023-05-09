'use client'
import Links from "../components/Links"
import { useRecoilState } from "recoil"
import { showVerticalNav } from "./recoil/atoms"
import { AiOutlineCloseSquare } from "react-icons/Ai"
import { BiLogOut } from "react-icons/bi"

const SideNav = () => {
    const [isOpen, setIsOpen] = useRecoilState(showVerticalNav); //switch to atom
    return (

        <div className={`flex flex-1 flex-col shadow-2xl sidebar fixed inset-y-0 w-52  bg-mycolours-light  dark:bg-mycolours-dark transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-52'}`}>
            <div className="flex justify-end">
                <AiOutlineCloseSquare className=" cursor-pointer text-2xl text-mycolours-dark dark:text-mycolours-light" onClick={() => { setIsOpen(false)}} />
            </div>
            <div className="flex flex-1 flex-col">
                {isOpen && <Links directionOfLinks={'flex-col'} showHome={true} />}
            </div>
            <div className="flex flex-1 flex-row gap-2 items-end mb-8 justify-center">
                <BiLogOut className=' text-xl'/>
                <div>Logout</div>
            </div>
        </div>

    )
}

export default SideNav