import React from "react";
import MessageContainer from "../../_components/MessageContainer";
import { getMessageInOrder } from "@/actions/getmessageinorder";
import { getLoggedUser } from "@/actions/get-logged-user";

const Page = async ({
    params,
  }: {
    params: {
      orderId: string;
    };
  }) => {
 const messages = await getMessageInOrder(params.orderId);
 const userInfo = await getLoggedUser();
  return <div className="mt-28">
    <MessageContainer messages={messages} userInfo={userInfo} orderId={params.orderId} />
  </div>;
}

export default Page;
