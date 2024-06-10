import React from "react";
import UnreadMessages from "./_componets/unread-messages";
import { getunrededMessage } from "@/actions/get-unreadedmessage";

const Page = async () => {
  const messages = await getunrededMessage();
  return (
    <div className="mt-32">
      <UnreadMessages message={messages} />
    </div>
  );
};

export default Page;
