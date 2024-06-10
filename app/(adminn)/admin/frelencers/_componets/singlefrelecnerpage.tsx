"use client";
import { getallfrelencer } from "@/actions/admin/getallfrelencer";
import { togglestatus } from "@/actions/admin/togglestatus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Frelencers {
  frelencers: Awaited<ReturnType<typeof getallfrelencer>>;
}

function SingleFrelencer({ frelencers }: Frelencers) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const togglestatuse = async (id: string) => {
    await togglestatus(id);
    router.refresh();
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = frelencers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(frelencers.length / itemsPerPage);

  return (
    <Card className="border border-gray-200 dark:border-gray-700 mx-8">
      <div className="">
        <h3 className="m-5 text-2xl font-semibold">All Workify Frelencers</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  created at
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-3">
                  role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 justify-center items-center flex"
                >
                  Rate
                </th>

                <th scope="col" className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* @ts-ignore */}
              {currentItems?.map((order) => {
                return (
                  <tr
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                    key={order.username}
                  >
                    <th scope="row" className="px-6 py-4 ">
                      {order.username}
                    </th>
                    <th scope="row" className="px-6 py-4 ">
                      {order.email}
                    </th>

                    <td className="px-6 py-4">
                      {format(new Date(order.createdAt!), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      {order.isActive ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {order.role === "FREELANCER" ? (
                        <Badge variant="secondary">FREELANCER</Badge>
                      ) : (
                        <Badge variant="default">CLIENT</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={"outline"}
                        className="flex items-center justify-center"
                      >
                        {!order.avgrating ? (
                          <span className="text-gray-500">No rating yet</span>
                        ) : (
                          <>
                            {Array.from(
                              { length: Math.round(order.avgrating) },
                              (_, i) => (
                                <Star
                                  key={i}
                                  size={20}
                                  className="text-yellow-500"
                                />
                              )
                            )}
                          </>
                        )}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 ">
                      {order.isActive ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => togglestatuse(order.id)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size={"sm"}
                          onClick={() => togglestatuse(order.id)}
                        >
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="text-center">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SingleFrelencer;
