import SellerNavbar from "@/app/landingpage/sellernavbar";
import { auth } from "@/auth";

const LayoutDashbord = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
     

      <main className=" pt-[50px] h-full">{children}</main>
    </div>
  );
};
export default LayoutDashbord;
