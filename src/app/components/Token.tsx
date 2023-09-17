"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Token() {
  const [jwtToken, setJwtToken] = useState<String>();
  const { getToken } = useAuth();
  const run = async () => {
    const token = await getToken({ template: "4000" });
    // token && setJwtToken(token);
    console.log(token);
  };
  useEffect(() => {
    run();
  });


  return (
    <div className=" w-screen h-full flex flex-col justify-center items-center">
      {/* <p>token in console </p> */}
    </div>
  );
}
