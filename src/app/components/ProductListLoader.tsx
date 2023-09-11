'use client';
import { iProduct } from '@/app/util/Interfaces';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../util/serverFunctions';
import { useAtom } from "jotai";
import { allProductsStore } from "@/app/store/store";
import { useEffect } from 'react';

const ProductListLoader = () => {
  const [allProducts, setAllProducts] = useAtom(allProductsStore);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => getProducts(),
    refetchOnWindowFocus: false,
  }) as any;

  useEffect(() => {
    if (!isLoading && !isError) {
      const products = data?.data as iProduct[];
      setAllProducts(products);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading search engine...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {/* Render or process data as needed */}
    </>
  );
};
export default ProductListLoader;
