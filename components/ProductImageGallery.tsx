"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImage = {
  imageUrl: string;
  altText: string | null;
};

type ProductImageGalleryProps = {
  images: ProductImage[];
};

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images[0]?.imageUrl || "/placeholder.png"
  );

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-white">
        <Image
          src={selectedImage}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image.imageUrl)}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${
                selectedImage === image.imageUrl
                  ? "border-[#16301F]"
                  : "border-gray-200"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}