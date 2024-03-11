'use client';
import React, { useState, useEffect } from 'react';
import { iProduct } from '../util/Interfaces';
import { resizeImage } from '../util/clientFunctions';
import { uploadImageToCloudinary } from '../util/uploadImageToCloudinary';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'

const NewProductForm = (): JSX.Element => {
  const initialProduct: iProduct = {
    address: '',
    createdDate: new Date(),
    description: '',
    display_image: 'https://res.cloudinary.com/dhglzlaqf/image/upload/v1688140420/myassets/placeholder_jpxutd.png',
    images: [],
    videos: [],
    links: [],
    name: '',
    tags: [],
    openingHrs: null,
    closingHrs: null,
    telephone: null,
    website: [],
    rating: 3,
    hasOwner: null,
    ownerId: null,
    createdById: '',
    isDeleted: false,
  };

  const [product, setProduct] = useState(initialProduct);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [productImage, setProductImage] = useState<string | null>(null); //This is the smaller image
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;


    if (name === "tags") {
      // Split the input value by commasand trim whitespace
      const tagsArray = value.split(',');
      setProduct({
        ...product,
        [name]: tagsArray, // Update tags as an array
      });
    }
    else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const mutations = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/create/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      // console.log('this is success and here is the data', data);
      router.push('/browse');
    },
    onError: (error: Error) => {
      console.error(error);
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const triggerUploadImage = async (smallFile: string) => {
    // if (!productImage) return;
    let res = await uploadImageToCloudinary(smallFile);
    setImageUrl(res.secure_url as string); // keep this to only acctivate the submit button aafter the image has been uploded
    setProduct({
      ...product,
      display_image: res.secure_url
    })
  }

  useEffect(() => {
    if (imagePreview !== null) {
      const run = async () => {
        let resizedImage = await resizeImage(imagePreview as unknown as string);
        return resizedImage as string;
      };
      run().then((smallFile) => {
        triggerUploadImage(smallFile);
      });
    }
  }, [imagePreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutations.mutate();
    // send user to /browse

  };

  return (
    <div className="p-6 shadow-md rounded-lg flex flex-col w-full sm:px-2 lg:w-1/2 items-center bg-myTheme-light dark:bg-myTheme-dark ">
      <h2 className="text-2xl font-semibold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className='flex flex-col w-full h-full rounded-md bg-white dark:bg-myTheme-dark'>
        <div className="mb-4">
          <label className="block text-gray-600">Upload Image</label>
          <div className="relative border rounded border-gray-300 overflow-hidden flex items-center justify-center">
            <input
              type="file"
              name="display_image"
              onChange={handleImageChange}
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer bg-red-200 flex"
            />
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-500">
                {imagePreview ? 'Change' : 'Choose Image'}
              </span>
            </div>
          </div>

          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs max-h-36 mx-auto"
              />
            </div>
          )}
          <div className="mt-2 text-center text-sm">
            {imagePreview && (
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="text-red-500"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Product Name and Description fields (same as before) */}
        <div className="mb-4">
          <label className="block text-gray-600">Product | Business Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={product.address as string}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Tags | Cathegories</label>
          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Seperate with commas"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        {/* ... */}
        {/* Add more fields here */}
        <div className="mt-4">
          {imageUrl ? <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Product
          </button> : <p>Add Image to get started...</p>}
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
