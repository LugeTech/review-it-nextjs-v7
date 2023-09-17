import { auth, clerkClient } from "@clerk/nextjs";
import React from 'react'

const page = () => {

  const user = auth();
  console.log(user)


  return (
    <div>{user.userId}</div>
  )
}

export default page
