import QuickTabs from "./components/QuickTabs";
import TopReviews from "./components/TopReviews";
import HeroSection from "./components/HeroSection";
// import Token from "./components/Token";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center  bg-myTheme-lightbg dark:bg-myTheme-dark dark:text-myTheme-light">
      <div className="flex flex-row">
        <HeroSection />
      </div>
      <div className="flex flex-col justify-center">
        <QuickTabs />
        <div className="mt-4 flex flex-1 flex-col">
          <div className="flex flex-col justify-center">
            {/* this is the top reviews container*/}
            <div className="flex w-full flex-row px-2 sm:px-0">
              <TopReviews />
            </div>
            {/* business of the day */}
            <div className="mb-4 mt-4 flex w-full flex-col justify-center">
              <div className="text-md mx-4 flex items-center justify-center">
                Business of the day goes here
              </div>
            </div>
            {/* <Token /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
