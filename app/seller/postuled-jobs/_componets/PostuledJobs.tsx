"use client";
import { getMypostuledJobs } from "@/actions/get-mypostuled-jobs";
import { handeldeleteapply } from "@/actions/handeldeleteapply";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ContractModal } from "../_compoents/contractmodal";
import { ReportBtn } from "./reportclientbtn";
import { categories } from "@/utils/categories";

interface Apply {
  apply: Awaited<ReturnType<typeof getMypostuledJobs>>;
}

function PostuledJobs({ apply }: Apply) {
  const [filteredApply, setFilteredApply] = useState(apply);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let filtered = apply;

    if (categoryFilter !== "") {
      filtered = filtered.filter(order => order.job.category === categoryFilter);
    }

    if (statusFilter !== "") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredApply(filtered);
  }, [categoryFilter, statusFilter, apply]);

  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApply.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handeldeleteapplye = async (id: string) => {
    await handeldeleteapply(id);
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100 w-full">
        <h3 className="m-5 text-2xl font-semibold text-blue-400">
          You have Applied in {apply.length} jobs
        </h3>
        <div className="flex justify-between mb-5 space-x-4">
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
                  Created By
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
              {/* @ts-ignore */}
              {currentItems.map((order) => {
                return (
                  <tr
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                    key={order.id}
                  >
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
                        <span>{order.job.createdBy.username}</span>
                        <span>{order.job.createdBy.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span>{order.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/seller/apply/messages/${order.id}`}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        Send
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3 items-center">
                        {order.status === "pending" ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center"
                            onClick={() => handeldeleteapplye(order.id)}
                          >
                            Delete
                          </Button>
                        ) : (
                          <>
                            <ContractModal applyId={order.id} />
                            <ReportBtn clienttoreport={order.job.createdBy} />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-5">
          <nav>
            <ul className="inline-flex items-center -space-x-px">
              {Array.from({ length: Math.ceil(filteredApply.length / itemsPerPage) }, (_, index) => (
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

export default PostuledJobs;
