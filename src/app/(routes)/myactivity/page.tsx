"use client";
import { iProduct, iUser } from "@/app/util/Interfaces";
import { getUser } from "@/app/util/serverFunctions";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import UserInfo from "@/app/components/UserInfo";
import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const auth = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", auth.userId],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  }) as any;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const user: iUser | undefined = data?.data as iUser;

  return (
    <div className="flex flex-col w-full p-2 md:px-28 sm:pt-8 bg-myTheme-lightbg dark:bg-myTheme-niceBlack">
      <UserInfo user={user} />
    </div>
  );
};
export default Page;
