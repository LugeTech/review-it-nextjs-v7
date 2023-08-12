'use client'
import { iProduct } from '@/app/util/Interfaces';
import { getProducts } from "@/app/util/serverFunctions";
import { useQuery, } from "@tanstack/react-query";
import ArrangeByPanel from '../components/ArrangeByPanel';
import ProductCard from '../components/ProductCard';
const Page = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  }) as any
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.toString()}</p>;
  const products = data?.data as iProduct[]
  console.log('this is the data returned', data.data)
  return (
    <div className='flex flex-col w-full p-2 sm:p-4'>
      <div className='flex flex-col w-full sm:flex-row justify-evenly items-center gap-2'>

        <div className='flex flex-col  h-full w-1/4 justify-start items-center gap-2 '>
          <ArrangeByPanel />
        </div>

        <div className='flex flex-col justify-between items-center gap-2'>
          {products.map((product: iProduct) => {
            console.log('this is the product', product)
            return (
              <ProductCard product={product} key={product.id} />
            )
          }
          )

          }
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          <h2 className='text-2xl font-bold'>Some other stuff</h2>
          <h2 className='text-sm '>maybe ads or sponsored things</h2>
        </div>
      </div>
    </div>
  )
}

export default Page
