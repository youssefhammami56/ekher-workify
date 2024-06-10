"use client";
import { getGigsByFilter } from "@/actions/get-gigs-byfilter";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";
import { array } from "zod";

interface SearchGridItemProps {
  gig: Awaited<ReturnType<typeof getGigsByFilter>>[0];
  key: string;
}

function SearchGridItem({ gig, key }: SearchGridItemProps) {
  const router = useRouter();
  const averageRating =
  //@ts-ignore
    gig.Reviews.reduce((acc, review) => acc + review.rating, 0) /
    gig.Reviews.length;

  return (
    // <div
    //   className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8 "
    //   onClick={() => router.push(`/gig/${gig.id}`)}
    // >
    //   <div className="relative w-64 h-40">
    //     <Image src={gig.images[0]} alt="gig" fill className="rounded-xl" />
    //   </div>
    //   <div className="flex items-center gap-2">
    //     <div>
    //       {gig.createdBy.profileImage ? (
    //         <Image
    //           src={gig.createdBy.profileImage}
    //           alt="profile"
    //           height={30}
    //           width={30}
    //           className="rounded-full"
    //         />
    //       ) : (
    //         <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
    //           <span className="text-lg text-white">
    //             {gig.createdBy.email[0].toUpperCase()}
    //           </span>
    //         </div>
    //       )}
    //     </div>
    //     <span className="text-md ">
    //       <strong className="font-medium">{gig.createdBy.username}</strong>
    //     </span>
    //   </div>
    //   <div>
    //     <p className="line-clamp-2 text-[#404145]">{gig.title}</p>
    //   </div>
    //   <div className="flex items-center gap-1 text-yellow-400">
    //     <FaStar />
    //     <span>
    //       <strong className="font-medium">
    //         {gig.Reviews.reduce((acc, review) => acc + review.rating, 0) /
    //           gig.Reviews.length}
    //       </strong>
    //     </span>
    //     <span className="text-[#74767e]">({gig.Reviews.length})</span>
    //   </div>
    //   <div>
    //     <strong className="font-medium">From ${gig.price}</strong>
    //   </div>
    // </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950 m-4">
      <img
        alt="Service Image"
        className="w-full h-48 object-cover"
        height={250}
        src={gig.images[0] ?? ""}
        style={{
          aspectRatio: "400/250",
          objectFit: "cover",
        }}
        width={400}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{gig.title}</h3>
        <div className="flex items-center mb-2">
           {/* @ts-ignore */}
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5  ${
                i < averageRating ? "fill-yellow-300" : "text-gray-300"
              }`}
            />
          ))}

          <span className="ml-2 text-gray-500 dark:text-gray-400">
            {gig.Reviews.length} reviews
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">{gig.price}(TND)/Day</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Created {format(new Date(gig.createdAt), "dd/MM/yyyy")}
          </span>
        </div>
        <Button
          className="mt-4 bg-blue-400 text-white hover:bg-blue-500"
          variant="link"
          onClick={() => router.push(`/gig/${gig.id}`)}
        >
          Read More
        </Button>
      </div>
    </div>
  );
}

export default SearchGridItem;
