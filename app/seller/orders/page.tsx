import { getSellerOrders } from "@/actions/getsellerorders";
import React from "react";
import SingleSellerOrderspage from "./_components/singlesellerorderspage";

const  Page=async() =>{

    const orders = await getSellerOrders();
  return (
    <div className="mt-30">
      <SingleSellerOrderspage orders={orders} />
    </div>
  );
}

export default Page;
