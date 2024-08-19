import React, { useState } from 'react';
import Image from "next/legacy/image";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer"
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-white text-3xl z-10"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="w-full h-full relative">
              <Image
                src={selectedImage}
                alt="Enlarged image"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
