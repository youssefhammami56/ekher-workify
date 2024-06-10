import { getGigsByFilter } from "@/actions/get-gigs-byfilter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";

interface SearchGridItemProps {
  gig: Awaited<ReturnType<typeof getGigsByFilter>>[0];
  key: string;
}

function SearchGridItem({ gig, key }: SearchGridItemProps) {
  const router = useRouter();
  return (
    <div
      className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8 "
      onClick={() => router.push(`/gig/${gig.id}`)}
    >
      <div className="relative w-64 h-40">
        <Image src={gig.images[0]} alt="gig" fill className="rounded-xl" />
      </div>
      <div className="flex items-center gap-2">
        <div>
          {gig.createdBy.profileImage ? (
            <Image
              src={gig.createdBy.profileImage}
              alt="profile"
              height={30}
              width={30}
              className="rounded-full"
            />
          ) : (
            <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
              <span className="text-lg text-white">
                {gig.createdBy.email[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-md ">
          <strong className="font-medium">{gig.createdBy.username}</strong>
        </span>
      </div>
      <div>
        <p className="line-clamp-2 text-[#404145]">{gig.title}</p>
      </div>
      <div className="flex items-center gap-1 text-yellow-400">
        <FaStar />
        <span>
          <strong className="font-medium">
            {/* @ts-ignore */}
            {gig.Reviews.reduce((acc, review) => acc + review.rating, 0) /
              gig.Reviews.length}
          </strong>
        </span>
        <span className="text-[#74767e]">({gig.Reviews.length})</span>
      </div>
      <div>
        <strong className="font-medium">From {gig.price}(TND)</strong>
      </div>
    </div>
  );
}

export default SearchGridItem;
