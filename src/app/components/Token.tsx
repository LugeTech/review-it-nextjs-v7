"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Token() {
  const [data, setData] = useState();
  const [jwtToken, setJwtToken] = useState<String>();
  const { getToken } = useAuth();
  const run = async () => {
    const token = await getToken({ template: "4000" });
    token && setJwtToken(token);

  };

  useEffect(() => {
    run();
  }, []);
  console.log(jwtToken);

  return (
    <div className=" w-screen h-full flex flex-wrap justify-center items-center">
      <p>token in console </p>
    </div>
  );
}
