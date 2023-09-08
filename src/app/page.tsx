// import { faker } from "@faker-js/faker";
import { iReview, iUser, iComment, iProduct } from "./util/Interfaces";
import QuickTabs from "./components/QuickTabs";
import TopReviews from "./components/TopReviews";
import HeroSection from "./components/HeroSection";
// import Token from "./components/Token";

export const revalidate = 30;

export default async function Home() {
  const reviews: iReview[] = [
    {
      id: "1",
      productId: "1",
      user: "1",
      rating: 4,
      title: faker.lorem.sentence(),
      body: faker.lorem.sentences(),
      date: new Date(),
      helpfulVotes: faker.datatype.number(),
      unhelpfulVotes: faker.datatype.number(),
      comments: [
        {
          id: "1",
          user: "3",
          body: faker.lorem.sentences(),
          createdDate: new Date(),
        },
      ],
    },
    {
      id: "2",
      productId: "2",
      user: "2",
      rating: 5,
      title: faker.lorem.sentence(),
      body: faker.lorem.sentences(),
      date: new Date(),
      helpfulVotes: faker.datatype.number(),
      unhelpfulVotes: faker.datatype.number(),
      comments: [
        {
          id: "2",
          user: "4",
          body: faker.lorem.sentences(),
          createdDate: new Date(),
        },
      ],
    },
  ];

  const users: iUser[] = [
    {
      id: "1",
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
    },
    {
      id: "2",
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    },
    {
      id: "3",
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    },
    {
      id: "4",
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    },
  ];

  const comments: iComment[] = [
    {
      id: "1",
      user: "3",
      body: faker.lorem.sentence(9),
      createdDate: new Date(),
    },
    {
      id: "2",
      user: "4",
      body: faker.lorem.sentence(9),
      createdDate: new Date(),
    },
  ];
  const products: iProduct[] = [
    {
      id: "1",
      name: faker.commerce.productName(),
      images: ["/logo.png"],
      description: faker.lorem.sentence(),
    },
    {
      id: "2",
      name: faker.commerce.productName(),
      images: ["/logo.png"],
      description: faker.lorem.sentence(),
    },
  ];

  return (
    <div className="flex flex-1 flex-col justify-center  bg-myTheme-light dark:bg-myTheme-dark dark:text-myTheme-light">
      <div className="flex flex-1 flex-row">
        <HeroSection />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <QuickTabs />
        <div className="flex flex-col mt-4 flex-1">
          <div className="flex flex-col justify-center">
            {/* this is the top reviews container*/}
            <div className="w-full flex flex-row px-2 sm:px-0">
              <TopReviews
                reviews={reviews}
                products={products}
                users={users}
                comments={comments}
              />
            </div>
            {/* business of the day */}
            <div className="flex flex-col justify-center w-full mt-4 mb-4">
              <div className="flex justify-center items-center text-md mx-4">Business of the day goes here</div>
            </div>
            {/* <Token /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
