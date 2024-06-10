"use client";
import React, { useEffect, useRef } from "react";
import ComunityPostItem from "./comunity-post-items";
import MessageReply from "./message-reply";
import { getPostsInCommunity } from "@/actions/get-posts-comunity-id";

interface ComunityPostListProps {
  posts: Awaited<ReturnType<typeof getPostsInCommunity>>;
  postId?: string;
}
export default function ComunityPostList({
  posts,
  postId,
}: ComunityPostListProps) {
  const [posttoreply, setPostToReply] = React.useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [posts]);

  return (
    <div ref={containerRef} className="flex flex-col max-h-[600px] overflow-y-auto">
      {postId &&
        // @ts-ignore
        posts.map((post) => (
          <div key={post.id}>
            {post.id === postId && (
              <ComunityPostItem
                post={post}
                onchange={() => setPostToReply(post.id)}
                postId={postId}
              />
            )}
          </div>
        ))}
      {/* @ts-ignore */}
      {posts.map((post) => (
        <div key={post.id}>
          {post.id !== postId && (
            <ComunityPostItem
              post={post}
              onchange={() => setPostToReply(post.id)}
              postId={postId}
            />
          )}
          {posttoreply === post.id && (
            <div className="ml-8">
              <MessageReply
                communityId={post.communityId}
                posttoreply={post.id}
                onclicke={() => setPostToReply(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
