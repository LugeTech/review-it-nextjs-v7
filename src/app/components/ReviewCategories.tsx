import React from 'react';
import Link from 'next/link';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface Category {
  count: number;
  name: string;
}

const categories: Category[] = [
  { count: 543, name: "Cars, motorbikes & accessories" },
  { count: 32, name: "Clothing" },
  { count: 213, name: "Floristry" },
  { count: 54, name: "Books" },
  { count: 225, name: "Office & business" },
  { count: 432, name: "Computers & electronics" },
  { count: 65, name: "Consulting" },
];

const CompanyCategories: React.FC = () => {
  return (
    <div className=" text-myTheme-dark dark:bg-myTheme-dark w-full">
      <div className="container mx-auto py-16 px-4">
        <div className="bg-white text-center mb-2">
          <h2 className="text-3xl font-bold mb-2">Company categories</h2>
          <p className="text-gray-800">Click on what interests you</p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="flex flex-wrap -mx-2">
              {categories.map((category, index) => (
                <div key={index} className="w-full sm:w-1/2 px-2 mb-4">
                  <Link
                    href="#"
                    className="flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm group"
                  >
                    <div className="flex items-center">
                      <span className="font-bold mr-2 text-blue-600">{category.count}</span>
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                    <FaArrowUpRightFromSquare className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200" size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCategories;
