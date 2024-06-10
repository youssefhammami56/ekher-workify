"use client";
import { reportclient } from "@/actions/reportclient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ReportBtnProps {
  clienttoreport: any
}

export function ReportBtn({ clienttoreport }: ReportBtnProps) {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const handelreport = async () => {
    setLoading(true);
    await reportclient(clienttoreport.id, report);
    toast.success("Reported successfully");
    setLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report {clienttoreport.email}</DialogTitle>
          <DialogDescription>
            Please tell us why you want to report {clienttoreport.email}
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="report">Report</Label>
        <Textarea
          id="report"
          placeholder="Enter your report here"
          className="mb-4"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />

        <DialogFooter>
          <Button
            type="submit"
            variant={"primary"}
            disabled={loading}
            onClick={handelreport}
          >
            {loading ? (
              <Loader2 className="animate-plus"></Loader2>
            ) : (
              "Send Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
