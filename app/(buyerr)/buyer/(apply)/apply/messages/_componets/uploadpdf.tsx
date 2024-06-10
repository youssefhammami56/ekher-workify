"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { File, UploadCloud } from "lucide-react";
import Image from "next/image";
import { MdAttachment } from "react-icons/md";

declare global {
  var cloudinary: any;
}
interface ImageUploadProps {
  onchange: (url: string) => void;
  value: string | null;
}

const UploadPdfInmessage: React.FC<ImageUploadProps> = ({
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
        maxFiles: 1,
        resourceType: "raw",
      }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className="">
            <File size={24} className="text-blue-500 cursor-pointer" />
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadPdfInmessage;
