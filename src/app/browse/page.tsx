'use client'
// on here you will be able to browse all data tables based on how you filter them
// businesses, services, products, etc
import { iProduct } from '@/app/util/Interfaces';
import { getProducts } from "@/app/util/serverFunctions";
import { useQuery, } from "@tanstack/react-query";
import ArrangeByPanel from '../components/ArrangeByPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import Token from '../components/Token';

const Page = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
  }) as any
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const products = data?.data as iProduct[]

  const productCardOptions = {
    showLatestReview: true,
    size: 'rating-md',
    showWriteReview: true,
    showClaimThisProduct: true
  }

  return (
    <div className='flex flex-col w-full p-2 md:px-28 sm:pt-8 bg-myTheme-light'>
      <div className='flex flex-col w-full lg:flex-row justify-evenly items-center gap-2'>

        <div className='flex flex-col  h-full w-full lg:w-1/4 justify-start items-center gap-2 '>
          <ArrangeByPanel />
        </div>
        <div className='flex flex-col lg:w-1/2 justify- items-center gap-2 bg-myTheme-base-100 rounded-lg'>
          {products.map((product: iProduct) => {
            return (
              <ProductCard options={productCardOptions} product={product} key={product.id} />
            )
          })}
        </div>

        {/* <div className='flex flex-col justify-center items-center gap-2'> */}
        {/*   <h2 className='text-2xl font-bold'>Some other stuff</h2> */}
        {/*   <h2 className='text-sm '>maybe ads or sponsored things</h2> */}
        {/* </div> */}
      </div>
      <Token />
    </div>
  )
}

export default Page
