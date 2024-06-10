"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getGigsByFilter } from "@/actions/get-gigs-byfilter";
import { categories } from "@/utils/categories";
import SearchGridItem from "@/app/search/_components/SearchGridItem";

interface SearchPageProps {
  gigs: Awaited<ReturnType<typeof getGigsByFilter>>;
  q?: string;
  category?: string;
}

function Singlesearchpage({ gigs, q }: SearchPageProps) {
  const [filteredJobs, setFilteredJobs] = useState(gigs);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    let filtered = gigs;

    if (category !== "") {
      // @ts-ignore
      filtered = filtered.filter((gig) => gig.category === category);
    }

    if (price !== "") {
      filtered = filtered.sort((a, b) => {
        return price === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    if (date !== "") {
      filtered = filtered.filter((gig) => {
        const gigDate = new Date(gig.createdAt);
        const selectedDate = new Date(date);
        return gigDate.toDateString() === selectedDate.toDateString();
      });
    }

    setFilteredJobs(filtered);
  }, [category, price, date, gigs]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100">
        <h1 className="text-4xl font-bold mb-8  text-blue-400">
          Explore Services
        </h1>
        <div className="flex flex-col items-center justify-center mb-6 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <label htmlFor="categories" className="text-gray-700">
              Filter by Category:
            </label>
            <select
              id="categories"
              className="bg-gray-200 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
              name="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {/* @ts-ignore */}
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="price" className="text-gray-700">
              Filter by Price:
            </label>
            <select
              id="price"
              className="bg-gray-200 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
              name="price"
              value={price}
              onChange={handlePriceChange}
            >
              <option value="">Select</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="date" className="text-gray-700">
              Filter by Date:
            </label>
            <input
              type="date"
              id="date"
              className="bg-gray-200 border border-gray-400 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
              value={date}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* @ts-ignore */}
          {filteredJobs.map((gig) => (
            <SearchGridItem gig={gig} key={gig.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Singlesearchpage;
