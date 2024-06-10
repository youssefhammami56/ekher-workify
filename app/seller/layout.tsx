import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import SellerNavbar from "../landingpage/sellernavbar";
import { getLoggedUser } from "@/actions/getloggeduser";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  const roleodloggeduser = await getLoggedUser();
  if (!user) {
    redirect("/sign-in");
  }

   if (roleodloggeduser!.role == "CLIENT") {
     redirect("/buyer/search");
   }
   if (roleodloggeduser!.role == "ADMIN") {
    redirect("admin/frelencers");
  }

  return (
    <div className="h-full">
      <SellerNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
