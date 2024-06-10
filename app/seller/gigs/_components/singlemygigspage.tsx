"use client";
import { getMygigs } from "@/actions/get-my-gigs";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ConfirmModel } from "./deletegigsbtn";
import { categories } from "@/utils/categories";

interface SingleMyGigsPageProps {
  gigs: Awaited<ReturnType<typeof getMygigs>>;
}

function SingleMyGigsPage({ gigs }: SingleMyGigsPageProps) {
  const router = useRouter();
  const [filteredGigs, setFilteredGigs] = useState(gigs);
  const [currentPage, setCurrentPage] = useState(1);
  const [gigsPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    if (categoryFilter === "") {
      setFilteredGigs(gigs);
    } else {
      setFilteredGigs(gigs.filter(gig => gig.category === categoryFilter));
    }
  }, [categoryFilter, gigs]);

  // Get current gigs
  const indexOfLastGig = currentPage * gigsPerPage;
  const indexOfFirstGig = indexOfLastGig - gigsPerPage;
  const currentGigs = filteredGigs.slice(indexOfFirstGig, indexOfLastGig);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handeldelete = async (id: any) => {
    await db.gigs.delete({
      where: { id: id },
    });
    router.refresh();
  };

  return (

    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100">
        <h3 className="m-5 text-2xl font-semibold text-blue-400">All your Services</h3>
        <div className="flex justify-between mb-5">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
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
                  Delivery Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* @ts-ignore */}
              {currentGigs.map(({ title, category, price, deliveryTime, id }: any) => {
                return (
                  <tr
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {title}
                    </th>
                    <td className="px-6 py-4">{category}</td>
                    <td className="px-6 py-4">{price}</td>
                    <td className="px-6 py-4">{deliveryTime}</td>
                    <td className="px-6 py-4 text-center space-x-4 flex items-center">
                      <Link
                        href={`/seller/gigs/${id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <ConfirmModel gigsId={id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-5">
            <nav>
              <ul className="inline-flex items-center -space-x-px">
                {Array.from({ length: Math.ceil(filteredGigs.length / gigsPerPage) }, (_, index) => (
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
    </div>
  );
}

export default SingleMyGigsPage;
