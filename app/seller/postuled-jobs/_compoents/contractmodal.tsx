"use client";
import { getContractByApplyId } from "@/actions/getthecontract";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface Apply {
  applyId: string;
}

export function ContractModal({ applyId }: Apply) {
  const pathnames = usePathname();
  const isfrelecner = pathnames.includes("seller");
  const isclient = pathnames.includes("buyer");
  const [contract, setContract] =
    React.useState<Awaited<ReturnType<typeof getContractByApplyId>>>();
  const user = useSession().data?.user;

  useEffect(() => {
    const fetchApply = async () => {
      const res = await getContractByApplyId(applyId);
      setContract(res);
    };

    fetchApply();
  }, [applyId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const pdf = new jsPDF();
    const element = document.getElementById("contract-content")!;
    const scale = 2; // Increase this value for a higher resolution
    html2canvas(element, { scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("freelance_contract.pdf");
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="primary" size="sm" className="flex items-center">
          Contract
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div id="contract-content" className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
              {isfrelecner ? "Freelancer" : "Client"} contract
            </h1>

            <p className="mb-4">
              This agreement is made between{" "}
              <strong>{contract?.freelancer.username}</strong>, hereinafter
              referred to as the "Freelancer", and{" "}
              <strong>{contract?.jobApplication.job.createdBy.username}</strong>
              , hereinafter referred to as the "Client".
            </p>
            <h2 className="text-lg font-bold mt-4 mb-2">Scope of Work</h2>
            <p className="mb-4">
              The Freelancer agrees to provide{" "}
              <strong>{contract?.jobApplication.job.description}</strong> to the
              Client.
            </p>
            <h2 className="text-lg font-bold mt-4 mb-2">Payment Terms</h2>
            <p className="mb-4">
              The Client agrees to pay the Freelancer{" "}
              <strong>{contract?.jobApplication.job.price}</strong> for the
              services provided.
            </p>
            <h2 className="text-lg font-bold mt-4 mb-2">Termination</h2>
            <p className="mb-4">
              Either party may terminate this agreement with written notice.
            </p>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePrint}>Print</AlertDialogAction>
          <AlertDialogAction onClick={handleDownload}>
            Download
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
