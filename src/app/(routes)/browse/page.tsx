"use client";
import { iProduct } from "@/app/util/Interfaces";
import { getProducts } from "@/app/util/serverFunctions";
import { useQuery } from "@tanstack/react-query";
import ArrangeByPanel from "@/app/components/ArrangeByPanel";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ProductCard from "@/app/components/ProductCard";
import { useAtom } from "jotai";
import { allProductsAtom } from "@/app/store/store";
import { useEffect } from "react";

const Page = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
  }) as any;

  const [_, setCurrentProduct] = useAtom(allProductsAtom);

  useEffect(() => {
    if (data?.data) setCurrentProduct(data.data);
  }, [data?.data, setCurrentProduct]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const products: iProduct[] | undefined = data?.data as iProduct[];

  const productCardOptions = {
    showLatestReview: true,
    size: "rating-sm",
    showWriteReview: true,
    showClaimThisProduct: true,
  };

  return (
    <div className="flex flex-col w-full h-screen p-2  sm:pt-8 bg-myTheme-lightbg dark:bg-myTheme-niceBlack">
      <div className="flex flex-col w-full lg:flex-row justify-evenly items-center gap-2">
        <div className="flex flex-col  h-full w-full lg:w-1/4 justify-start items-center gap-2 ">
          <ArrangeByPanel products={products} />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 items-center gap-2 rounded-lg sm:px-10">
          {products.map((product: iProduct) => {
            return (
              <ProductCard
                options={productCardOptions}
                reviews={null}
                product={product}
                key={product.id}
              />
            );
          })}
        </div>
      </div>
      {/* <Token /> */}
    </div>
  );
};
export default Page;
