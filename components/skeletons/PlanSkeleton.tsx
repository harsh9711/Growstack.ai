import React from "react";

function PlanSkeleton({ totalCard = 4 }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 grid-cols-1 gap-4 py-5 w-full px-3 ">
      {new Array(totalCard).fill(0).map((_, index) => (
        <div className="" key={index}>
          <div className="rounded-xl w-full flex items-center flex-col bg-[#F2F2F2] dark:bg-gray-700 h-[520px] p-4 relative">
            <div className="flex items-start flex-col justify-start w-full py-3">
              <div className="flex flex-col space-y-4">
                <p className="rounded-xl animate-pulse bg-grayLighter dark:bg-gray-600 w-32 h-6 "></p>
                <p className="rounded-xl animate-pulse bg-grayLighter dark:bg-gray-600 w-24 h-6 "></p>
              </div>
              <div className="mt-4 animate-pulse bg-grayLighter dark:bg-gray-600 w-full mb-4  h-px" />

              {new Array(Math.floor(Math.random() * 5) + 4)
                .fill(0)
                .map((_, index) => (
                  <div className="flex space-x-3 my-2 ">
                    <div className="rounded-full w-5 animate-pulse bg-grayLighter dark:bg-gray-600 h-5"></div>
                    <p className="rounded-xl animate-pulse bg-grayLighter dark:bg-gray-600 w-24 h-4 "></p>
                  </div>
                ))}
            </div>

            <button
              type="button"
              className="cusBtn w-40 h-12 animate-pulse  bg-grayLighter dark:bg-gray-600 rounded-full opacity-80 mb-4 absolute bottom-2"
              disabled
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlanSkeleton;
