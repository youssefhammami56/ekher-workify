// "use client";
// import { addPostInCommunity } from "@/actions/community/add-post-incomunity";
// import { Input } from "@/components/ui/input";
// import { Send } from "lucide-react";
// import React, { useEffect } from "react";
// import { CommunityUploadImage } from "./comunity-upload-image";
// import { replyInPost } from "@/actions/community/reply-in-post";
// import { MdAttachFile } from "react-icons/md";

// interface CommunityMessageInputProps {
//   communityId: string;
//   posttoreply?: string | null;
//   onclicke?: () => void;
// }

// export default function CommunityMessageInput({
//   communityId,
//   posttoreply,
//   onclicke,
// }: CommunityMessageInputProps) {
//   const [message, setMessage] = React.useState("");
//   const [imageUrl, setImageUrl] = React.useState<string | null>(null);
//   const [isImage, setIsImage] = React.useState<boolean>(false);
//   if (imageUrl) {
//     setIsImage(true);
//     console.log("image url", imageUrl);
//   }


//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setMessage(e.target.value);
//   // };
//   // const handelAddPost = async (message: string, communityId: string) => {
//   //   await addPostInCommunity(communityId, message, isImage, imageUrl!);
//   //   setMessage("");
//   // };
//   // const handelreply = async (message: string, posttoreply: string) => {
//   //   await replyInPost(communityId,posttoreply, message);
//   //   onclicke!();
//   //   setMessage("");
//   // };
//   return (
//     <div className="mt-2 bg-gray-100 p-2 text-center  text-gray-700">
//       <div className="flex items-center justify-between gap-x-2">
//         <CommunityUploadImage
//           communityId={communityId}
//           onchange={(url) => setImageUrl(url)}
//         />
        
//         <MdAttachFile size={24} className="text-blue-500 cursor-pointer" />
//         {/* <Input
//           placeholder={posttoreply ? "Reply to this post" : "Write a post"}
//           className="w-full p-4 rounded-lg bg-white"
//           type="text"
//           name="message"
//           value={message}
//           onChange={handleChange}
//         />
//         <Send
//           size={24}
//           className="text-blue-500 cursor-pointer"
//           onClick={() =>
//             posttoreply
//               ? handelreply(message, posttoreply)
//               : handelAddPost(message, communityId)
//           }
//         /> */}
//       </div>
//     </div>
//   );
// }
