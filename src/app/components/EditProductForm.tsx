"use client";
import React, { useState, useRef, useEffect } from "react";
import { iProduct } from "../util/Interfaces";
import { resizeImage } from "../util/clientFunctions";
import { uploadImageToCloudinary } from "../util/uploadImageToCloudinary";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Trash2, Plus } from "lucide-react";
import SmartTags from "@/app/components/SmartTags";

interface EditProductFormProps {
  initialProduct: iProduct;
}

export default function EditProductForm({
  initialProduct,
}: EditProductFormProps) {
  const [product, setProduct] = useState<iProduct>(initialProduct);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialProduct.display_image,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  console.log("this is the product", initialProduct);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleArrayInput = (field: keyof iProduct, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value],
    }));
  };

  const handleRemoveArrayItem = (field: keyof iProduct, index: number) => {
    setProduct((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const mutations = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/update/product/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      return response.json();
    },
    onSuccess: (data) => {
      const encodedProduct = encodeURIComponent(JSON.stringify(data));
      router.push(`/mybusinesses/productsuccess?product=${encodedProduct}`);
    },
    onError: (error: Error) => console.error(error),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUploadImage = async (smallFile: string) => {
    setIsImageUploading(true);
    setIsLoading(true);
    try {
      let res = await uploadImageToCloudinary(smallFile);
      setProduct({ ...product, display_image: res.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
      setIsImageUploading(false);
    }
  };

  useEffect(() => {
    if (imagePreview && imagePreview !== initialProduct.display_image) {
      resizeImage(imagePreview).then(() => triggerUploadImage(imagePreview));
    }
  }, [imagePreview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isImageUploading) {
      alert("Please wait for the image to finish uploading before submitting.");
      return;
    }
    mutations.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="display_image">Display Image</Label>
          <div className="mt-2 flex items-center space-x-4">
            <div
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer relative"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Display"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {isImageUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <span className="text-white">Uploading...</span>
                    </div>
                  )}
                </>
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Repeat the following structure for images, videos, links, website */}
        <div>
          <Label>Images</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Image URL"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleArrayInput("images", e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleArrayInput("images", "")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {product.images?.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={image} readOnly />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveArrayItem("images", index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Repeat similar structures for videos, links, and website */}

        <div>
          <Label>Categories</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter a category"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim();
                  if (value) {
                    handleArrayInput("tags", value);
                    e.currentTarget.value = "";
                  }
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const input = document.querySelector(
                  'input[placeholder="Enter a category"]',
                ) as HTMLInputElement;
                const value = input.value.trim();
                if (value) {
                  handleArrayInput("tags", value);
                  input.value = "";
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap md:gap-2 gap-4 mt-2">
            <SmartTags
              description={product.description}
              handleArrayInput={handleArrayInput}
              handleRemoveArrayItem={handleRemoveArrayItem}
              field="tags"
            />
          </div>
          <div className="mt-2 flex flex-wrap md:gap-2 gap-4">
            {product.tags?.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 rounded-full px-3 py-1"
              >
                <span>{tag}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-2"
                  onClick={() => handleRemoveArrayItem("tags", index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="openingHrs">Opening Hours</Label>
            <Input
              id="openingHrs"
              name="openingHrs"
              type="time"
              value={product.openingHrs || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="closingHrs">Closing Hours</Label>
            <Input
              id="closingHrs"
              name="closingHrs"
              type="time"
              value={product.closingHrs || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="telephone">Telephone</Label>
          <Input
            id="telephone"
            name="telephone"
            type="tel"
            value={product.telephone || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={product.email || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            value={product.address || ""}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-myTheme-primary"
          disabled={isLoading || isImageUploading}
        >
          {isImageUploading
            ? "Uploading Image..."
            : isLoading
              ? "Processing..."
              : "Update Product"}
        </Button>
      </div>
    </form>
  );
}
