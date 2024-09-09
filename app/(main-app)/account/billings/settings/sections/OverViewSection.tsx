import React, { useEffect, useState } from 'react';
import AddCreditDialog from '../components/AddCreditDialog';
import Motion from '@/components/Motion';
import instance from '@/config/axios.config';
import { API_URL } from '@/lib/api';
import toast from 'react-hot-toast';

interface PlanUsage {
  usage_amount: number;
}

export default function OverViewSection() {
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      console.log(data);
      setPlanUsage(data);

      // if (data.usage_amount === 0) {
      //   toast.error('Trial expired');
      //   window.location.href = '/Payment';
      // }
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

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a more styled loading component
  }

  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="mt-10 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-primary-black text-opacity-50">Credit balance</h2>
          <h1 className="text-4xl font-semibold">{planUsage?.usage_amount}</h1>
        </div>
        <AddCreditDialog />
      </div>
      {/* <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 mt-10 flex items-center gap-5">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Auto recharge is off</h1>
          <p className="leading-relaxed">
            When your credit balance reaches $0, your API requests will stop working. Enable automatic recharge to automatically keep your credit balance topped
            up.
          </p>
        </div>
        <p className="text-[#00B871] text-[17px] whitespace-nowrap hover:text-opacity-60 cursor-pointer">Enable auto recharge</p>
      </div> */}
    </Motion>
  );
}
