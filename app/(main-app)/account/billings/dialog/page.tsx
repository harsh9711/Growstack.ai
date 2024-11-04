"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

interface BillingHistoryItem {
  amount_due: ReactNode;
  currency: string;
  due_date: string;
  subscription: string;
  invoice: string;
  status?: string;
}

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

interface AddCreditDialog2Props {
  //   onAddCredit: () => Promise<void>;
}

const AddCreditDialog2: React.FC<AddCreditDialog2Props> = () => {
  const [upcomingData, setUpcomingData] = useState<BillingHistoryItem | null>(
    null
  );
  const [unpaidData, setUnpaidData] = useState<BillingHistoryItem[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    string | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentMethods = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/payments/payment-methods`
      );
      setPaymentMethods(response.data.data);
    } catch (error: any) {
      console.error("Error fetching payment methods:", error.message);
    }
  };

  const fetchPendingDues = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/payments/pending-dues`
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const result = response.data.pendingDues;
      setUpcomingData(result.upcoming);
      setUnpaidData(result.unpaid);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    try {
      const response = await instance.post(
        `${API_URL}/users/api/v1/payments/pay-dues`,
        {
          paymentMethodId: selectedPaymentMethodId,
          subscriptionId: upcomingData?.subscription,
        }
      );
      console.log("Payment response:", response.data);
    } catch (error: any) {
      console.error("Error paying dues:", error.message);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
    fetchPendingDues();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={fetchPaymentMethods}
          className="w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-primary-green text-white transition-all duration-300"
        >
          Pay
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[584px]">
        <DialogHeader>
          <DialogTitle>Add to credit balance</DialogTitle>
        </DialogHeader>
        <div>
          <div className="space-y-2 mt-3">
            <label className="font-semibold">Amount to add</label>
            <div className="border border-primary-green rounded-xl p-2 flex items-center gap-2">
              <DollarSign className="text-primary-green" />
              {upcomingData?.amount_due}
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <label className="font-semibold">Payment method</label>
            <Select
              value={selectedPaymentMethodId}
              onValueChange={setSelectedPaymentMethodId}
            >
              <SelectTrigger className="w-full h-20 px-4">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {paymentMethods.map(paymentMethod => (
                    <SelectItem key={paymentMethod.id} value={paymentMethod.id}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10">
                          <Image
                            src="/assets/master-card.svg"
                            alt=""
                            width={100}
                            height={100}
                            className="w-full rounded-2xl h-full"
                          />
                        </div>
                        <div className="space-y-1">
                          <h1 className="text-lg">
                            {`${paymentMethod.card.brand.toUpperCase()} **** **** **** ${
                              paymentMethod.card.last4
                            }`}
                          </h1>
                          <p className="text-primary-black text-opacity-50 text-left">
                            Expires{" "}
                            {paymentMethod.card.exp_month
                              .toString()
                              .padStart(2, "0")}
                            /{paymentMethod.card.exp_year}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-end">
            <button
              onClick={handlePay}
              className="font-medium flex gap-3 px-3 py-4 bg-primary-green mt-4 justify-end text-white items-end transition-all duration-300 rounded-lg"
            >
              Pay
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditDialog2;
