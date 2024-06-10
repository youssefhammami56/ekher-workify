"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaFilter } from "react-icons/fa";
import { categories } from "@/utils/categories";

interface SingleJobListProps {
  jobs: {
    id: number;
    title: string;
    category: string;
    description: string;
    createdAt: string;
    imagesrc: string;
    price: number;
    createdBy: {
      id: number;
      profileImage?: string;
      email?: string;
      username?: string;
      Job: {
        id: number;
      }[];
    };
  }[];
}

function SingleJobList({ jobs }: SingleJobListProps) {
  const router = useRouter();
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = jobs;

    if (category !== "") {
      filtered = filtered.filter((job) => job.category === category);
    }

    if (date !== "") {
      filtered = filtered.filter((job) => format(new Date(job.createdAt), "yyyy-MM-dd") === date);
    }

    if (price !== "") {
      filtered = filtered.sort((a, b) => {
        return price === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    setFilteredJobs(filtered);
  }, [category, date, price, jobs]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold mb-8 text-blue-400">Explore Job Offers</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
        {showFilters && (
          <div className="flex flex-col items-center justify-center mb-6 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <label htmlFor="categories" className="text-gray-700">Filter by Category:</label>
              <select
                id="categories"
                className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                name="category"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map(({ name }) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="date" className="text-gray-700">Filter by Date:</label>
              <input
                type="date"
                id="date"
                className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                value={date}
                onChange={handleDateChange}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="price" className="text-gray-700">Filter by Price:</label>
              <select
                id="price"
                className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                name="price"
                value={price}
                onChange={handlePriceChange}
              >
                <option value="">Select</option>
                <option value="asc">Lowest to Highest</option>
                <option value="desc">Highest to Lowest</option>
              </select>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 m-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-50"
            >
              <img
                alt="Profile"
                className="w-full h-48 object-cover"
                height={250}
                src={job.imagesrc || "/default-profile.jpg"}
                style={{ aspectRatio: "400/250", objectFit: "cover" }}
                width={400}
              />
              <div className="p-4">
                <div className="flex justify-between items-center mr-4">
                  <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                  <p><strong className="font-medium">From {job.price}(TND)</strong></p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-semibold">{job.category}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Created {format(new Date(job.createdAt), "dd/MM/yyyy")}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                <div className="flex justify-between items-center mx-2 hover:text-blue-500">
                  <div className="flex space-x-2 items-center">
                    <Avatar>
                      <AvatarImage
                        src={job.createdBy.profileImage || "/default-profile.jpg"}
                        alt="profile"
                        height={30}
                        width={30}
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
                          <span className="text-lg text-white">{job.createdBy.email![0].toUpperCase()}</span>
                        </div>
                      </AvatarFallback>
                    </Avatar>
                    <span className="dark:text-gray-400 text-sm">
                      <p>{job.createdBy.email}</p>
                      <p>{job.createdBy.username}</p>
                    </span>
                  </div>
                  <p>{job.createdBy.Job.length} Offers</p>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="mt-4 bg-blue-600 text-white hover:bg-blue-700 flex justify-end"
                    onClick={() => router.push(`/seller/job-offer/${job.id}`)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleJobList;
