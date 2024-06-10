import React from "react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

declare global {
  var cloudinary: any;
}
interface ImageUploadProps {
  onchange: (url: string) => void;
  value: string;
}

const UploadImagewithcloudinar: React.FC<ImageUploadProps> = ({
  onchange,
  value,
}) => {
  const handleIpload = useCallback(
    (acceptedFiles: any) => {
      onchange(acceptedFiles.info.secure_url);
    },
    [onchange]
  );

  return (
    <CldUploadWidget
      onUpload={handleIpload}
      uploadPreset="zcrlg7r8"
      options={{
        maxFiles: 4,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
        relative
        cursor-pointer
        hover:opacity-50
        border-dashed
        border-2
        p-20
        border-neutral-200
        flex
        flex-col
        justify-center
        items-center
        gap-4
        text-neutral-400
        "
          >
            <UploadCloud size={48} />
            <div className="font-semibold text-neutral-500">
              Click to upload
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  alt="image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImagewithcloudinar;
