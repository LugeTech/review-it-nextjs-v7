import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClerk, useUser, SignInButton } from "@clerk/nextjs";
import { LogOut, SquareUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "../util/serverFunctions";
import { iUser } from "../util/Interfaces";

const UserButtonComponent: React.FC = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [userInDb, setUserFromDb] = React.useState<iUser>();

  useEffect(() => {
    const getUserInDB = async () => {
      if (user) {
        const res = await getUser();
        setUserFromDb(res.data);
      }
    };
    getUserInDB();
  }, [user?.id]);

  if (!isLoaded) {
    return (
      <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  if (!isSignedIn) {
    return <SignInButton />;
  }

  const handleAccountClick = () => {
    router.push("/userprofile");
  };

  const handleLogoutClick = () => {
    signOut();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={userInDb?.avatar || user?.imageUrl || "/logo.png"}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAccountClick}>
          <SquareUserRound className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogoutClick}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButtonComponent;
