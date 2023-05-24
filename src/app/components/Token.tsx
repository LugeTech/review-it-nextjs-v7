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
    const data: any = await fetch("/api/getreviews", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    setData(await data.json());
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      <p>token: {JSON.stringify(jwtToken)} </p>
    </div>
  );
}
