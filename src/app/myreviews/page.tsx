
'use client'
import { iProduct, iUser } from '@/app/util/Interfaces';
import { getUser } from "@/app/util/serverFunctions"; import { useQuery, } from
  "@tanstack/react-query"; import LoadingSpinner from
  '../components/LoadingSpinner'; import UserInfo from '../components/UserInfo';
const Page = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser("6507ad644e3af1122502e83d"),
    refetchOnWindowFocus: false,
  }) as any

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const user: iUser | undefined = data?.data as iUser
  console.log(user)

  return (
    <div className='flex flex-col w-full p-2 md:px-28 sm:pt-8 bg-myTheme-light'>
      <UserInfo user={user} />      {/* <Token /> */}
    </div>
  )
}
export default Page
