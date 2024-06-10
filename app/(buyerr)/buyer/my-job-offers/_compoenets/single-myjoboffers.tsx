"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";
import { BsEyeSlash } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { DeeleteJoboffer } from "./deletejiboffer";
import { useRouter } from "next/navigation";
import { categories } from "@/utils/categories";

interface JobOffers {
  Jobs: Awaited<ReturnType<typeof getMyjobOffers>>;
}

function SingleMyjoboffers({ Jobs }: JobOffers) {
  const router = useRouter();
  router.refresh();

  const [filteredJobs, setFilteredJobs] = useState(Jobs);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gigsPerPage] = useState(5); // Change the number of gigs per page as needed

  useEffect(() => {
    let filtered = Jobs;

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
  }, [category, date, price, Jobs]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(e.target.value);
  };

  const indexOfLastGig = currentPage * gigsPerPage;
  const indexOfFirstGig = indexOfLastGig - gigsPerPage;
  const currentGigs = filteredJobs.slice(indexOfFirstGig, indexOfLastGig);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold mb-8 text-blue-400">All Job Offers</h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
        {showFilters && (
          <div className="flex flex-col items-start justify-start mb-6 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3">
                  Apply
                </th>
              </tr>
            </thead>
            <tbody>
              {currentGigs.map((order) => {
                return (
                  <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {order.title}
                    </th>
                    <td className="px-6 py-4">{order.category}</td>
                    <td className="px-6 py-4">{order.price}</td>
                    <td className="px-6 py-4">
                      {format(new Date(order.createdAt), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <Link
                        href={`/buyer/my-job-offers/edit/${order.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <DeeleteJoboffer gigsId={order.id} />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/buyer/joboffer/apply/${order.id}`}
                        className="font-medium text-blue-600 hover:underline flex space-x-2"
                      >
                        <Eye size={18} /> View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <nav className="mt-4" aria-label="Pagination">
            <ul className="inline-flex items-center -space-x-px">
              {Array.from({ length: Math.ceil(filteredJobs.length / gigsPerPage) }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SingleMyjoboffers;
