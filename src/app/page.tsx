import QuickTabs from "./components/QuickTabs";
import TopReviews from "./components/TopReviews";
import HeroSection from "./components/HeroSection";
import ReviewCategories from "./components/CompanyCategories";
import ManageYourBusiness from "./components/ManageYourBusiness";
import InstallPwa from "./components/InstallPwa";
import BenefitsSection from "./components/BenefitsSection";
export default function Home() {
  return (
    <div className=" flex h-full w-full flex-col justify-start bg-myTheme-lightbg ">
      <div className="flex flex-row">
        <HeroSection />
      </div>
      <div className="flex w-full flex-col justify-center ">
        <QuickTabs />
        <div className="flex w-full h-full flex-row flex-wrap sm:px-4 px-4 md:px-2 pb-4 space-y-2 ">
          <TopReviews />
        </div>
        <div className="mt-4 flex w-full flex-row flex-wrap pb-4 space-y-2 ">
          <InstallPwa />
        </div>
        <div className=" flex w-full flex-col">
          <div className="flex flex-col justify-center">
            <div className=" flex w-full">
              <ReviewCategories />
            </div>
            <div className="mb-4 mt-4 flex w-full justify-center">
              <ManageYourBusiness />
            </div>
            <BenefitsSection />
          </div>
        </div>
      </div>
    </div>
  );
}
