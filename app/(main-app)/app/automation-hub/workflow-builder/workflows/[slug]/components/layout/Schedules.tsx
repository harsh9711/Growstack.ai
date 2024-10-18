"use client";

import React, { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { Clock, Edit, Trash2 } from "lucide-react";
import { formatDateTime } from "@/utils/dates";
import SchedulerModal from "../SchedulerModal";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDialog from "@/app/(main-app)/app/social-portal/text-to-avatar/components/ConfirmDialog";

interface Props {
  workflowId: string;
}

type WorkflowSchedule = {
  _id: string;
  user_id: string;
  workflow_id: string;
  frequency: "daily" | "weekly" | "monthly";
  day_of_week?: string;
  day_of_month?: string;
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
  const [deleteRequestPending, setDeleteRequestPending] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [schedules, setSchedules] = useState<WorkflowSchedule[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
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
    setLoading(true);
    try {
      const response = await instance.get(
        `${API_URL}/workflow/api/v1/schedule/${id}`
      );
      const scheduleData = response.data.data || [];
      setSchedules(scheduleData);
      setTotalPages(Math.ceil(scheduleData.length / itemsPerPage));
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

  const handleDeleteSchedule = async () => {
    if (!deleteScheduleId) return;
    setIsDeleting(true);
    try {
      const response = await instance.delete(
        `${API_URL}/workflow/api/v1/schedule/${deleteScheduleId}`
      );
      fetchSchedule(workflowId);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response ? error.response.data.error : error.message);
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
    }
  };
  const handleOpenConfirmDialog = (id: string) => {
    setDeleteScheduleId(id);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (workflowId) {
      setLoading(true);
      fetchSchedule(workflowId);
      fetchWorkflowData(workflowId);
    }
  }, [workflowId, isNewScheduleAdded]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSchedules = schedules.slice(indexOfFirstItem, indexOfLastItem);
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
        {schedules.length === 0 ? (
          <div className="h-60 flex flex-col justify-center items-center gap-3">
            <h1 className="text-xl">Oops!</h1>
            <p>No schedules planned for this workflow</p>
            <button
              className="w-full max-w-fit bg-primary-green text-white sheen transition duration-500 px-5 h-12 rounded-xl flex items-center gap-2 whitespace-nowrap"
              onClick={() => setIsSchedulerModalOpen(true)}
            >
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
                onClick={() => setIsSchedulerModalOpen(true)}
              >
                Create a new schedule
              </button>
            </div>
            <div className="rounded-lg border mt-5 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#0347370D]">
                    <TableHead className="min-w-[120px]">Frequency</TableHead>
                    <TableHead className="min-w-[120px]">
                      Number of Triggers
                    </TableHead>
                    <TableHead className="min-w-[120px]">Created On</TableHead>
                    {schedules.some(
                      schedule => schedule.frequency === "weekly"
                    ) && (
                      <TableHead className="min-w-[120px]">
                        Day of Week
                      </TableHead>
                    )}
                    {schedules.some(
                      schedule => schedule.frequency === "monthly"
                    ) && (
                      <TableHead className="min-w-[120px]">
                        Day of Month
                      </TableHead>
                    )}
                    <TableHead className="min-w-[120px]">Time</TableHead>
                    <TableHead className="min-w-[120px]">Timezone</TableHead>
                    <TableHead className="min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSchedules.map(schedule => (
                    <TableRow key={schedule._id} className="grids grid-cols-8">
                      <TableCell className="bg-gray-50 text-gray-500 capitalize min-w-[120px]">
                        {schedule.frequency || "-"}
                      </TableCell>
                      <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                        {schedule.triggered_times.length || "-"} time
                        {(schedule.triggered_times.length !== 1 && "s") || ""}
                      </TableCell>
                      <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                        {formatDateTime(schedule.createdAt) || "-"}
                      </TableCell>
                      {(schedule.frequency === "weekly" && (
                        <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                          {schedule?.day_of_week || "-"}
                        </TableCell>
                      )) || (
                        <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                          -
                        </TableCell>
                      )}
                      {(schedule.frequency === "monthly" && (
                        <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                          {schedule?.day_of_month || "-"}
                        </TableCell>
                      )) || (
                        <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                          -
                        </TableCell>
                      )}
                      <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                        {schedule.time || "-"}
                      </TableCell>
                      <TableCell className="bg-gray-50 text-gray-500 min-w-[120px]">
                        {schedule.timezone || "-"}
                      </TableCell>
                      <TableCell className="bg-gray-50 min-w-[120px]">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleOpenConfirmDialog(schedule._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-3">
                      <div className="flex flex-row w-full justify-between">
                        <button
                          className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition-transform transform ${
                            currentPage === 1
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          } hover:scale-105`}
                          onClick={() =>
                            setCurrentPage(page => Math.max(page - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        <span className="pagination-info">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition-transform transform ${
                            currentPage === totalPages
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          } hover:scale-105`}
                          onClick={() =>
                            setCurrentPage(page =>
                              Math.min(page + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDeleteSchedule}
                message="Are you sure you want to delete?"
                isLoading={isDeleting}
              />
            </div>
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
