import React, { useEffect, useState } from "react";
import { BsQuestion } from "react-icons/bs";

interface CheckboxProps {
  option: any;
  index: number;
  setActiveAction: (params: any) => void;
}

const ScheduleComponent: React.FC<CheckboxProps> = ({
  option,
  index,
  setActiveAction,
}) => {
  const [content, setContent] = useState("");
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("Image");
  const [mediaUrls, setMediaUrls] = useState<any[]>([]);
  const [isVideo, setIsVideo] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("");
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedArticle = localStorage.getItem("savedArticle");
    if (storedArticle) {
      setContent(storedArticle);
    }

    return () => {
      localStorage.removeItem("savedArticle");
    };
  }, []);

  useEffect(() => {
    if (scheduleDate && scheduleTime && !loading) {
      handlePublish();
    }
  }, [scheduleDate, scheduleTime, loading]);

  const handleValueChange = (value: string) => {
    setSelectedRadioValue(value);
    if (value === "Image") setIsVideo(false);
    if (value === "Video") {
      setIsVideo(true);
      setMediaUrls([]);
    }
  };

  const handlePublish = async () => {
    setLoading(true);

    let utcDateTime = null;
    if (scheduleDate && scheduleTime) {
      const localDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      utcDateTime = localDateTime.toISOString();
    }

    try {
      const requestData: any = {
        post: content + " " + link,
        platforms: selectedNetworks,
        mediaUrls,
        isVideo,
        scheduleDateTime: utcDateTime,
      };

      console.log("Request Data:", requestData);

      setActiveAction((prevState: any) => ({
        ...prevState,
        preset_json: {
          ...prevState.preset_json,
          body: prevState.preset_json.body.map((input: any, i: number) => {
            if (i === index && input.variable_type === "TIME") {
              return {
                ...input,
                variable_value: `${scheduleDate}T${scheduleTime}`, // Format as ISO string
              };
            }
            return input;
          }),
        },
      }));

      setContent("");
      setIsVideo(false);
      setMediaUrls([]);
      setSelectedNetworks([]);
      setLink("");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className="font-medium text-xl mb-2 mt-8 capitalize">
        {option.variable_label}
      </div>

      <div className="w-full flex justify-between mt-6">
        <div className="space-y-3 w-full">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center h-14 w-full rounded-full bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#034737"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7V12L15 15"
                  stroke="#034737"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="date"
                className="w-full bg-transparent outline-none"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                min={today}
              />
            </div>
            <div className="flex gap-2 items-center h-14 w-full rounded-full bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#034737"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7V12L15 15"
                  stroke="#034737"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="time"
                className="w-full bg-transparent outline-none"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                min={scheduleDate ? `${scheduleDate}T00:00` : undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
