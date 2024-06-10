"use client";
import { getGigsById } from "@/actions/get-gigs-byid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface ReviewsProps {
  gigData: Awaited<ReturnType<typeof getGigsById>>;
}

function Reviews({ gigData }: ReviewsProps) {
  // const [{ gigData }] = useStateProvider();
  const [averageRatings, setAverageRatings] = useState("0");
  useEffect(() => {
    if (gigData && gigData.Reviews.length) {
      let avgRating = 0;
      //@ts-ignore
      gigData.Reviews.forEach(({ rating }) => (avgRating += rating));
      setAverageRatings((avgRating / gigData.Reviews.length).toFixed(1));
    }
  }, [gigData]);

  return (
    <>
      {gigData && (
        <div className="mb-10">
          <h3 className="text-2xl my-5 font-normal text-[#404145] ">Reviews</h3>
          <div className="flex gap-3 mb-5">
            {/* @ts-ignore */}
            <h5>{gigData.Reviews.length} reviews for this service</h5>
            <div className="flex text-yellow-500 items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      Math.ceil(parseInt(averageRatings)) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span>{averageRatings}</span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* @ts-ignore */}
            {gigData.Reviews.map((review) => (
              <div className="flex gap-3 border-t pt-6" key={review.id}>
                <div>
                  {review.reviewer.profileImage ? (
                    <Image
                      src="/uploads/1629780130000-IMG_20210823_124013.jpg"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                      <span className="text-xl text-white">
                        {review.reviewer.email[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h4>{review.reviewer.fullname}</h4>
                  <div className="flex text-yellow-500 items-center gap-2">
                    <div className="flex gap-1">
                      {/* @ts-ignore */}
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${
                            review.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{review.rating}</span>
                  </div>
                  <p className="text-[#404145] pr-20">{review.reviewText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
