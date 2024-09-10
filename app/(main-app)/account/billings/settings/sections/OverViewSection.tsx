import React, { useEffect, useState } from 'react';
import AddCreditDialog from '../components/AddCreditDialog';
import Motion from '@/components/Motion';
import instance from '@/config/axios.config';
import { API_URL } from '@/lib/api';
import toast from 'react-hot-toast';
import "../../../../../../styles/loading.css"
interface PlanUsage {
  usage_amount: number;
}

export default function OverViewSection() {
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false); // Add state for cancel button loading

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      console.log(data);
      setPlanUsage(data);
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

  const handleCancelSubscription = async () => {
    setCancelLoading(true); 
    try {
      const response = await instance.put(`${API_URL}/users/api/v1/payments/cancel-subscription`);
      toast.success('Subscription canceled successfully');
      window.location.href='/Payment';
      console.log('Cancel Subscription Response:', response.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error('Error cancelling subscription:', error);
    } finally {
      setCancelLoading(false); 
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  if (loading) {
    return  <div className="loading-container">
    <div className="loading-card">
      <div className="card-chip"></div>
      <div className="card-lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="card-wave"></div>
    </div>
    <p>Showing your credits...</p>
  </div>; 
  }

  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="mt-10 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-primary-black text-opacity-50">Credit balance</h2>
          <h1 className="text-4xl font-semibold">{planUsage?.usage_amount}</h1>
        </div>
        <div className="flex flex-row gap-x-6 items-end">
          <AddCreditDialog />
          <button
            className={`w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-white border-red-500 border hover:font-semibold hover:border-2 text-red-500 sheen transition-all duration-300 ${
              cancelLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleCancelSubscription}
            disabled={cancelLoading} // Disable button while canceling
          >
            {cancelLoading ? 'Canceling...' : 'Cancel Subscription'}
          </button>
        </div>
      </div>
    </Motion>
  );
}
