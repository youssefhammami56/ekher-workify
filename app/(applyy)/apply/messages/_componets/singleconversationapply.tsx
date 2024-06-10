import { getLoggedUser } from "@/actions/get-logged-user";
import { getapplymessages } from "@/actions/getapplymessages";
import MessageContainer from "@/app/(buyerr)/buyer/orders/_components/MessageContainer";
import React from "react";
import Messagecontainerforapply from "./Messagecontainerforapply";

interface SingleConversationApplyProps {
  messages: Awaited<ReturnType<typeof getapplymessages>>;
  userInfo: Awaited<ReturnType<typeof getLoggedUser>>;
  orderId: string;
}

function SingleConversationApply({
  messages,
  userInfo,
  orderId,
}: SingleConversationApplyProps) {
  return (
    <div>
      <Messagecontainerforapply
        //@ts-ignore
        messages={messages}
        userInfo={userInfo}
        applyId={orderId}
      />
    </div>
  );
}

export default SingleConversationApply;
