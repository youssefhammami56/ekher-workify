"use client";
import { editGigs } from "@/actions/edit-gigs";
import { getGigsById } from "@/actions/get-gigs-byid";
import UploadImagewithcloudinar from "@/app/(sellerr)/_componenets/UploadImagewithcloudinar";
import { categories } from "@/utils/categories";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SingleGigsIdProps {
  gigs: Awaited<ReturnType<typeof getGigsById>>;
}

function SingleGigsId({ gigs }: SingleGigsIdProps) {
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900  dark:text-white";

  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState(gigs!.features);
  const [images, setImages] = useState(gigs!.images);
  const [singleFeature, setSingleFeature] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [tabofimages, setTabofimages] = useState(gigs!.images);

  const [data, setData] = useState({
    title: gigs!.title,
    category: gigs!.category,
    description: gigs!.description,
    time: gigs!.deliveryTime,
    revisions: gigs!.revisions,
    price: gigs!.price,
    shortDesc: gigs!.shortDesc,
    feature: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const removeFeature = (index: any) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setFeatures(clonedFeatures);
  };

  const removeImage = (url: any) => {
    const clonedImages = [...tabofimages];
    clonedImages.splice(clonedImages.indexOf(url), 1);
    setTabofimages(clonedImages);
  };

  const handelEditGig = async () => {
    const formData = new FormData();
    //@ts-ignore
    files.forEach((file) => formData.append("images", file));
    const gigData = {
      id: gigs!.id,
      title: data.title,
      category: data.category,
      description: data.description,
      deliveryTime: data.time,
      revisions: data.revisions,
      price: data.price,
      shortDesc: data.shortDesc,
      features: features,
      images: tabofimages,
    };

    await editGigs(gigData);
    router.refresh();
    router.push("/seller/gigs");
  };

  const router = useRouter();

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-semibold mb-8 text-blue-400">
          Edit Service
        </h1>
        <form action="" className="flex flex-col gap-5 mt-10">
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="title" className={labelClassName}>
              Service Title
              </label>
              <input
                name="title"
                value={data.title}
                onChange={handleChange}
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
                onChange={handleChange}
                value={data.category}
              >
                {/* @ts-ignore */}
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
            Service Description
            </label>
            <textarea
              id="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a short description"
              name="description"
              value={data.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="delivery" className={labelClassName}>
                Delivery Time in month
              </label>
              <input
                type="number"
                className={inputClassName}
                id="delivery"
                name="time"
                value={data.time}
                onChange={handleChange}
                placeholder="Minimum Delivery Time"
              />
            </div>
            <div>
              <label htmlFor="revision" className={labelClassName}>
                maintenance
              </label>
              <input
                type="number"
                id="revision"
                className={inputClassName}
                placeholder="Max Number of Revisions"
                name="revisions"
                value={data.revisions}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="features" className={labelClassName}>
                Features
              </label>
              <div className="flex gap-3 items-center mb-5">
                <input
                  type="text"
                  id="features"
                  className={inputClassName}
                  placeholder="Enter a Feature Name"
                  name="feature"
                  value={singleFeature}
                  onChange={(e) => setSingleFeature(e.target.value)}
                />
                <button
                  type="button"
                  className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md"
                  onClick={() => {
                    /* @ts-ignore */
                    setFeatures([...features, singleFeature]);
                    setSingleFeature("");
                  }}
                >
                  Add
                </button>
              </div>
              <ul className="flex gap-2 flex-wrap">
                {/* @ts-ignore */}
                {features.map((feature, index) => {
                  return (
                    <li
                      key={feature + index.toString()}
                      className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                    >
                      <span>{feature}</span>
                      <span
                        className="text-red-700"
                        onClick={() => removeFeature(index)}
                      >
                        X
                      </span>
                    </li>
                  );
                })}
              </ul>
              <ul className="flex gap-2 flex-wrap">
                {/* @ts-ignore */}
                {tabofimages.map((url, index) => {
                  return (
                    <li
                      key={url + index.toString()}
                      className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                    >
                      <Image src={url} height={50} width={50} alt="image" />
                      <span
                        className="text-red-700"
                        onClick={() => removeImage(url)}
                      >
                        X
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <label htmlFor="image" className={labelClassName}>
                 Images
              </label>
              <div>
                <UploadImagewithcloudinar
                  onchange={(url) => {
                    setImagesrc(url); // Set the value of imagesrc
                    // @ts-ignore
                    setTabofimages([...tabofimages, url]); // Push the url into tabofimages
                  }}
                  value={imagesrc}
                />
              </div>
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
                value={data.shortDesc}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price" className={labelClassName}>
              Service Price ( TND )
              </label>
              <input
                type="number"
                className={inputClassName}
                id="price"
                placeholder="Enter a price"
                name="price"
                value={data.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
              type="button"
              onClick={handelEditGig}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingleGigsId;
