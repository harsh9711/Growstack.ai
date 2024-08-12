"use client";

import React, { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { Clock, Edit, Trash2 } from "lucide-react";
import { formatDateTime } from "@/utils/dates";
import SchedulerModal from "../SchedulerModal";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
interface Props {
  workflowId: string;
}

type WorkflowSchedule = {
  _id: string;
  user_id: string;
  workflow_id: string;
  frequency: "daily" | "weekly" | "monthly";
  day_of_week?: string;
  time: string;
  timezone: string;
  cronJobId: string;
  triggered_times: string[];
  cronExpression: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Schedules: React.FC<Props> = ({ workflowId }) => {
  const [loading, setLoading] = useState(false);
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false);
  const [schedule, setSchedule] = useState<WorkflowSchedule | null>(null);
  const [isNewScheduleAdded, setIsNewScheduleAdded] = useState(false);
  const [workFlowData, setWorkFlowData] = useState<WorkFlowData>({
    name: "",
    actions: [],
    input_configs: [],
    output_configs: [],
    social_media_requirement: false,
    status: "",
    workflow_id: "",
  });

  const fetchWorkflowData = async (id: string) => {
    setLoading(true);
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1/${id}`);
      setWorkFlowData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching workflow data:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedule = async (id: string) => {
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1/schedule/${id}`);
      const scheduleData = response.data.data.length === 0 ? null : response.data.data;
      setSchedule(scheduleData);
    } catch (error: any) {
      console.error("Error fetching schedule:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const [deleteRequestPending, setDeleteRequestPending] = useState(false);
  const handleDeleteSchedule = async () => {
    setDeleteRequestPending(true);
    try {
      const response = await instance.delete(`${API_URL}/workflow/api/v1/schedule/${workflowId}`);
      fetchSchedule(workflowId);
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setDeleteRequestPending(false);
    }
  };

  useEffect(() => {
    if (workflowId) {
      setLoading(true);
      fetchSchedule(workflowId);
      fetchWorkflowData(workflowId);
    }
  }, [workflowId, isNewScheduleAdded]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-5 justify-center items-center min-h-[30vh]">
        <Spinner color="black" size={50} />
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="!bg-white p-8 rounded-3xl shadow-gray-200 shadow-2xl mt-5">
        {!schedule ? (
          <div className="h-60 flex flex-col justify-center items-center gap-3">
            <h1 className="text-xl">Oops!</h1>
            <p>No schedules planned for this work flow</p>
            <button
              className="w-full max-w-fit bg-primary-green text-white sheen transition duration-500 px-5 h-12 rounded-xl flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsSchedulerModalOpen(true)}>
              Create a new schedule
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-medium flex items-center gap-2">
                <Clock size={22} />
                Schedule Details
              </h1>
              <button
                className="w-full max-w-fit bg-primary-green text-white sheen transition duration-500 px-5 h-12 rounded-xl flex items-center gap-2 whitespace-nowrap"
                onClick={() => setIsSchedulerModalOpen(true)}>
                Create a new schedule
              </button>
            </div>
            <div className="rounded-lg border   mt-5 bg-white ">
              <Table className="">
                <TableHeader>
                  <TableRow className="bg-[#0347370D]">
                    <TableHead>Frequency</TableHead>
                    <TableHead>Number of Triggers</TableHead>
                    <TableHead>Created On</TableHead>
                    {schedule.frequency === "weekly" && <TableHead>Day of Week:</TableHead>}
                    <TableHead>Time</TableHead>
                    <TableHead>Timezone</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="bg-gray-50 text-gray-500 capitalize">{schedule.frequency}</TableCell>
                    <TableCell className="bg-gray-50 text-gray-500">
                      {schedule.triggered_times.length} time{schedule.triggered_times.length !== 1 && "s"}
                    </TableCell>
                    <TableCell className="bg-gray-50 text-gray-500">{formatDateTime(schedule.createdAt)}</TableCell>
                    {schedule.frequency === "weekly" && <TableCell className="bg-gray-50 text-gray-500">{schedule.day_of_week}</TableCell>}
                    <TableCell className="bg-gray-50 text-gray-500">{schedule.time}</TableCell>
                    <TableCell className="bg-gray-50 text-gray-500">{schedule.timezone}</TableCell>
                    <TableCell className="bg-gray-50 text-gray-500">
                      <div className="flex  items-center">
                        <button
                          onClick={() => {
                            setIsSchedulerModalOpen(true);
                          }}
                          className=" h-12 w-12 rounded-xl grid place-content-center text-green-500 cursor-pointer">
                          <Edit size={20} />
                        </button>
                        <button onClick={handleDeleteSchedule} className=" h-12 w-12 rounded-xl grid place-content-center text-rose-500 cursor-pointer">
                          {deleteRequestPending ? <Spinner color="#f43f5e" /> : <Trash2 size={20} />}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow></TableRow>
                </TableFooter>
              </Table>{" "}
            </div>{" "}
          </div>
        )}
      </div>
      <SchedulerModal
        show={isSchedulerModalOpen}
        setShow={setIsSchedulerModalOpen}
        workFlowData={workFlowData}
        setWorkFlowData={setWorkFlowData}
        onAddSchedule={() => setIsNewScheduleAdded(true)}
      />
    </div>
  );
};

export default Schedules;
