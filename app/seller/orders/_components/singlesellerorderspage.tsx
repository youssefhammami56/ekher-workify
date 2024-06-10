"use client";
import { getOrders } from "@/actions/get-my-orders";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { getSellerOrders } from "@/actions/getsellerorders";
import { Button } from "@/components/ui/button";
import { acceptgigorder } from "@/actions/acceptgigorder";
import {
  calcaluterevenuebythestartdateandenddateoforderbyId,
  markorderascompletd,
  rejectGigOrder,
} from "@/actions/rejectgigorder";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/utils/categories";

interface Order {
  orders: Awaited<ReturnType<typeof getSellerOrders>>;
}

function SingleSellerOrderspage({ orders }: Order) {
  const router = useRouter();
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
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    setFilteredOrders(filtered);
  }, [categoryFilter, statusFilter, orders]);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handelaccept = async (e: string) => {
    await acceptgigorder(e);
    router.refresh();
  };
  const handelrejectorder = async (e: string) => {
    await rejectGigOrder(e);
    router.refresh();
  };
  const handelmarkgigsascompleted = async (e: string) => {
    await markorderascompletd(e);
    router.refresh();
  };
  const calculaterevenue = async (e: string) => {
    const revneue = await calcaluterevenuebythestartdateandenddateoforderbyId(
      e
    );
    setrevenue(revneue);
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-100 w-full max-w-full">
        <h3 className="m-5 text-2xl font-semibold text-blue-400">
          All your Orders 
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
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order By
                </th>
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
                  Order Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Completed At
                </th>
                <th scope="col" className="px-6 py-3">
                  Send Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* @ts-ignore */}
              {currentOrders.map((order) => {
                return (
                  <tr
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                    key={order.id}
                  >
                    <th scope="row" className="px-6 py-4 ">
                      {order.buyer.username}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {order.gig.title}
                    </th>
                    <td className="px-6 py-4">{order.gig.category}</td>
                    <td className="px-6 py-4">{order.price}</td>
                    <td className="px-6 py-4">
                      {format(new Date(order.createdAt), "dd/MM/yyyy")}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {order.status}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {order.status == "ACCEPTED" ||
                      order.status == "COMPLETED" ? (
                        <Badge variant={"green"} className="p-1">
                          {format(new Date(order.startedAt!), "dd/MM/yyyy")}
                        </Badge>
                      ) : (
                        <Badge variant={"outline"} className=" text-center">
                          Not Started
                        </Badge>
                      )}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {order.isCompleted ? (
                        <Badge variant={"yellow"} className="p-1">
                          {format(new Date(order.completedAt!), "dd/MM/yyyy")}
                        </Badge>
                      ) : (
                        <Badge variant={"outline"} className=" text-center">
                          In Progress
                        </Badge>
                      )}
                    </th>

                    <td className="px-6 py-4 ">
                      <Link
                        href={`/seller/orders/messages/${order.id}`}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        Send
                      </Link>
                    </td>
                    <td className="px-6 py-4 flex space-x-2 ">
                      {order.status !== "ACCEPTED" &&
                        order.status !== "COMPLETED" && (
                          <>
                            <Button
                              variant={"primary"}
                              onClick={() => {
                                handelaccept(order.id);
                              }}
                            >
                              Accept
                            </Button>
                            <Button
                              variant={"destructive"}
                              onClick={() => {
                                handelrejectorder(order.id);
                              }}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      {order.status == "ACCEPTED" && (
                        <Button
                          variant={"primary"}
                          onClick={() => {
                            handelmarkgigsascompleted(order.id);
                          }}
                        >
                          Mark as completed
                        </Button>
                      )}
                      {order.status == "COMPLETED" && (
                        <span className="text-green-500 font-semibold">
                          Great Job! You have completed this order
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
    </div>
  );
}

export default SingleSellerOrderspage;
