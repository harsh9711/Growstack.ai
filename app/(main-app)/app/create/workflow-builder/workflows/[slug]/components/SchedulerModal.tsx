"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Spinner from "@/public/svgs/spinner";
import { useRouter } from "next/navigation";
import instance from "@/config/axios.config";
import { Edit } from "lucide-react";
import Dropdown from "@/components/Dropdown";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import { useState } from "react";
import { days_of_week, frequency_options, timezones } from "./constants/data";
import { Input } from "@/components/ui/input";

interface SchedulerModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  workFlowData: WorkFlowData;
  setWorkFlowData: (workflow: WorkFlowData) => void;
  onAddSchedule?: () => void;
}

type Fields = {
  frequency: string;
  day_of_week: string;
  time: string;
  timezone: string;
};

function SchedulerModal({ show, setShow: onHide, workFlowData, setWorkFlowData, onAddSchedule }: SchedulerModalProps) {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({
    frequency: "",
    day_of_week: "",
    time: "",
    timezone: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleScheduleWorkflow = async () => {
    setIsPending(true);

    if (fields.frequency === "weekly" && !fields.day_of_week) {
      toast.error("Please select a day of the week for weekly frequency.");
      setIsPending(false);
      return;
    }

    try {
      const runner_payload = {
        actions_with_runs: workFlowData.actions.map((action) => ({ action: action._id })),
        inputs: workFlowData.input_configs.map((input) => ({
          variable_name: input.variable_name,
          variable_value: input.default_value,
        })),
        outputs: workFlowData.output_configs.map((output) => ({
          variable_name: output.display_name,
          variable_value: output.value,
          variable_type: output.type,
        })),
      };
      const response = await instance.post(`${API_URL}/workflow/api/v1/schedule`, {
        workflow_id: workFlowData.workflow_id,
        ...fields,
        runner_payload,
      });
      toast.success(response.data.message);
      onHide(false);
    } catch (error: any) {
      console.error("Error running workflow:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsPending(false);
      onAddSchedule && onAddSchedule();
    }
  };

  const handleChangeField = (field: keyof Fields, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleChangeInput = (value: string, idx: number) => {
    const updatedInputs = [...workFlowData.input_configs];
    updatedInputs[idx].default_value = value;
    setWorkFlowData({ ...workFlowData, input_configs: updatedInputs });
  };

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="max-w-[80%] pt-0">
        <DialogHeader className="py-4 border-b">
          <DialogTitle>Schedule a workflow runtime</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className="bg-primary-green p-2.5 rounded-[10px] text-white">
              <Edit size={18} />
            </div>
            <h2 className="font-medium text-lg">Input</h2>
          </div>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Dropdown
                label="Select frequency"
                items={frequency_options}
                showTitle={true}
                title="Frequency"
                value={fields.frequency}
                onChange={(value) => handleChangeField("frequency", value)}
                required={true}
              />
              <Dropdown
                label="Select Timezone"
                items={timezones}
                showTitle={true}
                title="Timezone"
                value={fields.timezone}
                onChange={(value) => handleChangeField("timezone", value)}
                required={true}
              />
              <Dropdown
                label="Select day of the week"
                items={days_of_week}
                showTitle={true}
                title="Day of the week"
                value={fields.day_of_week}
                onChange={(value) => handleChangeField("day_of_week", value)}
                required={fields.frequency === "weekly"} // Only required if frequency is "weekly"
                disabled={fields.frequency !== "weekly"}
              />
              <div className="space-y-2">
                <label className="text-[15px]">Time</label>
                <Input type="time" value={fields.time} onChange={(e) => handleChangeField("time", e.target.value)} />
              </div>
            </div>
            {workFlowData.input_configs.map((input, idx) => (
              <div key={idx}>
                <h2 className="font-medium">{input.display_name}</h2>
                <div className="font-light mt-3 mb-2 text-[14px]">{input.description}</div>
                <input
                  type="text"
                  placeholder={input.placeholder}
                  className="w-full p-4 h-[46px] border border-gray-100 bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/60 transition"
                  value={input.default_value}
                  onChange={(e) => handleChangeInput(e.target.value, idx)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 w-full">
            <button
              className="h-12 w-full max-w-[100px] px-6 bg-white border text-primary-green border-primary-green rounded-xl mt-6"
              onClick={() => onHide(false)}>
              Cancel
            </button>
            <button
              className="h-12 w-full max-w-[160px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
              onClick={handleScheduleWorkflow}>
              {isPending && <Spinner />}
              Continue
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SchedulerModal;
