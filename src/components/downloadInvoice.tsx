import {Button} from "@/components/ui/Button";
// import {Card} from "@/components/ui/card";
import {CheckCircle2, XCircle} from "lucide-react";
import dateFormat from "dateformat";
import {useNavigate} from "react-router";
import {usePDF} from "react-to-pdf";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";

// Interface definitions
export interface Account {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Plan {
  _id: string;
  name: string;
  price: string;
}

export interface City {
  _id: string;
  name: string;
}

export interface Order {
  _id: string;
  account: Account;
  plan: Plan | null;
  city: City;
  months: number;
  totalPaidAmount: number;
  razorpay_order_id: string;
  isSuccessPayment: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

interface DownloadInvoiceProps {
  order: Order;
  gst?: number;
  paymentCharge?: number;
}

const DownloadInvoice = ({
  order,

  gst = 0,
  paymentCharge = 0,
}: DownloadInvoiceProps) => {
  const [open, setOpen] = useState(false);
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

  const handleDownloadPDF = () => {
    if (targetRef.current) {
      toPDF();
    } else {
      console.error("Target element not found for PDF generation");
    }
  };

  // Format dates from the order
  const paymentDate = dateFormat(new Date(order.createdAt), "dS mmmm yyyy");
  const paymentTime = dateFormat(new Date(order.createdAt), "h:MM TT");

  // Calculate plan price (subtract GST and payment charge from total)
  const planPrice = order.totalPaidAmount - gst - paymentCharge;

  // PDF Content Component (reusable for both success and failed states)
  const PDFContent = () => (
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
        {order.isSuccessPayment ? (
          <>
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h1 className="text-xl font-medium text-green-500">
              Payment Successful!
            </h1>
          </>
        ) : (
          <>
            <XCircle className="h-12 w-12 text-red-500" />
            <h1 className="text-xl font-medium text-red-500">
              Payment Failed!
            </h1>
          </>
        )}
        <p
          className={`text-3xl font-bold ${order.isSuccessPayment ? "text-black" : "text-red-500"}`}
        >
          ₹ {order.totalPaidAmount}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Ref Number</span>
          <span className="font-medium">
            {order.razorpay_payment_id || order.razorpay_order_id}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Date</span>
          <span className="font-medium">{paymentDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Time</span>
          <span className="font-medium">{paymentTime}</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium">{paymentMethod}</span>
        </div> */}
        <div className="flex justify-between">
          <span className="text-gray-600">Sender Name</span>
          <span className="font-medium">{order.account.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Plan</span>
          <span className="font-medium">{order.plan?.name || "N/A"}</span>
        </div>
        {order.isSuccessPayment && (
          <div className="flex justify-between">
            <span className="text-gray-600">Plan Price</span>
            <span className="font-medium">₹ {planPrice}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Duration</span>
          <span className="font-medium">{order.months} months</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">City</span>
          <span className="font-medium">{order.city.name}</span>
        </div>
        {order.isSuccessPayment && gst > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">GST</span>
            <span className="font-medium">₹ {gst}</span>
          </div>
        )}
        {order.isSuccessPayment && paymentCharge > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Charge</span>
            <span className="font-medium">₹ {paymentCharge}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-2">
          <span className="font-semibold text-gray-600">Payment Status</span>
          <span
            className={`font-medium capitalize ${order.isSuccessPayment ? "text-green-500" : "text-red-500"}`}
          >
            {order.isSuccessPayment ? "Success" : "Failed"}
          </span>
        </div>
      </div>
    </div>
  );

  // Success payment - full screen layout
  if (order.isSuccessPayment) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Download Invoice</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-green-500">
              Payment Successful Invoice
            </DialogTitle>
            <DialogDescription className="text-center">
              Invoice details for successful payment transaction
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <PDFContent />
          </div>

          <DialogFooter className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false);
                navigate("/my-purchase");
              }}
            >
              Back
            </Button>
            <Button className="w-full" onClick={handleDownloadPDF}>
              Get PDF Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Failed payment - dialog layout
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Download Invoice</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-red-500">
            Payment Failed Invoice
          </DialogTitle>
          <DialogDescription className="text-center">
            Invoice details for failed payment transaction
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <PDFContent />
        </div>

        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setOpen(false);
              navigate("/my-purchase");
            }}
          >
            Back
          </Button>
          <Button className="w-full" onClick={handleDownloadPDF}>
            Get PDF Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadInvoice;
