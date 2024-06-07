"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import clsx from "clsx";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import LineGraph from "./graphs/LineGraph";
import DoughnutGraph from "./graphs/DoughnutGraph";

export default function OverviewGraphs() {
  const [selectedReviewsCategory, setSelectedReviewsCategory] = useState("All reviews");

  const starRatingData = [48, 4, 3, 5, 2, 3];
  const starRatingLabels = ["5 stars", "4 stars", "3 stars", "2 stars", "1 stars"];
  const starRatingColors = ["#034737", "#CC651D", "#99B54F", "#83A7F6", "#F6D79E"];
  const starRatingBorderColors = ["#034737", "#CC651D", "#99B54F", "#83A7F6", "#F6D79E"];

  const reviewSourceData = [60, 10, 15, 10, 5];
  const reviewSourceLabels = ["Google", "Yelp", "Facebook", "TripAdvisor", "Others"];
  const reviewSourceColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const reviewSourceBorderColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  return (
    <div>
      <div className="flex gap-10">
        <section className="w-full">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold w-full">Review growth</h1>
            <div className="w-full flex justify-center">
              <button
                onClick={() => setSelectedReviewsCategory("All reviews")}
                className={clsx(
                  "text-sm h-12 py-2 px-4 rounded-md text-primary-black transition-all duration-300",
                  selectedReviewsCategory === "All reviews" && "text-white bg-primary-green"
                )}>
                All reviews
              </button>
              <button
                onClick={() => setSelectedReviewsCategory("New reviews")}
                className={clsx(
                  "text-sm h-12 py-2 px-4 rounded-md text-primary-black transition-all duration-300",
                  selectedReviewsCategory === "New reviews" && "text-white bg-primary-green"
                )}>
                New reviews
              </button>
            </div>
            <div className="w-full flex justify-end gap-2">
              <Select>
                <SelectTrigger className="w-full h-12 rounded-lg max-w-[132px] border border-primary-green bg-white text-primary-green">
                  <SelectValue placeholder="All sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full h-12 rounded-lg max-w-[132px] border border-primary-green bg-white text-primary-green">
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
              <button className="h-12 bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap">
                Change
                <MdOutlineRefresh size={20} />
              </button>
            </div>
          </div>
          <div className="w-full h-[442px] mt-5 border border-[#E4E4E4] rounded-3xl p-10">
            <LineGraph />
          </div>
        </section>
        <section className="w-full max-w-[340px] space-y-4">
          <h1 className="text-xl font-semibold w-full mt-2">Review summary</h1>
          <div className="bg-primary-green p-10 text-white rounded-3xl relative !mt-7">
            <AlertCircle size={20} className="absolute top-3 right-3 cursor-pointer" />
            <h2 className="text-center text-[17px]">Average star rating</h2>
            <h1 className="text-7xl text-center font-semibold mt-5">4.37</h1>
            <div className="flex gap-2 justify-center mt-5">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <BsStarFill size={22} className="text-[#FFA800]" key={index} />
                ))}
            </div>
          </div>
          <div className="bg-primary-green/20 p-10 text-primary-green rounded-3xl relative">
            <AlertCircle size={20} className="absolute top-3 right-3 cursor-pointer" />
            <h2 className="text-center text-[17px]">Total reviews</h2>
            <h1 className="text-7xl text-center font-semibold mt-2">324</h1>
          </div>
        </section>
      </div>
      <div className="flex gap-6 mt-6">
        <section className="w-full bg-white border border-[#E4E4E4] p-10 rounded-3xl">
          <h1 className="text-xl font-semibold w-full">Star rating breakdown</h1>
          <div className="flex gap-10 mt-6 px-10 py-4">
            <div className="flex">
              <DoughnutGraph data={starRatingData} labels={starRatingLabels} backgroundColors={starRatingColors} borderColors={starRatingBorderColors} />
            </div>
            <div className="w-full flex items-center justify-center gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#034737]"></span>5 stars (78.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#CC651D]"></span>4 stars (4.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#99B54F]"></span>3 stars (3.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#83A7F6]"></span>2 stars (3.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#F6D79E]"></span>1 stars (10.0%)
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-white border border-[#E4E4E4] p-10 rounded-3xl">
          <h1 className="text-xl font-semibold w-full">Review source breakdown</h1>
          <div className="flex gap-10 mt-6 px-10 py-4">
            <div className="flex">
              <DoughnutGraph
                data={reviewSourceData}
                labels={reviewSourceLabels}
                backgroundColors={reviewSourceColors}
                borderColors={reviewSourceBorderColors}
              />
            </div>
            <div className="w-full flex items-center justify-center gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#FF6384]"></span>Google (60.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#36A2EB]"></span>Yelp (10.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#FFCE56]"></span>Facebook (15.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#4BC0C0]"></span>TripAdvisor (10.0%)
                </div>
                <div className="flex items-center gap-2 text-[17px] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[#9966FF]"></span>Others (5.0%)
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
