"use client";
import { getOrders } from "@/actions/get-my-orders";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { getBuyerOrders } from "@/actions/getbuyerorders";
import { Button } from "@/components/ui/button";
import { handeldeleteorder } from "@/actions/deleteorder";
import { handelcancelorder } from "@/actions/ordercancel";
import { categories } from "@/utils/categories";

interface Order {
  orders: Awaited<ReturnType<typeof getBuyerOrders>>;
}

function SingleOrdersPage({ orders }: Order) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let filtered = orders;

    if (categoryFilter !== "") {
      filtered = filtered.filter(order => order.gig.category === categoryFilter);
    }

    if (statusFilter !== "") {
      filtered = filtered.filter(order => (statusFilter === "Completed" ? order.isCompleted : !order.isCompleted));
    }

    setFilteredOrders(filtered);
  }, [categoryFilter, statusFilter, orders]);

  const handeldeleteordre = async (id: string) => {
    await handeldeleteorder(id);
  };

  const handelcancelordere = async (id: string) => {
    await handelcancelorder(id);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100 w-full  ">
        <h3 className="m-5 text-2xl font-semibold text-blue-400">All your orders as a client</h3>
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
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Gig Name</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Delivery Time</th>
                <th scope="col" className="px-6 py-3">Order Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Send Message</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 ">{order.gig.title}</th>
                  <td className="px-6 py-4">{order.gig.category}</td>
                  <td className="px-6 py-4">{order.price}</td>
                  <td className="px-6 py-4">{order.gig.deliveryTime}</td>
                  <td className="px-6 py-4">{format(new Date(order.createdAt), "dd/MM/yyyy")}</td>
                  <td className="px-6 py-4">{order.isCompleted ? "Completed" : "Pending"}</td>
                  <td className="px-6 py-4 ">
                    <Link href={`/buyer/orders/messages/${order.id}`} className="font-medium text-blue-600 hover:underline">
                      Send
                    </Link>
                  </td>
                  <td className="px-6 py-4 ">
                    {order.isCompleted ? (
                      <Button variant="destructive" size="sm" onClick={() => handeldeleteordre(order.id)}>
                        Delete
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => handelcancelordere(order.id)}>
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-5">
          <nav>
            <ul className="inline-flex items-center -space-x-px">
              {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, index) => (
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

export default SingleOrdersPage;
