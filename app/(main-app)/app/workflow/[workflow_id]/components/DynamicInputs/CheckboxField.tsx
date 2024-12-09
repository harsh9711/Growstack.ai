// import React from "react";
// import Tooltip from "../tooltip/Tooltip";
// import { DynamicInputProps } from "@/types/workflows";

// const CheckboxField: React.FC<DynamicInputProps> = ({
//   param,
//   inputKey,
//   handleInputChange,
// }) => {
//   console.log("checking param", param);

//   return (
//     <div key={inputKey} className="input-box mt-3 mb-3">
//       <div className="label-box flex gap-2 items-center mb-1">
//         <label className="font-medium text-[#14171B] text-[12px]">
//           {param.label}
//           <span>
//             {param.required && <span className="text-[#CF0000]">*</span>}
//           </span>
//         </label>
//         <Tooltip
//           description={param?.description || ""}
//           position="bottom-full left-[-23px]"
//         />
//         {param?.error && (
//           <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
//         )}
//       </div>

//       {param?.value &&
//         param.value?.map((option: any, index: React.Key | null | undefined) => (
//           <div className="flex items-center space-x-2 mt-2" key={index}>
//             <input
//               type="checkbox"
//               id="example"
//               className="h-[16px] w-[16px] rounded border-[0.5px] border-[#E2E2E2] text-blue-600 focus:ring-blue-500"
//             />
//             <label
//               htmlFor="example"
//               className="text-sm font-medium text-[#14171B]"
//             >
//               {option}
//             </label>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default CheckboxField;

import React, { useState, useEffect } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";

const CheckboxField: React.FC<DynamicInputProps> = ({ param, inputKey }) => {
  console.log("checking param", param);

  // Get the saved checkbox state from localStorage (if any)
  const getInitialCheckedValues = () => {
    const savedState = localStorage.getItem(`checkboxState-${inputKey}`);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return new Array(param.value?.length).fill(false); // Initialize all checkboxes as unchecked if no saved state
  };

  // State to track the checked status of each checkbox
  const [checkedValues, setCheckedValues] = useState<boolean[]>(
    getInitialCheckedValues
  );

  // Handle checkbox change
  const handleCheckboxChange = (index: number) => {
    const updatedCheckedValues = [...checkedValues];
    updatedCheckedValues[index] = !updatedCheckedValues[index];
    setCheckedValues(updatedCheckedValues);

    // Save the updated state to localStorage
    localStorage.setItem(
      `checkboxState-${inputKey}`,
      JSON.stringify(updatedCheckedValues)
    );
  };

  // Optional: sync state with localStorage whenever it changes (useEffect)
  useEffect(() => {
    localStorage.setItem(
      `checkboxState-${inputKey}`,
      JSON.stringify(checkedValues)
    );
  }, [checkedValues, inputKey]);

  return (
    <div key={inputKey} className="input-box mt-3 mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          <span>
            {param.required && <span className="text-[#CF0000]">*</span>}
          </span>
        </label>
        <Tooltip
          description={param?.description || ""}
          position="bottom-full left-[-23px]"
        />
        {param?.error && (
          <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
        )}
      </div>

      {param?.value &&
        param.value?.map((option: any, index: number) => (
          <div className="flex items-center space-x-2 mt-2" key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={checkedValues[index]} // Bind checked status from state
              onChange={() => handleCheckboxChange(index)} // Toggle checked status on change
              className="h-[16px] w-[16px] rounded border-[0.5px] border-[#E2E2E2] text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={`checkbox-${index}`}
              className="text-sm font-medium text-[#14171B]"
            >
              {option}
            </label>
          </div>
        ))}
    </div>
  );
};

export default CheckboxField;
