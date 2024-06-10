import { ComunityUser } from "../_componets/comunity-users";
import ComunityPostList from "../_componets/comunity-posts-list";
import Message from "../_componets/message";
import ComunityList from "../_componets/list-comunity";
import { getPostsInCommunity } from "@/actions/get-posts-comunity-id";
import { getCommNameByid } from "@/actions/getCommunityName";
import { DialogDemo } from "@/app/landingpage/createcommunitybtn";
import { getAllCommunity } from "@/actions/get-all-community";

const Page = async (params: {
  params: {
    communityId: string;
  };
}) => {
  const extractedComunityIdandPostId = params.params.communityId.split("post");
  const comunityId = extractedComunityIdandPostId[0];
  const postId = extractedComunityIdandPostId[1];
  const posts = await getPostsInCommunity(comunityId);
  const communityName = await getCommNameByid(comunityId);
  const comunity = await getAllCommunity();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-500">All Workify Communities</h1>
        </div>
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-6 w-1/4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
              <DialogDemo />
              <ComunityList comunity={comunity} />
            </div>
          </div>
          <div className="flex flex-col space-y-6 w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
              {posts.length === 0 ? (
                <div className="text-gray-500 text-center">
                  No posts yet in this community
                </div>
              ) : (
                <ComunityPostList posts={posts} postId={postId} />
              )}
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
              <Message communityId={comunityId!} />
            </div>
          </div>
          <div className="flex flex-col space-y-6 w-1/4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
              <ComunityUser communityId={comunityId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
