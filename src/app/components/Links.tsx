'use client'
import { FC } from "react";
import Link from 'next/link'
interface LinksProps {
    directionOfLinks: string; // Update the type based on the expected prop type
    showHome?: boolean;
}

const Links: FC<LinksProps> = ({ directionOfLinks, showHome }) => {
    const links = [
        {
            name: 'Write a Review',
            link: '/createreview'
        },
        {
            name: 'Businesses',
            link: '/'
        },
        {
            name: 'Services',
            link: '/'
        },
        {
            name: 'My Reviews',
            link: '/'
        },
    ]

    if (showHome) {
        links.unshift({
            name: 'Home',
            link: '/'
        })
    }
    return (
        <div className={`text-sm  text-center justify-center items-center rounded pl-4 pt-4 bg-transparent flex flex-row flex-1 ${directionOfLinks} w-full gap-8 text-mycolours-dark1 dark:text-mycolours-light `} >
            {links.map((link, index) => (
                <Link href={link.link} key={index}>
                    <p className=" hover:bg-mycolours-light dark:hover:bg-mycolours-dark2 px-4 transition-all ease-in-out rounded-lg">{link.name}</p>
                </Link>
            ))}
        </div >
    )
}

export default Links
