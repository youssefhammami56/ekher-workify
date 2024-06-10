"use client";
import { useRouter } from "next/navigation";
import React from "react";
import SearchGridItem from "./SearchGridItem";
import { getGigsByFilter } from "@/actions/get-gigs-byfilter";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

interface SearchPageProps {
  gigs: Awaited<ReturnType<typeof getGigsByFilter>>;
  q?: string;
  category?: string;
}

function Singlesearchpage({ gigs, q, category }: SearchPageProps) {
  const router = useRouter();

  return (
    <>
      {gigs && (
        <div className="mx-24 mb-24 mt-32">
          {q && (
            <h3 className="text-4xl mb-10">
              Results for <strong>{q}</strong>
            </h3>
          )}
          <div className="flex gap-4">
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Category
            </button>
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Budget
            </button>
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Delivery Time
            </button>
          </div>
          <div>
            <div className="my-4">
              <span className="text-[#74767e] font-medium ">
                {gigs.length} services available
              </span>
            </div>
            <div className="grid grid-cols-4">
               {/* @ts-ignore */}
              {gigs.map((gig) => (
                <SearchGridItem gig={gig} key={gig.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Singlesearchpage;
