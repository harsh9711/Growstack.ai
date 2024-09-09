"use client"
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Plus } from "lucide-react";
import { API_URL } from '@/lib/api';
import toast from 'react-hot-toast';
import instance from '@/config/axios.config';

// Define the PlanUsage type
interface PlanUsage {
  plan_id: string;
  plan_type: string;
  stripe_subscription_id: string;
}

export default function AddCreditDialog() {
  const [amount, setAmount] = useState<number | ''>(0); // Allow '' to handle empty state
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data;
      setPlanUsage(response.data.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error('Error fetching plan usage:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);
    if (value === '' || (numberValue >= 5 && numberValue <= 250)) {
      setAmount(value === '' ? '' : numberValue);
    }
  };

  const handleSubmit = async () => {
    try {
      const product = {
        plan_id: planUsage?.plan_id,
        plan_type: planUsage?.plan_type,
        subscription_id: planUsage?.stripe_subscription_id,
        amount: amount,
      };

     const response= await instance.post(`${API_URL}/users/api/v1/payments/adds-on`, {product});
      window.location.href=response.data.url;
      // toast.success('Payment added successfully');
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error('Error adding payment:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-primary-green text-white sheen transition-all duration-300">
          <Plus size={20} />
          Add to credit balance
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
              <input
                type="number"
                min="5"
                max="250"
                step="any"
                className="h-10 w-full"
                value={amount === '' ? '' : amount} 
                onChange={handleAmountChange}
              />
            </div>
            <p className="text-primary-black text-opacity-50">
              Enter an amount between <span>$</span>5 and <span>$</span>250
            </p>
          </div>
          <button
            className="w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-primary-green text-white sheen transition-all duration-300 mt-5"
            onClick={handleSubmit}
          >
            Add Amount
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
