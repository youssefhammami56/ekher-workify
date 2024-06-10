import { getmygigsincludetheirrevneue } from "@/actions/dashboard/getmygigsincludetheirrevnue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const OrderWithRevenue = async () => {
  const mygigs = await getmygigsincludetheirrevneue();
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Orders with Revenue</CardTitle>
      </CardHeader>

      <CardContent className="overflow-y-auto max-h-96 ">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Service Name</th>
              <th className="px-4 py-2">Total Orders</th>
              <th className="px-4 py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
             {/* @ts-ignore */}
            {mygigs.map((gig) => (
              <tr
                key={gig.id}
                className="border-b border-muted-foreground-2 hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-4 py-2">{gig.title}</td>
                <td className="px-4 py-2">{gig.Orders.length}</td>
                <td className="px-4 py-2 flex items-center">
                  {gig.revenue}{" "} (TND)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default OrderWithRevenue;
