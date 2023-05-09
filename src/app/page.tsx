import Image from 'next/image'
import { faker } from "@faker-js/faker"
import { Review, User, Comment, Product } from "./tools/Interfaces"
import Welcome from "./components/Welcome"
import QuickTabs from './components/QuickTabs'
import TopReviews from './components/TopReviews'


export default function Home() {

  const reviews: Review[] = [
    {
        _id: '1',
        productId: '1',
        userId: '1',
        rating: 4,
        title: faker.lorem.sentence(),
        body: faker.lorem.sentences(),
        date: new Date(),
        helpfulVotes: faker.datatype.number(),
        unhelpfulVotes: faker.datatype.number(),
        comments: [
            {
                id: '1',
                userId: '3',
                body: faker.lorem.sentences(),
                date: new Date(),
            }
        ]
    },
    {
        _id: '2',
        productId: '2',
        userId: '2',
        rating: 5,
        title: faker.lorem.sentence(),
        body: faker.lorem.sentences(),
        date: new Date(),
        helpfulVotes: faker.datatype.number(),
        unhelpfulVotes: faker.datatype.number(),
        comments: [
            {
                id: '2',
                userId: '4',
                body: faker.lorem.sentences(),
                date: new Date(),
            }
        ]

    }

]

const users: User[] = [
    {
        id: '1',
        name: faker.name.firstName(),
        email: faker.internet.email(),
        avatar: "/logo.png",
    },
    {
        id: '2',
        name: faker.name.firstName(),
        email: faker.internet.email(),
        avatar: "/logo.png",
    },
    {
        id: '3',
        name: faker.name.firstName(),
        email: faker.internet.email(),
        avatar: "/logo.png",
    },
    {
        id: '4',
        name: faker.name.firstName(),
        email: faker.internet.email(),
        avatar: "/logo.png",
    }
]

const comments: Comment[] = [
    {
        id: '1',
        userId: '3',
        body: faker.lorem.sentence(9),
        date: new Date(),
    },
    {
        id: '2',
        userId: '4',
        body: faker.lorem.sentence(9),
        date: new Date(),
    }
]
const products: Product[] = [
    {
        id: '1',
        name: faker.commerce.productName(),
        price: 234,
        image: "/logo.png",
        description: faker.lorem.sentence(),

    
    },
    {
        id: '2',
        name: faker.commerce.productName(),
        price: 542,
        image: "/logo.png",
        description: faker.lorem.sentence(),
    }
]
  
  return (
    <div>
            <div className="flex-1">
                <div className="flex flex-1 flex-col justify-center" >
                    <div className="flex flex-1 flex-row">
                        <Welcome />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                        <QuickTabs />
                        <div className='flex flex-col mt-4 flex-1'>
                            <div className="flex flex-row justify-center">
                                {/* business of the day */}
                                <div className='flex flex-1 flex-row flex-wrap justify-start text-md mt-1 mb-2 items-center '>
                                    <p className="text-mycolours-dark dark:text-mycolours-light">Business of the day</p>
                                </div >
                                <div className='w-1/2 float-right'>
                                    
                                    <TopReviews reviews={reviews} products={products} users={users} comments={comments} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
  )
}
