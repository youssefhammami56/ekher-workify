import { auth } from "@/auth";
import Image from "next/image";
import AdminNavbar from "../../_compoenets/admin_navbar";
import { getLoggedUser } from "@/actions/getloggeduser";
import { redirect } from "next/navigation";



const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const roleodloggeduser = await getLoggedUser();
 

   if (roleodloggeduser!.role == "FREELANCER") {
     redirect("/seller/dashboard");
   }
   if (roleodloggeduser!.role == "ADMIN") {
    redirect("admin/client");
  }
  return (
    <div className="h-full">
      <AdminNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
