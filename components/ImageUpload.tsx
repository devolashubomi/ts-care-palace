"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  defaultValue?: string;
};

export default function ImageUpload({
  defaultValue = "",
}: Props) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setUploading(false);

    if (!response.ok) {
      alert(data.error || "Upload failed.");
      return;
    }

    setImageUrl(data.url);
  }

  return (
    <div className="space-y-4">
      <input
        type="hidden"
        name="imageUrl"
        value={imageUrl}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full rounded-lg border p-3"
      />

      {uploading && (
        <p className="text-blue-600">
          Uploading image...
        </p>
      )}

      {imageUrl && (
        <div className="relative h-64 w-64 overflow-hidden rounded-xl border">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-cover"
            sizes="256px"
          />
        </div>
      )}
    </div>
  );
}