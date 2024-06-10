"use client";
import { addReview } from "@/actions/add-review";
import { existingOrder } from "@/actions/existingorder";
import { havereveiw } from "@/actions/haveareviw";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface AddReviewProps {
  gigid: string;
}

function AddReview({ gigid }: AddReviewProps) {
  // const [{}, dispatch] = useStateProvider();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const router = useRouter();
  // const { gigId } = router.query;

  const [ishasOrdered, setIshasOrdered] = useState(false);
  const [haveReview, setHaveReview] = useState(false);

  useEffect(() => {
    const checkOrder = async () => {
      const hasOrdered = await existingOrder(gigid);
      const haver = await havereveiw(gigid);
      setHaveReview(haver);
      setIshasOrdered(hasOrdered);
    };
    checkOrder();
  }, [gigid]);

  const addReviews = async () => {
    await addReview(comment, gigid, rating);
    router.refresh();
  };
  return (
    <div className="mb-10">
      <h3 className="text-2xl my-5 font-normal   text-[#404145]">
        Give Review
      </h3>

      <div className="flex  flex-col  items-start justify-start gap-3">
        <textarea
          name="reviewText"
          id="reviewText"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className="block p-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Add Review"
          disabled={!ishasOrdered || haveReview}
        ></textarea>
        <div className="flex gap-1">
          {/* @ts-ignore */}
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`cursor-pointer ${
                rating >= num ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(num)}
              aria-disabled={!ishasOrdered || haveReview}
            />
          ))}
        </div>
        <button
          className="flex items-center bg-[#599bff] text-white py-2 justify-center text-md relative rounded px-5"
          onClick={addReviews}
          disabled={!ishasOrdered || haveReview}
        >
          Add Review
        </button>
      </div>
    </div>
  );
}

export default AddReview;
