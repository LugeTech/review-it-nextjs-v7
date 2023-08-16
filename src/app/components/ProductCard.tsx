"use client"
import { iProduct } from '@/app/util/Interfaces'; // Update with the actual path
import Image from 'next/image';
import RatingModule from './RatingModule';
import { useState } from 'react';
import Link from 'next/link';
import YesNoAlert from './YesNoAlert';

interface ProductCardProps {
  product: iProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [rating, setRating] = useState(0); // Initial value
  const [showModal, setShowModal] = useState(false);
  const ratingChanged = (newRating: number) => {
    setRating(newRating);
    setShowModal(true);
  };
  console.log(product.rating)
  return (
    <div className="flex flex-col w-full rounded-lg shadow-md p-4">
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <YesNoAlert message={`Write your own ${rating} star Review?`} />
        </div>
      )}
      <Link href={`/createreview/${product.id}`}>
        <div className="flex justify-start items-center gap-2">
          {product.images && product.images.length > 0 && (
            <div className="mb-4">
              <Image
                src={product.images[0]}
                alt={`${product.name} Image`}
                className=" rounded-lg"
                width={80}
                height={80}
              />
            </div>
          )}
          <div className="mb-4 flex flex-col gap-2">
            <h2 className="text-xl font-semibold ">{product.name}</h2>
            <RatingModule
              name={product.id!}
              rating={product.rating}
              ratingChanged={ratingChanged}
              size={"rating-sm"}
            />
            <p className="text-gray-500  text-xs md:text-base">ReviewIt Score: 3.9 | Reviews: 234</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center">
        {product.createdDate && (
          <p className="text-gray-400">
            {/* Created: {new Date(product.createdDate).toLocaleDateString()} */}
            Apple
          </p>
        )}
        {product.address && (
          <p className="text-gray-400">{product.address}</p>
        )}
        <Link href={'/products'} className="text-gray-400 underline">Latest Review</Link>
      </div>
    </div>
  );
};

export default ProductCard;
