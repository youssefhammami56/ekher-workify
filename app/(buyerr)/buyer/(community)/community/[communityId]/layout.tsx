import SellerNavbar from "@/app/landingpage/sellernavbar";
import { auth } from "@/auth";

const LayoutDashbord = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50"></div>

      <main className=" pt-[50px] h-full">{children}</main>
    </div>
  );
};
export default LayoutDashbord;
