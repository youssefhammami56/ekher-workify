import Profilecomp from "./profilecomp";
import { getLoggedUser } from "@/actions/get-logged-user";

const Profile = async () => {
  const userInfo = await getLoggedUser();

  return (
    <div className="mt-32 w-full flex justify-center items-center">
      <Profilecomp userInfo={userInfo} />;
    </div>
  );
};

export default Profile;
