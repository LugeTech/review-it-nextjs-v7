import React from "react";
import MobileCategoryComponent from "@/app/components/ui-category/MobileCategoryComponent";
import CategoryCard from "@/app/components/ui-category/CategoryCard";
const page = () => {
  return (
    <div className="flex flex-col ">
      <div className="sm:hidden">
        <MobileCategoryComponent />
        <MobileCategoryComponent />
        <MobileCategoryComponent />
        <MobileCategoryComponent />
      </div>
      <div className="hidden max-w-7xl sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-8 justify-start mx-auto">
        <div className="w-60">
          <CategoryCard title="Computers" />
        </div>
        <div className="w-60">
          <CategoryCard title="Health Care" />
        </div>
        <div className="w-60">
          <CategoryCard title="Transportation" />
        </div>
        <div className="w-60">
          <CategoryCard title="Software" />
        </div>
        <div className="w-60">
          <CategoryCard title="Food and Beverages" />
        </div>
        <div className="w-60">
          <CategoryCard title="Fashion and Beauty" />
        </div>
        <div className="w-60">
          <CategoryCard title="Sports and Fitness" />
        </div>
        <div className="w-60">
          <CategoryCard title="Home and Living" />
        </div>
      </div>
    </div>
  );
};

export default page;
