import React from "react";
import UserProfileComponent from "@/app/components/UserProfileComponent";
const UserProfile = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <UserProfileComponent userIdFromParams={params.id} />
    </div>
  );
};

export default UserProfile;
