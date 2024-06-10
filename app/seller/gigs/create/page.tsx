"use client";
import { addGigs } from "@/actions/add-gigs";
import UploadImagewithcloudinar from "@/app/(sellerr)/_componenets/UploadImagewithcloudinar";
import toast from "react-hot-toast";
import { categories } from "@/utils/categories";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900  dark:text-white";
  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deliveryTime, setdeliveryTime] = useState(0);
  const [revisions, setRevisions] = useState(0);
  const [price, setPrice] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [singleFeature, setSingleFeature] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [tabofimages, setTabofimages] = useState([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "feature") {
      //@ts-ignore
      setFeatures([...features, value]);
    } else {
      // Update other form fields
      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "description":
          setDescription(value);
          break;
        case "category":
          setCategory(value);
          break;
        case "deliveryTime":
          setdeliveryTime(parseInt(value));
          break;
        case "revisions":
          setRevisions(parseInt(value));
          break;
        case "price":
          setPrice(parseInt(value));
          break;
        case "shortDesc":
          setShortDesc(value);
          break;
        default:
          break;
      }
    }
  };

  const removeFeature = (index: any) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setFeatures(clonedFeatures);
  };

  const addGig = async () => {
    const formData = new FormData();
    //@ts-ignore
    files.forEach((file) => formData.append("images", file));

    const gigData = {
      title,
      description,
      category,
      features,
      price,
      revisions,
      deliveryTime,
      shortDesc,
      images: tabofimages,
    };

    console.log("image", files);
    console.log("cat", category);

    await addGigs(gigData);

    toast.success("Gig created successfully");
    router.refresh();
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100">
        <h1 className="text-4xl text-blue-400 mb-5">Create a new Service</h1>
        <form action="" className="flex flex-col gap-5 mt-10">
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="title" className={labelClassName}>
              Service Title
              </label>
              <input
                name="title"
                value={title}
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
                value={category}
                onChange={handleChange}
                defaultValue="Choose a Category"
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
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="delivery" className={labelClassName}>Delivery Time in month</label>
              <input
                type="number"
                className={inputClassName}
                id="delivery"
                name="deliveryTime"
                value={deliveryTime}
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
                value={revisions}
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
                  className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
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
                      key={index}
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
            </div>
            <div>
              <label htmlFor="image" className={labelClassName}>
                Images
              </label>
              <div>
                <UploadImagewithcloudinar
                  value={imagesrc}
                  onchange={(url) => {
                    setImagesrc(url); // Set the value of imagesrc
                    // @ts-ignore
                    setTabofimages([...tabofimages, url]); // Push the url into tabofimages
                  }}
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
                value={shortDesc}
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
                value={price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
              type="button"
              onClick={addGig}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
