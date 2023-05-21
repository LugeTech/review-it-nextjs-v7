import Image from 'next/image'
import { faker } from "@faker-js/faker"
import { iReview, iUser, iComment, iProduct } from "./util/Interfaces"
import Welcome from "./components/Welcome"
import QuickTabs from './components/QuickTabs'
import TopReviews from './components/TopReviews'
// import FetchBusinessOfTheDay from './components/FetchBusinessOfTheDay'

export default function Home() {

    const reviews: iReview[] = [
        {
            _id: '1',
            product: '1',
            user: '1',
            rating: 4,
            title: faker.lorem.sentence(),
            body: faker.lorem.sentences(),
            date: new Date(),
            helpfulVotes: faker.datatype.number(),
            unhelpfulVotes: faker.datatype.number(),
            comments: [
                {
                    _id: '1',
                    user: '3',
                    body: faker.lorem.sentences(),
                    createdDate: new Date(),

                }
            ]
        },
        {
            _id: '2',
            product: '2',
            user: '2',
            rating: 5,
            title: faker.lorem.sentence(),
            body: faker.lorem.sentences(),
            date: new Date(),
            helpfulVotes: faker.datatype.number(),
            unhelpfulVotes: faker.datatype.number(),
            comments: [
                {
                    _id: '2',
                    user: '4',
                    body: faker.lorem.sentences(),
                    createdDate: new Date(),
                }
            ]

        }

    ]

    const users: iUser[] = [
        {
            _id: '1',
            firstName: faker.name.firstName(),
            email: faker.internet.email(),
            lastName: faker.name.lastName(),
            avatar: faker.image.avatar()
        },
        {
            _id: '2',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar()

        },
        {
            _id: '3',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar()
        },
        {
            _id: '4',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar()
        }
    ]

    const comments: iComment[] = [
        {
            _id: '1',
            user: '3',
            body: faker.lorem.sentence(9),
            createdDate: new Date(),
        },
        {
            _id: '2',
            user: '4',
            body: faker.lorem.sentence(9),
            createdDate: new Date(),
        }
    ]
    const products: iProduct[] = [
        {
            _id: '1',
            name: faker.commerce.productName(),
            images: ["/logo.png"],
            description: faker.lorem.sentence(),


        },
        {
            _id: '2',
            name: faker.commerce.productName(),
            images: ["/logo.png"],
            description: faker.lorem.sentence(),
        }
    ]


    return (
        <div className="flex flex-1 flex-col justify-center  bg-mycolours-light dark:bg-mycolours-dark dark:text-mycolours-light" >
            <div className="flex flex-1 flex-row">
                <Welcome />
            </div>
            <div className="flex flex-1 flex-col justify-center">
                <QuickTabs />
                <div className='flex flex-col mt-4 flex-1'>
                    <div className="flex flex-col justify-center">

                        <div className='w-full flex flex-row'>

                            <TopReviews reviews={reviews} products={products} users={users} comments={comments} />
                        </div>
                        {/* business of the day */}
                        <div className='flex flex-col justify-center w-full mt-4 mb-4'>
                            <div className='flex justify-center items-center text-md mx-4'>

                            </div>
                        </div >
                    </div>
                </div>
            </div>


        </div>

    )
}
