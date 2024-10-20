"use client";
import { iUser } from "@/app/util/Interfaces";
import { getUser, getUserWithId } from "@/app/util/serverFunctions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "@clerk/nextjs";
import UserInfo from "@/app/components/UserInfo";
import { useState } from "react";

interface UserProfileComponentProps {
  userIdFromParams: string | undefined;
}

// Function to update user in the backend
async function updateUserInBackend(
  userId: string,
  updatedFields: Partial<iUser>,
): Promise<iUser> {
  const response = await fetch(`/api/update/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}

const UserProfileComponent: React.FC<UserProfileComponentProps> = ({
  userIdFromParams,
}) => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [updatedUser, setUpdatedUser] = useState<iUser | undefined>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userIdFromParams, auth.userId],
    queryFn: async () => {
      if (userIdFromParams === undefined) {
        return await getUser();
      } else {
        return await getUserWithId(userIdFromParams);
      }
    },
    refetchOnWindowFocus: false,
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedFields: Partial<iUser>) =>
      updateUserInBackend(userIdFromParams || auth.userId || "", updatedFields),
    onSuccess: (updatedUser) => {
      // Update the cache with the new user data
      queryClient.setQueryData(["user", userIdFromParams, auth.userId], {
        data: updatedUser,
      });
      setUpdatedUser(updatedUser);
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p>{error instanceof Error ? error.message : "An error occurred"}</p>
    );

  const user = data?.data as iUser | undefined;

  const handleUpdateUser = (updatedFields: Partial<iUser>) => {
    setUpdatedUser((prevUser) => {
      if (!prevUser) return { ...user, ...updatedFields } as iUser;
      return { ...prevUser, ...updatedFields } as iUser;
    });
    // Send the updates to the backend
    updateUserMutation.mutate(updatedFields);
  };

  if (!user) return <p>No user data available</p>;

  const isOwnAccount = !userIdFromParams || userIdFromParams === auth.userId;

  return (
    <div>
      <UserInfo
        user={updatedUser || user}
        onUpdateUser={handleUpdateUser}
        initialAvatar={user.avatar || ""}
        isEditable={isOwnAccount}
      />
      {updateUserMutation.isPending && <p>Updating user information...</p>}
      {updateUserMutation.isError && (
        <p>
          Error updating user:{" "}
          {updateUserMutation.error instanceof Error
            ? updateUserMutation.error.message
            : "Unknown error"}
        </p>
      )}
    </div>
  );
};

export default UserProfileComponent;
