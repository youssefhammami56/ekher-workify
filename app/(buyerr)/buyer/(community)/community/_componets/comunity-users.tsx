import { getAllusersInComunityById } from "@/actions/get-users-in-community";
import ComunityUserItem from "./comunity-users-item";

interface ComunityUserProps {
  communityId: string;
}

export const ComunityUser = async ({ communityId }: ComunityUserProps) => {
  const users = await getAllusersInComunityById(communityId);

  return (
    <div className="hidden  lg:block    bg-gray-100  space-y-2 w-80 h-full">
      <div className=" px-7 text-sm font-semibold bg-white  py-8 border-l-2">
        Members - {users.length}
      </div>
      <div className="h-[580px] overflow-y-auto p-4 ">
        {/* @ts-ignore */}
        {users.map((user) => (
          <div key={user.id} className="flex  ">
            <ComunityUserItem user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
