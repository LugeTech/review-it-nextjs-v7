
'use client'
import { iProduct, iUser } from '@/app/util/Interfaces';
import { getUser } from "@/app/util/serverFunctions";
import { useQuery, } from "@tanstack/react-query";
import LoadingSpinner from '../components/LoadingSpinner';
import UserInfo from '../components/UserInfo';
import { useAuth } from "@clerk/nextjs";
import { MyActivity } from '@/components/my-activity';

const Page = () => {
  const auth = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", auth.userId],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  }) as any

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const user: iUser | undefined = data?.data as iUser

  return (
    <div className='flex flex-col w-full p-2 md:px-28 sm:pt-8 bg-myTheme-lightbg dark:bg-myTheme-niceBlack'>
      <MyActivity user={user} />

      {/* <UserInfo user={user} />      {/* <Token /> */}
    </div>
  )
}
export default Page
