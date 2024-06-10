"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { acceptApply } from "@/actions/acceptapply";
import { gettheapplyinjobbijonid } from "@/actions/gettheapplyinjobbijonid";
import { rejectApply } from "@/actions/rejectapply";
import { ContractModal } from "@/app/seller/postuled-jobs/_compoents/contractmodal";
import Link from "next/link";
import { categories } from "@/utils/categories";

interface SingleMyonlyjobapplyProps {
  apply: Awaited<ReturnType<typeof gettheapplyinjobbijonid>>;
}

function SingleMyonlyjobapply({ apply }: SingleMyonlyjobapplyProps) {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredGigs, setFilteredGigs] = useState(apply);
  const [currentPage, setCurrentPage] = useState(1);
  const [gigsPerPage] = useState(5); // Change the number of gigs per page as needed

  useEffect(() => {
    let filteredApply = apply;
    if (categoryFilter) {
      filteredApply = filteredApply.filter((order) => order.job.category === categoryFilter);
    }
    if (statusFilter) {
      filteredApply = filteredApply.filter((order) => order.status === statusFilter);
    }
    setFilteredGigs(filteredApply);
  }, [categoryFilter, statusFilter, apply]);

  const handelreject = async (id: string) => {
    await rejectApply(id);
    router.refresh();
  };

  const handelaccept = async (id: string) => {
    await acceptApply(id);
    router.refresh();
  };

  // Pagination
  const indexOfLastGig = currentPage * gigsPerPage;
  const indexOfFirstGig = indexOfLastGig - gigsPerPage;
  const currentGigs = filteredGigs.slice(indexOfFirstGig, indexOfLastGig);
  const totalGigs = filteredGigs.length;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 h-screen py-8 px-4">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">
          You have {totalGigs} applications in this job
        </h3>
        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between mb-5 space-x-4">
          {/* @ts-ignore */}
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
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
          </div>
          {/* Add your filter button here */}
        </div>
        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Job Name
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
                  Applied By
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentGigs.map((order) => (
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50" key={order.id}>
                  <th scope="row" className="px-6 py-4 font-medium">
                    {order.job.title}
                  </th>
                  <td className="px-6 py-4">{order.job.category}</td>
                  <td className="px-6 py-4">{order.job.price}</td>
                  <td className="px-6 py-4">
                    {format(new Date(order.job.createdAt), "dd/MM/yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span>{order.user.username}</span>
                      <span>{order.user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{order.status}</td>
                  <td className="px-6 py-4">
                    <Link href={`/buyer/apply/messages/${order.id}`} className="font-medium text-blue-600 hover:underline">
                      Send
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3 items-center">
                      {order.status === "pending" && (
                        <div className="flex gap-x-4">
                          <Button onClick={() => handelreject(order.id)} className="bg-red-400 hover:bg-red-500">
                            Reject
                          </Button>
                          <Button onClick={() => handelaccept(order.id)} className="bg-sky-400 hover:bg-sky-500">
                            Accept
                          </Button>
                        </div>
                      )}
                      {order.status === "accepted" && <ContractModal applyId={order.id} />}
                      {order.status === "rejected" && (
                        <Button className="bg-red-400 hover:bg-red-500" disabled>
                          Rejected
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav className="mt-4" aria-label="Pagination">
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
  );
}

export default SingleMyonlyjobapply;
