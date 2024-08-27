"use client";
import QuickTabs from "./components/QuickTabs";
import TopReviews from "./components/TopReviews";
import HeroSection from "./components/HeroSection";
import ReviewCategories from "./components/ReviewCategories";
import ManageYourBusiness from "./components/ManageYourBusiness";
// import Token from "./components/Token";
export default async function Home() {
  return (
    <div className=" flex h-full flex-col justify-start bg-myTheme-lightbg ">
      <div className="flex flex-row">
        <HeroSection />
      </div>
      <div className="flex flex-col justify-center ">
        <QuickTabs />
        <div className="flex w-full h-full flex-row flex-wrap sm:px-4 px-4 md:px-2 pb-4 space-y-2 ">
          <TopReviews />
        </div>
        <div className="mt-4 flex flex-1 flex-col">
          <div className="flex flex-col justify-center">
            <div className="mb-4 mt-4 flex w-full justify-center">
              <ManageYourBusiness />
            </div>
            {/* this is the top reviews container*/}
            <div className="mt-2 flex w-full">
              <ReviewCategories />
            </div>
            {/* <Token /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
