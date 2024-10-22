import { Fragment } from "react";
import LogsTable from "./LogsTable";

export default function MultipostingPage() {
  return (
    <Fragment>
      <main>
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Scheduler</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[16px]">
              Posting log{" "}
            </p>
          </div>
        </div>
        <LogsTable />
      </main>
    </Fragment>
  );
}
