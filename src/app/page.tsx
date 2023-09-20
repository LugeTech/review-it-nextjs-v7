import { iReview, iUser, iComment, iProduct } from "./util/Interfaces";
import QuickTabs from "./components/QuickTabs";
import TopReviews from "./components/TopReviews";
import HeroSection from "./components/HeroSection";
import Token from "./components/Token";

export const revalidate = 30;

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center  bg-myTheme-light dark:bg-myTheme-dark dark:text-myTheme-light">
      <div className="flex flex-row">
        <HeroSection />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <QuickTabs />
        <div className="flex flex-col mt-4 flex-1">
          <div className="flex flex-col justify-center">
            {/* this is the top reviews container*/}
            <div className="w-full flex flex-row px-2 sm:px-0">
              <TopReviews />
            </div>
            {/* business of the day */}
            <div className="flex flex-col justify-center w-full mt-4 mb-4">
              <div className="flex justify-center items-center text-md mx-4">Business of the day goes here</div>
            </div>
            <Token />
          </div>
        </div>
      </div>
    </div>
  );
}
