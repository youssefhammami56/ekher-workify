"use client";
import { getPostsInCommunity } from "@/actions/get-posts-comunity-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";

interface ComunityPostItemProps {
  post: Awaited<ReturnType<typeof getPostsInCommunity>>[0];
  onchange: () => void;
  postId?: string;
}

export default function ComunityPostItem({
  post,
  onchange,
  postId,
}: ComunityPostItemProps) {
  return (
    <div className="hover:bg-slate-300/20 dark:hover:bg-gray-500   dark:border-gray-500  transition-colors duration-200 ease-in-out p-2">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar>
            <AvatarImage
              alt={post.user.username!}
              src={post.user.profileImage || "/placeholder.svg?height=32&width=32"}
              loading="lazy"
            />
            <AvatarFallback>{post.user.username![0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-semibold">{post.user.username}</div>
          <div className="text-sm text-gray-500">
            <p>{post.content}</p>
          </div>
          {post.imageUrl ? (
            <Image
              src={post.imageUrl!}
              width={600}
              height={500}
              alt="image"
              className="rounded-lg"
              loading="lazy"
            
            />
          ) : null}

          <div className="flex flex-col space-y-2">
            <div className="text-xs text-blue-600 dark:text-blue-500 ">
              {/* i want to do the creation time - current time */}
              {formatDistance(new Date(post?.createdAt!), new Date(), {
                addSuffix: true,
              })}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-gray-500">
                 
                </div>
                <div className="text-xs text-gray-500">
                  <span>{post.PostResponse.length || 0}</span> Replies
                </div>
                <div
                  className="text-xs text-gray-500 cursor-pointer "
                  onClick={onchange}
                >
                  Reply
                </div>
              </div>
            </div>
            {/* @ts-ignore */}
            {post.PostResponse.map((response) => (
              <div key={response.id} className="flex items-start space-x-4 ">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar>
                    <AvatarImage
                      alt={response.user?.username!}
                      src={
                        response.user?.username ||
                        "/placeholder.svg?height=32&width=32"
                      }
                    />
                    <AvatarFallback>
                      {response.user?.username![0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="text-sm font-semibold">
                    {response.user?.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{response.content}</p>
                    {response.imageUrl ? (
                      <Image
                        src={response.imageUrl!}
                        width={600}
                        height={500}
                        alt="image"
                        className="rounded-lg"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="text-xs text-blue-600 dark:text-blue-500 ">
                      {formatDistance(
                        new Date(response?.createdAt!),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="border-b border-gray-300 dark:border-gray-700 align-center  px-64 mt-6 mb-6"></div>
      </div>{" "}
    </div>
  );
}
