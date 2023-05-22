
import { FC } from "react";
import Link from 'next/link'
interface LinksProps {
    directionOfLinks: string; 
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
        <div className={`flex  ${directionOfLinks} `} >
            {links.map((link, index) => (
                <Link href={link.link} key={index}>
                    <li className=" hover:text-mycolours-c1 duration-300 px-4 transition-all ease-in-out rounded-lg">{link.name}</li>
                </Link>
            ))}
        </div >
    )
}

export default Links
