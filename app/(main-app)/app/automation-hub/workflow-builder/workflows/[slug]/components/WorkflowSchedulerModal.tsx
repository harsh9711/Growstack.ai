"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/public/svgs/spinner";
import { Edit } from "lucide-react";
import Dropdown from "@/components/Dropdown";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { days_of_week, frequency_options, timezones } from "./constants/data";
import { Input } from "@/components/ui/input";
import { WorkFlowData } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../../../../styles/datepicker.css";
import axios from "axios";

interface SchedulerModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  workFlowData: WorkFlowData;
  setWorkFlowData: (workflow: WorkFlowData) => void;
}

type Fields = {
  frequency: string;
  dayOfWeek: string[];
  dayOfMonth: string;
  time: string;
  timezone: string;
};

function WorkflowSchedulerModal({
  show,
  setShow: onHide,
  workFlowData,
}: SchedulerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [fields, setFields] = useState<Fields>({
    frequency: "",
    dayOfWeek: [],
    dayOfMonth: "",
    time: "",
    timezone: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleScheduleWorkflow = async () => {
    setIsPending(true);

    if (fields.frequency === "weekly" && fields.dayOfWeek.length === 0) {
      toast.error("Please select a day of the week for weekly frequency.");
      setIsPending(false);
      return;
    }
    const updatedWorkflowData = workFlowData.input_configs.map((data: any) => ({
      variableName: data.variableName,
      variableValue: data.default_value,
    }));
    try {
      const response = await axios.post(
        `http://localhost:5000/workflow/6745a1f9f7d11db833a2ad12/schedule`,
        {
          ...fields,
          workflowPayload: updatedWorkflowData,
        }
      );
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
    }
  };

  const handleChangeField = (field: keyof Fields, value: string) => {
    setFields(prevFields => ({
      ...prevFields,
      [field]: value || "-",
      ...(field === "frequency" && {
        dayOfWeek: [],
        dayOfMonth: "",
        time: "",
        timezone: "",
      }),
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.getElementById("days-dropdown");
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="max-w-[80%] pt-0 ">
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
                showTitle
                title="Frequency"
                value={fields.frequency}
                onChange={value => handleChangeField("frequency", value)}
                required
              />
              <Dropdown
                label="Select Timezone"
                items={timezones}
                showTitle
                title="Timezone"
                value={fields.timezone}
                onChange={value => handleChangeField("timezone", value)}
                required
              />

              {fields.frequency === "weekly" && (
                <div className="relative">
                  <label className="text-[15px]">Days of the Week</label>
                  <div
                    className="w-full p-4 h-[46px] border border-gray-100 bg-[#F5F5F5] rounded-lg mt-2 flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="text-sm">
                      {fields.dayOfWeek.length
                        ? `${fields.dayOfWeek.length} days selected`
                        : "Select days of week"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
                      <div className="p-2 space-y-1">
                        {days_of_week.map(day => (
                          <div
                            key={day}
                            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                            onClick={e => {
                              e.stopPropagation();
                              setFields(prevFields => ({
                                ...prevFields,
                                dayOfWeek: prevFields.dayOfWeek.includes(day)
                                  ? prevFields.dayOfWeek.filter(d => d !== day)
                                  : [...prevFields.dayOfWeek, day],
                              }));
                            }}
                          >
                            <Checkbox
                              id={day}
                              checked={fields.dayOfWeek.includes(day)}
                              onCheckedChange={checked => {
                                setFields(prevFields => ({
                                  ...prevFields,
                                  dayOfWeek: checked
                                    ? [...prevFields.dayOfWeek, day]
                                    : prevFields.dayOfWeek.filter(
                                        d => d !== day
                                      ),
                                }));
                              }}
                            />
                            <label
                              htmlFor={day}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full cursor-pointer"
                            >
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {fields.frequency === "monthly" && (
                <div className="space-y-2">
                  <label className="text-[15px]">Days of the Month</label>
                  <div
                    className="relative w-full border border-gray-100 bg-[#F5F5F5] rounded-lg p-4"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="cursor-pointer flex justify-between items-center">
                      <span className="text-sm">
                        {/* {fields.dayOfMonth || "Select day of the month"} */}
                        {typeof fields.dayOfMonth === "string"
                          ? fields.dayOfMonth
                          : "Select day of the month"}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {isOpen && (
                      <div className="absolute left-0 !z-50 w-[50%] mt-2 bg-white border rounded-lg shadow-lg">
                        <div className="p-4">
                          <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              day => (
                                <button
                                  key={day}
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleChangeField(
                                      "dayOfMonth",
                                      day.toString()
                                    );
                                    setIsOpen(false);
                                  }}
                                  className={`
                                h-8 w-8 rounded-full flex items-center justify-center text-sm
                                ${
                                  fields.dayOfMonth === day.toString()
                                    ? "bg-primary-green text-white"
                                    : "hover:bg-gray-100"
                                }
                              `}
                                >
                                  {day}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Needed if we integrate this one */}
              {/* {fields.frequency === "custom" && (
                <div className="space-y-2">
                  <label className="text-[15px]">Date</label>
                  <div className="relative w-full p-4 h-[50px] border border-gray-100 bg-[#F5F5F5] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/60 transition flex items-center">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: any) => {
                        setSelectedDate(date);
                        handleChangeField("dayOfMonth", date);
                      }}
                      timeIntervals={1}
                      dateFormat="MMMM d, yyyy"
                      className="rounded-xl bg-[#F5F5F5]"
                      placeholderText="Select date and time"
                      minDate={new Date()}
                      calendarClassName="custom-calendar"
                    />
                  </div>
                </div>
              )} */}
              <div className="space-y-2">
                <label className="text-[15px]">Time</label>
                <Input
                  type="time"
                  value={fields.time}
                  onChange={e => handleChangeField("time", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 w-full">
            <button
              className="h-12 w-full max-w-[100px] px-6 bg-white border text-primary-green border-primary-green rounded-xl mt-6"
              onClick={() => onHide(false)}
            >
              Cancel
            </button>
            <button
              className="h-12 w-full max-w-[160px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
              onClick={handleScheduleWorkflow}
            >
              {isPending && <Spinner />}
              Continue
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WorkflowSchedulerModal;
