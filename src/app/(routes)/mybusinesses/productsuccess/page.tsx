"use client";

import {
  CheckCircleIcon,
  TagIcon,
  ClockIcon,
  PhoneIcon,
  GlobeIcon,
  MailIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { iProduct } from "@/app/util/Interfaces";
import { useCallback, useEffect, useState } from "react";

export default function ProductSuccess() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const [product, setProduct] = useState<iProduct | null>(null);

  const parseAndSetProduct = useCallback(() => {
    const productParam = searchParams.get("product");
    console.log(productParam);

    if (productParam) {
      try {
        const data = JSON.parse(decodeURIComponent(productParam));
        setProduct(data.data);
      } catch (error) {
        console.error("Error parsing product data:", error);
        setProduct(null);
      }
    } else {
      setProduct(null);
    }
  }, [searchParams]);

  useEffect(() => {
    parseAndSetProduct();
  }, [parseAndSetProduct]);

  console.log(product);

  if (!product) {
    return <div>No product data available</div>;
  }
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-green-700">
            Success!
          </CardTitle>
          <p className="text-xl text-gray-600 mt-2">
            Your product has been successfully added/updated.
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {product.name}
              </h2>
              <img
                src={product.display_image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags &&
                product.tags?.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    <TagIcon className="w-4 h-4 mr-1 inline-block" />
                    {tag}
                  </Badge>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>
                <ClockIcon className="w-4 h-4 inline-block mr-1" />{" "}
                {product.openingHrs} - {product.closingHrs}
              </p>
              <p>
                <PhoneIcon className="w-4 h-4 inline-block mr-1" />{" "}
                {product.telephone}
              </p>
              <p>
                <GlobeIcon className="w-4 h-4 inline-block mr-1" />{" "}
                {product.website?.length > 0
                  ? product.website[0]
                  : "No website provided"}
              </p>
              <p>
                <MailIcon className="w-4 h-4 inline-block mr-1" />{" "}
                {product.email}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link
            href={`/reviews?id=${product.id}`}
            className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-md transition-colors duration-300"
          >
            View Product
          </Link>
          <Link
            href={`/editproduct?pid=${product.id}`}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 rounded-md transition-colors duration-300"
          >
            Edit
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
