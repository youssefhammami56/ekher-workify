"use client";
import React, { useState } from "react";
import { categories } from "@/utils/categories";
import { createJobOffer } from "@/actions/create-job-offer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UploadImagewithcloudinar from "@/app/(sellerr)/_componenets/UploadImagewithcloudinar";

function SingleJobofferCreate() {
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900  dark:text-white";
  const [features, setFeatures] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [singleFeature, setSingleFeature] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
      case "price":
        setPrice(Number(value));
        break;
      case "shortDesc":
        setShortDesc(value);
        break;
      default:
        break;
    }
  };

  const removeFeature = (index: number) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setFeatures(clonedFeatures);
  };

  const handleCreate = async () => {
    if (
      features.length < 1 ||
      title === "" ||
      description === "" ||
      category === "" ||
      price === 0 ||
      shortDesc === ""
    ) {
      toast.error("All fields are required");
    } else {
      await createJobOffer(
        title,
        description,
        category,
        price,
        features,
        shortDesc,
        imagesrc
      );
      toast.success("Job created successfully");
      router.push("/buyer/my-job-offers");
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100">
        <h1 className="text-4xl text-blue-400 mb-5">Create a new Job</h1>
        <form action="" className="flex flex-col gap-5 mt-10">
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="title" className={labelClassName}>
                Job Title
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a short description"
              name="description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
              type="button"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingleJobofferCreate;
