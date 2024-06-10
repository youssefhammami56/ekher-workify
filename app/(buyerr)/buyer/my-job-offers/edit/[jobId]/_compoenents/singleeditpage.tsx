"use client";
import React, { useState } from "react";
import { categories } from "@/utils/categories";
import { getjobofferbyid } from "@/actions/getjobofferbyid";
import { editJobOffer } from "@/actions/handeleditjob";
import toast from "react-hot-toast";
import UploadImagewithcloudinar from "@/app/(sellerr)/_componenets/UploadImagewithcloudinar";

import { useRouter } from "next/navigation";

function SingleJobofferEdit({ job }) {
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900 dark:text-white";
  const [features, setFeatures] = useState(job?.expertise || []);
  const [title, setTitle] = useState(job?.title || "");
  const [description, setDescription] = useState(job?.description || "");
  const [category, setCategory] = useState(job?.category || "");
  const [price, setPrice] = useState(job?.price || 0);
  const [shortDesc, setShortDesc] = useState(job?.shortDesc || "");
  const [imagesrc, setImagesrc] = useState("");

  const [singleFeature, setSingleFeature] = useState("");
  const router = useRouter();

  const handleChange = (e) => {};
  const removeFeature = (index) => {};
  const handleUpdate = async () => {
    await editJobOffer(job?.id!, title, description, category, price, features, shortDesc);
    router.refresh();
    router.push("/buyer/my-job-offers");
    toast.success("Job Offer Updated");
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100">
        <h1 className="text-4xl text-blue-400 mb-5">Update Job Offer</h1>
        <form action="" className="flex flex-col gap-5 mt-10">
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="title" className={labelClassName}>
                Job Title
              </label>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                className={inputClassName}
                placeholder="e.g. I will do something I'm really good at"
                required
              />
            </div>
            <div>
              <label htmlFor="categories" className={labelClassName}>
                Select a Category
              </label>
              <select
                id="categories"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                defaultValue="Choose a Category"
              >
                {categories.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description" className={labelClassName}>
              Job Description
            </label>
            <textarea
              id="description"
              className={inputClassName}
              placeholder="Write a short description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-11"></div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="features" className={labelClassName}>
                Expertise Needed
              </label>
              <div className="flex gap-3 items-center mb-5">
                <input
                  type="text"
                  id="features"
                  className={inputClassName}
                  placeholder="Enter an expertise needed"
                  name="feature"
                  value={singleFeature}
                  onChange={(e) => setSingleFeature(e.target.value)}
                />
                <button
                  type="button"
                  className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium text-lg px-10 py-3 rounded-md"
                  onClick={() => {
                    if (singleFeature) {
                      setFeatures([...features, singleFeature]);
                      setSingleFeature("");
                    }
                  }}
                >
                  Add
                </button>
              </div>
              <ul className="flex gap-2 flex-wrap">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                  >
                    <span>{feature}</span>
                    <span
                      className="text-red-700 cursor-pointer"
                      onClick={() => removeFeature(index)}
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label htmlFor="image" className={labelClassName}>
                Images
              </label>
              <UploadImagewithcloudinar
                value={imagesrc}
                onchange={(url) => setImagesrc(url)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="shortDesc" className={labelClassName}>
                Short Description
              </label>
              <input
                type="text"
                className={inputClassName}
                id="shortDesc"
                placeholder="Enter a short description."
                name="shortDesc"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price" className={labelClassName}>
                Job Price ( TND )
              </label>
              <input
                type="number"
                className={inputClassName}
                id="price"
                placeholder="Enter a price"
                name="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <button
              className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingleJobofferEdit;
