"use client"
import ComunityUserItem from "./comunity-users-item";
import ComunityListItem from "./comunity-list-items";
import { getAllCommunity } from "@/actions/get-all-community copy";
import { useEffect, useState } from "react";
import { categories } from "@/utils/categories";
interface ComunityProps{
  comunity: Awaited<ReturnType<typeof getAllCommunity>>;

}
export default function ComunityList  ({comunity}:ComunityProps){
  const [filteredJobs, setFilteredJobs] = useState(comunity);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category === "") {
      setFilteredJobs(comunity);
    } else {
      // @ts-ignore
      const filtered = comunity.filter((job) => job.category === category);
      setFilteredJobs(filtered);
    }
  }, [category, comunity]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  return (
    <div className="hidden  lg:block    bg-gray-100  space-y-2 w-80 h-full">
      <div className="flex space-x-6">
        <label htmlFor="categories"></label>
        <select
          id="categories"
          className="bg-white border border-gray-300 text-blue-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w p-2 "
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Choose a Category</option>
          {/* @ts-ignore */}
          {categories.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {category && (
          <button
            onClick={() => setCategory("")}
            className="bg-sky-500 text-white px-3 py-1 rounded-md"
          >
            Clear
          </button>
        )}
      </div>
      <div className=" px-7 text-sm font-semibold bg-white  py-8 border-r-2">
        Community - {comunity.length}
      </div>
      <div className="h-[580px] overflow-y-auto p-4 ">
        {/* @ts-ignore */}
        {filteredJobs.map((comunity) => (
          <div key={comunity.id} className="flex  ">
            <ComunityListItem comm={comunity} />
          </div>
        ))}
      </div>
    </div>
  );
};
