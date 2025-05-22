import ManagePaymentClient from "@/components/module/user-review/manage-payment";
import { getMyAllPaymentsApi } from "@/services/UserDashboard/PaymentServices";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function ManagePaymentSection() {
  const payments = (await getMyAllPaymentsApi()).data;
  return (
    <div className="p-[15px]">
      <Suspense
        fallback={
          <div className="w-full h-[100vh] flex items-center justify-center">
            <Loader className="w-[80px] h-12 animate-spin" />
          </div>
        }
      >
        <ManagePaymentClient payments={payments} />
      </Suspense>
    </div>
  );
}
