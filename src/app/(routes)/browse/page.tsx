"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { iProduct } from "@/app/util/Interfaces";
import { getProducts } from "@/app/util/serverFunctions";
import ArrangeByPanel from "@/app/components/ArrangeByPanel";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ProductCard from "@/app/components/ProductCard";
import { allProductsAtom } from "@/app/store/store";
import { iCalculatedRating } from "@/app/util/Interfaces";
import { calculateAverageReviewRating } from "@/app/util/calculateAverageReviewRating";

const Page = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
  }) as any;

  const [_, setCurrentProduct] = useAtom(allProductsAtom);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (data?.data) setCurrentProduct(data.data);
  }, [data?.data, setCurrentProduct]);

  if (isLoading)
    return (
      <div className="flex h-full">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <p>{error?.toString()}</p>;

  const products: iProduct[] | undefined = data?.data as iProduct[];
  console.log(products);

  const filteredProducts = products.filter((product) => {
    if (product.reviews !== undefined) {
      const rating = calculateAverageReviewRating(
        product.reviews,
      ) as unknown as iCalculatedRating;
      if (selectedRating && rating.roundedRating !== selectedRating) {
        return false;
      }
      if (
        selectedTags.length > 0 &&
        !selectedTags.some((tag) => product.tags.includes(tag))
      )
        return false;
      return true;
    }
  });

  const productCardOptions = {
    showLatestReview: true,
    size: "rating-sm",
    showWriteReview: true,
    showClaimThisProduct: true,
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
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 items-center gap-2 rounded-lg sm:px-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: iProduct) => (
              <ProductCard
                options={productCardOptions}
                reviews={null}
                product={product}
                key={product.id}
              />
            ))
          ) : (
            <p>No products match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
