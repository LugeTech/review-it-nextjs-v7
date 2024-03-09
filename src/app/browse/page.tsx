'use client'
// on here you will be able to browse all data tables based on how you filter them
// businesses, services, products, etc
import { iProduct } from '@/app/util/Interfaces';
import { getProducts } from "@/app/util/serverFunctions";
import { useQuery, } from "@tanstack/react-query";
import ArrangeByPanel from '../components/ArrangeByPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
// import Token from '../components/Token';
import { useAtom } from 'jotai';
import { allProductsAtom } from '../store/store';
import { useEffect } from 'react';
// import FullProductCard from '@/components/full-pruduct-card';

const Page = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,

  }) as any

  const [_, setCurrentProduct] = useAtom(allProductsAtom);

  useEffect(() => {
    if (data?.data) setCurrentProduct(data.data);
  }, [data?.data, setCurrentProduct]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const products: iProduct[] | undefined = data?.data as iProduct[]



  const productCardOptions = {
    showLatestReview: true,
    size: 'rating-',
    showWriteReview: true,
    showClaimThisProduct: true
  }

  return (
    <div className='flex flex-col w-full h-full p-2  sm:pt-8 bg-myTheme-lightbg'>
      <div className='flex flex-col w-full lg:flex-row justify-evenly items-center gap-2'>

        <div className='flex flex-col  h-full w-full lg:w-1/4 justify-start items-center gap-2 '>
          <ArrangeByPanel />
        </div>
        <div className='flex flex-col w-full lg:w-1/2 justify- items-center gap-2 rounded-lg'>
          {products.map((product: iProduct) => {
            return (
              <ProductCard options={productCardOptions} reviews={null} product={product} key={product.id} />
            )
          })}
        </div>
      </div>
      {/* <Token /> */}
    </div>
  )
}
export default Page
