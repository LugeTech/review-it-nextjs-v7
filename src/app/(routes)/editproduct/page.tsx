"use client";
import EditProductForm from "@/app/components/EditProductForm";
import { iProduct } from "@/app/util/Interfaces";
import { useSearchParams } from "next/navigation";
import { getProduct } from "@/app/util/serverFunctions";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const page = () => {
  const user = useUser();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<iProduct | null>(null);
  const productId = searchParams.get("pid");

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const product = await getProduct(productId);
        // NOTE: will do my user/ownse check here before displaying product
        setProduct(product);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="flex flex-col w-full h-full p-2 sm:pt-8 bg-myTheme-lightbg  justify-start items-center">
      {product && <EditProductForm initialProduct={product} />}
    </div>
  );
};

export default page;
