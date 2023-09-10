'use client';
import { iProduct } from '@/app/util/Interfaces';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../util/serverFunctions';
import { useAtom } from "jotai";
import { allProductsStore } from "@/app/store/store";

const ProductListLoader = () => {
  console.log('started product list loader');
  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState<iProduct[]>([]);
  const [allProducts, setAllProducts] = useAtom(allProductsStore);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => getProducts(),
    refetchOnWindowFocus: false,
  }) as any

  if (isLoading) {
    return < div > Loading...</div >;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  const products = data?.data as iProduct[];
  setAllProducts(products);
  console.log('ended product list loader');
  // onDataLoaded(data);
  // Render the actual data or pass it to the parent component
  return (
    <>
      {/* Render or process data as needed */}
    </>
  );
};

export default ProductListLoader;
