// "use client";
// import { Input } from "@/components/ui/input";
// import { Search, Send } from "lucide-react";
// import React from "react";
// import { searchProblemInCommunity } from "@/actions/community/search-problem-in-community";

// export default function CommunitySearchProblem() {
//   const [message, setMessage] = React.useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
//   };

//   const searchProblem = async (message: string) => {
//     await searchProblemInCommunity(message);
//     setMessage("");
//   };

//   return (
//     <div className="mt-2 bg-gray-100 p-2 text-center text-sm  text-gray-700">
//       <div className="flex items-center justify-between gap-x-2">
//         <Search size={24} className="h-6 w-6 text-blue-400" />
//         <Input
//           placeholder="Search for a problem please be specific"
//           className="w-full p-4 rounded-lg bg-white"
//           type="text"
//           name="message"
//           value={message}
//           onChange={handleChange}
//         />
//         <Send
//           size={24}
//           className="text-blue-500 cursor-pointer"
//           onClick={() => searchProblem(message)}
//         />
//       </div>
//     </div>
//   );
// }
