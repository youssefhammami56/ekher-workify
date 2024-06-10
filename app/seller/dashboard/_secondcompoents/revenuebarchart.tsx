"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as Chartsjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getSellerrevenuefromjobofferbymonth,
  getsellerapply,
} from "@/actions/getsellerapplyt";

Chartsjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 interface JobsBarchartprops {
   jobs: Awaited<ReturnType<typeof getSellerrevenuefromjobofferbymonth>>;
 }

function RevenueBarchart({ jobs }:JobsBarchartprops) {

  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    // @ts-ignore
    labels: jobs.map((c: any) => c.name),
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Jobs",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  });

  useEffect(() => {
    setChartOptions({
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Jobs",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Revenue",
          },
        },
      },
    });
    setChartData({
      // @ts-ignore
      labels: jobs.map((c: any) => c.name),
      datasets: [
        {
          label: "Revenue",
          // @ts-ignore
          data: jobs.map((c: any) => c.value),
          borderColor: "rgba(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    });
  }, [jobs]);

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Your revenue from job offers by month</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full md:col-span-2 relative lg:h-[60vh] h-[40vh] m-auto p-4 border rounded-lg bg-white">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}

export default RevenueBarchart;
