"use client";
import React, { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { getMessageInOrder } from "@/actions/getmessageinorder";
import { getLoggedUser } from "@/actions/get-logged-user";
import { sendMessage } from "@/actions/sendmessage";
import { senFile, sendMessageinapply } from "@/actions/sendMessageintheapply";
import { Upload } from "lucide-react";
import UploadPhotoProfile from "@/app/landingpage/UploadPhotoProfile";
import UploadPdfInmessage from "./uploadpdf";

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

  function formatTime(timestamp: any) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    // minutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  const [messageText, setMessageText] = useState("");
  const router = useRouter();

  const sendMessages = async () => {
    if (messageText.length) {
      await sendMessageinapply(applyId, messageText, fileUrl, fileName);
      setMessageText("");
      router.refresh();
    }
  };

  const sendPdf = async (url: string) => {
    await senFile(applyId, url);
    router.refresh();
  };

  return (
    <div className="h-[80vh]">
      <div className="max-h-[80vh]   flex flex-col justify-center items-center">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border flex flex-col">
          <div className="mt-8">
            <div className="space-y-4 h-[50vh] overflow-y-auto pr-4 ">
              {/* @ts-ignore */}

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
                    className={`inline-block rounded-lg ${
                      message.senderId === userInfo!.id
                        ? "bg-[#1d71bf] text-white"
                        : "bg-gray-100 text-gray-800"
                    } px-4 py-2 max-w-xs break-all`}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      {message.text && (
                        <p className="text-sm">{message.text}</p>
                      )}

                      {message.fileUrl && (
                        <a
                          href={message.fileUrl}
                          target="_blank"
                          className="flex space-x-2"
                        >
                          <span className="text-sm">Download</span>
                          <Upload size={24} />
                        </a>
                      )}
                    </div>

                    <span className="text-sm text-gray-600">
                      {formatTime(message.createdAt)}
                    </span>
                    <span>
                      {message.senderId === userInfo!.id && message.isRead && (
                        <BsCheckAll />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center">
            <UploadPdfInmessage
              value={fileUrl}
              onchange={(url) => sendPdf(url)}
            />
            <input
              type="text"
              className="rounded-full py-2 px-4 mr-2 w-full"
              placeholder="Type a message..."
              name="message"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <button
              type="submit"
              className="bg-[#1DBF73] text-white rounded-full px-4 py-2"
              onClick={sendMessages}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messagecontainerforapply;
