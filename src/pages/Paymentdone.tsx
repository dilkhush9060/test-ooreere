import {Button} from "@/components/ui/Button";
import {Card} from "@/components/ui/card";
import {CheckCircle2, XCircle} from "lucide-react";
import dateFormat from "dateformat";
import {useNavigate, useSearchParams} from "react-router";
import {usePDF} from "react-to-pdf";

interface PaymentDetails {
  refNumber: string;
  paymentDate: string;
  paymentTime: string;
  paymentMethod: string;
  senderName?: string;
  planPrice?: number;
  gst?: number;
  paymentCharge: number;
  paymentStatus: string;
  subTotal?: number;
}

export default function PaymentSuccess() {
  const {toPDF, targetRef} = usePDF({
    filename: "payment-invoice.pdf",
    page: {
      format: "A4",
      orientation: "portrait",
      margin: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("time");
  const status = searchParams.get("status") || "success";

  if (date === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md space-y-6 p-6">
          <div className="flex flex-col items-center space-y-2">
            <XCircle className="h-12 w-12 text-red-500" />
            <h1 className="text-xl font-medium text-red-500">
              Invalid Payment
            </h1>
            <p className="text-center text-gray-600">
              Payment information is missing or invalid.
            </p>
          </div>
          <Button onClick={() => navigate("/")} className="w-full">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const newDate = new Date(parseInt(date));

  const paymentDetails: PaymentDetails = {
    refNumber: searchParams.get("refNumber") || "123456789",
    paymentDate: dateFormat(newDate, "dS mmmm yyyy"),
    paymentTime: dateFormat(newDate, "h:MM TT"),
    paymentMethod: searchParams.get("method") || "UPI",
    senderName: searchParams.get("name") || "John Doe",
    planPrice: parseFloat(searchParams.get("planPrice") || "1000"),
    gst: parseFloat(searchParams.get("GST") || "180"),
    paymentCharge: parseFloat(searchParams.get("PlatformCharge") || "10"),
    paymentStatus: searchParams.get("status") || "success",
    subTotal: parseFloat(searchParams.get("subTotal") || "0"),
  };

  const handleDownloadPDF = () => {
    if (targetRef.current) {
      toPDF();
    } else {
      console.error("Target element not found for PDF generation");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md space-y-6 p-6">
          {/* PDF Content with better spacing and structure */}
          <div
            ref={targetRef}
            className="pdf-content"
            style={{
              padding: "16px",
              backgroundColor: "white",
              width: "100%",
              minHeight: "400px",
            }}
          >
            <div className="mb-6 flex flex-col items-center space-y-2">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <h1 className="text-xl font-medium text-green-500">
                Payment Successful!
              </h1>
              <p className="text-3xl font-bold">₹ {paymentDetails?.subTotal}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Ref Number</span>
                <span className="font-medium">{paymentDetails.refNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date</span>
                <span className="font-medium">
                  {paymentDetails.paymentDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Time</span>
                <span className="font-medium">
                  {paymentDetails.paymentTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">
                  {paymentDetails.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sender Name</span>
                <span className="font-medium">{paymentDetails.senderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan Price</span>
                <span className="font-medium">
                  ₹ {paymentDetails.planPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST</span>
                <span className="font-medium">₹ {paymentDetails.gst}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Charge</span>
                <span className="font-medium">
                  ₹ {paymentDetails.paymentCharge}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold text-gray-600">
                  Payment Status
                </span>
                <span className="font-medium capitalize text-green-500">
                  {paymentDetails.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/my-purchase")}
            >
              Back
            </Button>
            <Button className="w-full" onClick={handleDownloadPDF}>
              Get PDF Invoice
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md space-y-6 p-6">
        <div
          ref={targetRef}
          className="pdf-content"
          style={{
            padding: "16px",
            backgroundColor: "white",
            width: "100%",
            minHeight: "400px",
          }}
        >
          <div className="mb-6 flex flex-col items-center space-y-2">
            <XCircle className="h-12 w-12 text-red-500" />
            <h1 className="text-xl font-medium text-red-500">
              Payment Failed!
            </h1>
            <p className="text-3xl font-bold text-red-500">
              ₹ {paymentDetails?.subTotal}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Ref Number</span>
              <span className="font-medium">{paymentDetails.refNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Date</span>
              <span className="font-medium">{paymentDetails.paymentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Time</span>
              <span className="font-medium">{paymentDetails.paymentTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">
                {paymentDetails.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sender Name</span>
              <span className="font-medium">{paymentDetails.senderName}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold text-gray-600">
                Payment Status
              </span>
              <span className="font-medium capitalize text-red-500">
                {paymentDetails.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/my-purchase")}
          >
            Back
          </Button>
          <Button className="w-full" onClick={() => navigate("/pricing")}>
            Try Again
          </Button>
        </div>
      </Card>
    </div>
  );
}
