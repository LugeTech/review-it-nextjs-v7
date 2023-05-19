
import { MdFastfood, MdDeliveryDining, MdOutlineElectricalServices, MdBusinessCenter, MdOtherHouses, MdOutlineLocalTaxi } from 'react-icons/md'
import { IoMdCar } from 'react-icons/io'
import { GiClothes } from 'react-icons/gi'

const QuickTabs = () => {
    const categories = [
        { name: 'Fast Food', icon: <MdFastfood /> },
        { name: 'Car Rental', icon: <IoMdCar /> },
        { name: 'Delivery Service', icon: <MdDeliveryDining /> },
        { name: 'Electronics', icon: <MdOutlineElectricalServices /> },
        { name: 'Insurance Agency', icon: <MdBusinessCenter /> },
        { name: 'Real Estate', icon: <MdOtherHouses /> },
        { name: 'Clothing Store', icon: <GiClothes /> },
        { name: 'Taxi Service', icon: <MdOutlineLocalTaxi /> },
    ]

    // this component will be quick search little clickable cards categories for the home page
    return (
        <div className='  bg-mycolours-light dark:bg-mycolours-dark dark:text-mycolours-light'>
            <p className='flex pr-2 justify-center items-center text-lg'>Quick Categories</p>
            <div className="flex flex-1 flex-row justify-center w-full text-neutral-700 dark:text-mycolours-light shadow-lg rounded-lg ">
                <div className=" overflow-x-auto whitespace-nowrap ">
                    {categories.map((category, index) => (
                        <div className="inline-block mb-2" key={index}>
                            <div className=' text-2xl hover:bg-white dark:hover:bg-neutral-950 cursor-pointer  flex flex-col bg-transparent rounded justify-around items-center p-2 transition-all ease-in-out'>
                                {category.icon}
                                <p className=" text-xs">{category.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}

export default QuickTabs
