import { iProduct } from '@/app/util/Interfaces'; // Update with the actual path
import Image from 'next/image';

interface ProductCardProps {
  product: iProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col w-full rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center gap-2">
        {product.images && product.images.length > 0 && (
          <div className="mb-4">
            <Image
              src={product.images[0]}
              alt={`${product.name} Image`}
              className=" rounded-lg"
              width={50}
              height={50}
            />
          </div>
        )}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        {product.createdDate && (
          <p className="text-gray-400">
            Created: {new Date(product.createdDate).toLocaleDateString()}
          </p>
        )}
        {product.address && (
          <p className="text-gray-400">{product.address}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
