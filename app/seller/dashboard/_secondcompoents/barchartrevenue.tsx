import {
  Card,
  CardContent
} from "@/components/ui/card";
import { getSellerrevenuefromjobofferbymonth } from "@/actions/getsellerapplyt";
import RevenueBarchart from "./revenuebarchart";

const Barchartrevnue = async () => {
  const jobofferrevenuebymonth = await getSellerrevenuefromjobofferbymonth();
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardContent>
        <RevenueBarchart jobs={jobofferrevenuebymonth} />
      </CardContent>
    </Card>
  );
};

export default Barchartrevnue;
