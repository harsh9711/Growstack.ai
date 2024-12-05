import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
const ApprovalsAccordion = ({approvalsData}:any) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-l-4 border-[#69BFFF] w-full bg-white rounded-lg shadow-lg p-4 mt-5">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">Approvals</h2>

        {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </div>

      {/* Accordion Content */}
      <div
        className={`transition-[max-height] duration-500 overflow-hidden ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="w-full text-left table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Steps for Approval
                </th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Approver
                </th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
              {/* Table Rows */}
              {approvalsData?.approvalDetails?.map((item:any, idx:any) => (
  item?.approvalRequired === "true" && (
                <tr key={idx}>
                  <td className="p-3 text-sm text-gray-700">{item.name} / {item.description}</td>
                  <td className="p-3 text-sm text-gray-700">janedoe@gmail.com</td>
                  <td className="p-3 text-sm">
                    {approvalsData?.status === "Approved" ? (
                      <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                        {approvalsData?.status}
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm rounded-full bg-orange-100 text-orange-600">
                        {approvalsData?.status}
                      </span>
                    )}
                  </td>
                </tr>)
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovalsAccordion;
