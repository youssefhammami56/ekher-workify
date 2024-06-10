"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { MdAttachment } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UploadImagewithcloudinar from "@/app/(sellerr)/_componenets/UploadImagewithcloudinar";
import UploadImagewithcloudinarincomunity from "./comunity-upload-image copy";
import { addPostInCommunity } from "@/actions/addPostInCommunity copy";

interface MessageProps {
  communityId: string;
}

export default function Message({ communityId }: MessageProps) {
  const [image, setImage] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState("");
  const [imagesrc, setImagesrc] = React.useState<string | null>(null);
  const handelAddPost = async (
    message: string,
    communityId: string,
    image: string | null
  ) => {
    await addPostInCommunity(communityId, message, imagesrc);
    setMessage("");
  };
  console.log(image);
  return (
    <div className="mt-2 bg-gray-100 p-2 text-center  text-gray-700">
      <div className="flex items-center justify-between gap-x-2 max-h-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <UploadImagewithcloudinarincomunity
                value={imagesrc}
                onchange={(url) => {
                  setImagesrc(url); // Set the value of imagesrc
                  // @ts-ignore
                  // Push the url into tabofimages
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-gray-600 dark:text-gray-300">Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Input
          placeholder="Write a message"
          className="w-full p-4 rounded-lg bg-white"
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Send
          size={24}
          className="text-blue-500 cursor-pointer"
          onClick={() => handelAddPost(message, communityId, imagesrc)}
        />
      </div>
    </div>
  );
}
