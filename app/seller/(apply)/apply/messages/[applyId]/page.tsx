import { getLoggedUser } from "@/actions/get-logged-user";
import { getapplymessages } from "@/actions/getapplymessages";
import React from "react";
import SingleConversationApply from "../_componets/singleconversationapply";

const Page = async ({
  params,
}: {
  params: {
    applyId: string;
  };
}) => {
  const messages = await getapplymessages(params.applyId);
  const userInfo = await getLoggedUser();
  return (
    <div className="mt-26">
      <SingleConversationApply
        //@ts-ignore
        messages={messages}
        userInfo={userInfo}
        orderId={params.applyId}
      />
    </div>
  );
};

export default Page;
