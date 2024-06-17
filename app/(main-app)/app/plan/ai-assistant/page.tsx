import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fragment } from "react";
import { assistants } from "./data/assistants";
import AssistantCard from "./components/AssistantCard";

export default function AiAssistants() {
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI custom GPT</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Chat with our AI team</p>
          </div>
          <Select>
            <SelectTrigger className="w-[250px] bg-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent defaultValue={"daily"}>
              <SelectGroup>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-6 gap-3 mt-6">
          {assistants.map((data, index) => (
            <AssistantCard {...data} key={index}/>
          ))}
        </div>
      </main>
    </Fragment>
  );
}
