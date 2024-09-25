"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { iProduct } from "@/app/util/Interfaces";
import { getProducts } from "@/app/util/serverFunctions";
import ArrangeByPanel from "@/app/components/ArrangeByPanel";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ProductCard from "@/app/components/ProductCard";
import { allProductsAtom } from "@/app/store/store";
import { iCalculatedRating } from "@/app/util/Interfaces";
import { calculateAverageReviewRating } from "@/app/util/calculateAverageReviewRating";
import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const searchParams = useSearchParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
  }) as any;

  const [_, setCurrentProduct] = useAtom(allProductsAtom);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { userId } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (data?.data) setCurrentProduct(data.data);

    // Handle query params
    const ratingParam = searchParams.get("rating");
    const tagsParam = searchParams.get("tags");
    const searchParam = searchParams.get("search");

    if (ratingParam) {
      setSelectedRating(Number(ratingParam));
    }
    if (tagsParam) {
      setSelectedTags(tagsParam.split(","));
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [data?.data, setCurrentProduct, searchParams]);

  if (isLoading) {
    return (
      <div className="flex h-full">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) return <p>{error?.toString()}</p>;

  const products: iProduct[] | undefined = data?.data as iProduct[];

  const filteredProducts = products.filter((product) => {
    if (product.reviews !== undefined) {
      const rating = calculateAverageReviewRating(
        product.reviews,
      ) as unknown as iCalculatedRating;

      const matchesRating =
        !selectedRating || rating.roundedRating === selectedRating;
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => product.tags.includes(tag));
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesRating && matchesTags && matchesSearch;
    }
    return false;
  });

  const productCardOptions = {
    showLatestReview: true,
    size: "rating-lg",
    showWriteReview: true,
    showClaimThisProduct: true,
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col w-full h-full p-2 sm:pt-8 bg-myTheme-lightbg">
      <div className="flex flex-col w-full lg:flex-row justify-evenly items-center gap-2">
        <div className="flex break-words flex-col h-full w-full lg:w-1/4 justify-start items-center gap-2">
          <ArrangeByPanel
            products={products}
            setSelectedRating={setSelectedRating}
            selectedRating={selectedRating}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            filteredProductsLength={filteredProducts.length}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 items-center gap-2 rounded-lg sm:px-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 border rounded"
          />
          {currentItems.length > 0 ? (
            currentItems.map((product: iProduct) => (
              <ProductCard
                options={productCardOptions}
                reviews={null}
                product={product}
                key={product.id}
                currentUserId={userId ? userId : null}
              />
            ))
          ) : (
            <p>No products match the selected filters.</p>
          )}
          <div className="flex flex-wrap justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`m-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
