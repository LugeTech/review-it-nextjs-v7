"use client"
import React, { useState, useEffect } from "react";
import { iProduct } from "../util/Interfaces";
import { resizeImage } from "../util/clientFunctions";
import { uploadImageToCloudinary } from "../util/uploadImageToCloudinary";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X } from "lucide-react";

const NewProductForm = (): JSX.Element => {
  const initialProduct: iProduct = {
    address: "",
    createdDate: new Date(),
    description: "",
    display_image:
      "https://res.cloudinary.com/dhglzlaqf/image/upload/v1688140420/myassets/placeholder_jpxutd.png",
    images: [],
    videos: [],
    links: [],
    name: "",
    tags: [],
    openingHrs: null,
    closingHrs: null,
    telephone: null,
    website: [],
    rating: 3,
    hasOwner: null,
    ownerId: null,
    createdById: "",
    isDeleted: false,
  };

  const [product, setProduct] = useState(initialProduct);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      const tagsArray = value.split(",").map(tag => tag.trim());
      setProduct({ ...product, [name]: tagsArray });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const mutations = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/create/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      return response.json();
    },
    onSuccess: () => router.push("/browse"),
    onError: (error: Error) => console.error(error),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerUploadImage = async (smallFile: string) => {
    setIsLoading(true);
    try {
      let res = await uploadImageToCloudinary(smallFile);
      setImageUrl(res.secure_url);
      setProduct({ ...product, display_image: res.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imagePreview) {
      resizeImage(imagePreview).then(() => triggerUploadImage(imagePreview));
    }
  }, [imagePreview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutations.mutate();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white  shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image</Label>
            <div className="relative border-2 border-dashed border-gray-300  rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input
                id="image-upload"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-10 h-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500 ">
                  {imagePreview ? "Change Image" : "Click to upload or drag and drop"}
                </p>
              </div>
            </div>
            {imagePreview && (
              <div className="mt-4 relative">
                <img src={imagePreview} alt="Preview" className="max-w-xs max-h-36 mx-auto rounded-lg" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 -mt-2 -mr-2"
                  onClick={() => setImagePreview(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product | Business Name</Label>
            <Input
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={product.address as string}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags | Categories</Label>
            <Input
              id="tags"
              name="tags"
              value={product.tags.join(', ')}
              onChange={handleChange}
              placeholder="Separate with commas"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          <div className="pt-4">
            {imageUrl ? (
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Create Product"}
              </Button>
            ) : (
              <Alert>
                <AlertDescription>
                  Add an image to get started...
                </AlertDescription>
              </Alert>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewProductForm;
