import React from "react";
import MobileCategoryComponent from "@/app/components/ui-category/MobileCategoryComponent";
const page = () => {
  return (
    <div className="flex flex-col ">
      category page
      <div className="sm:hidden">
        <MobileCategoryComponent />
        <MobileCategoryComponent />
        <MobileCategoryComponent />
        <MobileCategoryComponent />
      </div>
      <div>desktop</div>
    </div>
  );
};

export default page;
