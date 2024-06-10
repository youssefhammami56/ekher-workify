import ClientNavbar from "@/app/landingpage/buyernavbar";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <ClientNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
