"use client";
import { iProduct, iUser } from "@/app/util/Interfaces";
import { getUser, getUserWithId } from "@/app/util/serverFunctions";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "@clerk/nextjs";
import UserInfo from "@/app/components/UserInfo";

const UserProfileComponent = (userId: {
  userIdFromParams: string | undefined;
}) => {
  const auth = useAuth(); //NOTE: Might need tyhis to redirect the unsigned if middleware don't handle

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userId.userIdFromParams, auth.userId],
    queryFn: async () => {
      if (userId.userIdFromParams === undefined) {
        return await getUser();
      } else {
        return await getUserWithId(userId.userIdFromParams);
      }
    },

    refetchOnWindowFocus: false, // NOTE: maybe this should be true for production
  }) as any;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const user: iUser | undefined = data?.data as iUser;

  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
};

export default UserProfileComponent;
