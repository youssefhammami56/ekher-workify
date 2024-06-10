"use client";
import React, { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { getMessageInOrder } from "@/actions/getmessageinorder";
import { getLoggedUser } from "@/actions/get-logged-user";
import { sendMessage } from "@/actions/sendmessage";
import { senFile, sendMessageinapply } from "@/actions/sendMessageintheapply";
import { Upload } from "lucide-react";
import UploadPdfInmessage from "@/app/(buyerr)/buyer/(apply)/apply/messages/_componets/uploadpdf";

interface MessageContainerProps {
  messages: Awaited<ReturnType<typeof getMessageInOrder>>;
  userInfo: Awaited<ReturnType<typeof getLoggedUser>>;
  applyId: string;
}

function Messagecontainerforapply({
  messages,
  userInfo,
  applyId,
}: MessageContainerProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [messageText, setMessageText] = useState("");
  const router = useRouter();

  function formatTime(timestamp: any) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  const sendMessages = async () => {
    if (messageText.length || fileUrl) {
      await sendMessageinapply(applyId, messageText, fileUrl, fileName);
      setMessageText("");
      setFileUrl("");
      setFileName("");
      router.refresh();
    }
  };

  const sendPdf = async (url: string) => {
    await senFile(applyId, url);
    router.refresh();
  };

  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl flex flex-col border">
        <div className="flex-grow h-[50vh] overflow-y-auto space-y-4 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === userInfo!.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`inline-block rounded-lg p-4 max-w-xs break-all ${
                  message.senderId === userInfo!.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex flex-row space-x-2 items-center">
                  {message.text && <p className="text-sm">{message.text}</p>}
                  {message.fileUrl && (
                    <a
                      href={message.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex space-x-2 text-sm text-blue-500 underline"
                    >
                      <span>Download</span>
                      <Upload size={24} />
                    </a>
                  )}
                </div>
                <span className="text-sm text-gray-300 block mt-1">
                  {formatTime(message.createdAt)}
                </span>
                {message.senderId === userInfo!.id && message.isRead && (
                  <BsCheckAll className="text-green-400" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <UploadPdfInmessage value={fileUrl} onchange={(url) => sendPdf(url)} />
          <input
            type="text"
            className="flex-grow rounded-full py-2 px-4 border border-gray-300"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded-full px-4 py-2 flex items-center"
            onClick={sendMessages}
          >
            <FaRegPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messagecontainerforapply;
