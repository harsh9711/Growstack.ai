import { ClockIcon } from "@/components/svgs";

const data = {
  sections: [
    {
      title: "Before Growstack",
      cards: [
        {
          time: "5:00 PM",
          activity: "End-of-day summary",
          action:
            "Manually sorting through emails, reports, and notifications—data overload.",
          problem: "Scattered info with no actionable insights.",
          timeWasted: "1 hour",
        },
        {
          time: "3:00 PM",
          activity: "Team commu-nication",
          action:
            "Manually gathering data for reports, scattered across platforms.",
          problem: "Time-consuming and error-prone.",
          timeWasted: "1.5 hours",
        },
        {
          time: "12:00 PM",
          activity: "Lead nurturing",
          action: "Manual follow-ups and disjointed lead management.",
          problem: "Missed opportunities and inefficiency.",
          timeWasted: "2 hours",
        },
        {
          time: "10:00 AM",
          activity: "Team meeting preparation",
          action:
            "Juggling Slack, emails, and WhatsApp—fragmented communication.",
          problem: "Missed messages and lack of alignment.",
          timeWasted: "1 hour",
        },
        {
          time: "8:00 AM",
          activity: "Morning review",
          action:
            " Manually tracking performance metrics across multiple systems.",
          problem: "No real-time insights.",
          timeWasted: "1 hour",
        },
      ],
    },
  ],
  sections2: [
    {
      title: "After Growstack",
      cards: [
        {
          time: "5:00 PM",
          activity: "End-of-day summary",
          action:
            "One-click dashboard with real-time insights across platforms.",
          problem: "Instant clarity and actionable insights.",
          timeWasted: "1 hour—used for strategic planning.",
        },
        {
          time: "3:00 PM",
          activity: "Team commu-nication",
          action:
            "Auto-generated reports from all marketing channels, presentation-ready.",
          problem: "Saves time and boosts accuracy",
          timeWasted: " 1.5 hours—used for strategic discussion.",
        },
        {
          time: "12:00 PM",
          activity: "Lead nurturing",
          action: "Automated lead prioritization and personalized engagement",
          problem: "Smarter, automated follow-ups.",
          timeWasted: "2 hours—used for closing deals.",
        },

        {
          time: "10:00 AM",
          activity: "Team meeting preparation",
          action: "Unified communication hub across all channels",
          problem: " Clear, centralized conversations.",
          timeWasted: " 1 hour—used for mentoring.",
        },
        {
          time: "8:00 AM",
          activity: "Morning review",
          action: "Real-time dashboard with all key metrics in one place",
          problem: "Immediate insights for strategic review.",
          timeWasted: "1 hour—used for planning tomorrow's goals.",
        },
      ],
    },
  ],
  timeline: [
    { time: "8:00 AM", activity: "Morning review" },
    { time: "10:00 AM", activity: "Team meeting preparation" },
    { time: "12:00 PM", activity: "Lead nurturing" },
    { time: "3:00 PM", activity: "Team commu-nication" },
    { time: "5:00 PM", activity: "End-of-day summary" },
  ],
};

const Box = () => {
  return (
    <div className="flex  flex-row w-full mx-auto items-center justify-center max-w-[1240px] h-full sm:p-4 overflow-hidden">
      <div className="flex flex-col gap-y-6 overflow-auto h-full w-full sm:w-1/2 ">
        {data.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-y-10">
            <div className="items-center justify-center flex mx-auto p-2">
              <h2 className="sm:text-[18px] text-[14px] font-bold">
                {section.title}
              </h2>
            </div>
            <div className="flex flex-col gap-y-8">
              {section.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className={`border w-full h-[300px] sm:h-[160px] p-4 flex items-center justify-center ${
                    section.title === "Before Growstack"
                      ? "rounded-l-[20px]"
                      : "rounded-r-[20px]"
                  }`}
                >
                  <span className="flex flex-col sm:text-[16px] text-[12px] gap-y-2">
                    <h2 className="sm:hidden flex font-bold">
                      Time
                      <span className="sm:hidden flex font-medium">
                        : {card.time}
                      </span>
                    </h2>
                    <h2 className="font-bold">
                      Task
                      <span className="font-medium">: {card.activity}</span>
                    </h2>{" "}
                    <h2 className="font-bold">
                      Action{" "}
                      <span className="font-medium">: {card.action}</span>
                    </h2>
                    <h2 className="font-bold">
                      Problem :{" "}
                      <span className="font-medium">{card.problem}</span>
                    </h2>
                    <h2 className="font-bold">
                      Time Wasted :{" "}
                      <span className="font-medium">{card.timeWasted}</span>
                    </h2>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#EDEDED] sm:flex hidden  max-w-[240px]  h-full w-full sm:w-1/4 rounded-2xl  flex-col items-center justify-center gap-y-24 sm:gap-y-6 p-2">
        <div className="max-w-[200px] w-full h-[50px] py-2 text-[14px] sm:text-[18px] bg-white rounded-[10px] text-center">
          Timeline
        </div>
        <div className="flex flex-col gap-y-64 sm:gap-y-12 overflow-auto h-full p-2">
          {data.timeline.map((item, index) => (
            <div
              key={index}
              className="rounded-full flex flex-col items-center justify-center w-24 sm:w-36 bg-white text-[12px] sm:text-[14px] h-24 sm:h-36"
            >
              <ClockIcon />
              <h2 className="font-extrabold sm:text-[16px] text-[10px] mt-2">
                {item.time}
              </h2>
              <p className="font-medium w-full sm:text-[16px] text-[10px] max-w-[90px] text-center">
                {item.activity}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-6 overflow-auto h-full  w-full sm:w-1/2 ">
        {data.sections2.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-y-10">
            <div className="items-center justify-center flex mx-auto p-2">
              <h2 className="sm:text-[18px] text-[14px] font-bold">
                {section.title}
              </h2>
            </div>
            <div className="flex flex-col gap-y-8">
              {section.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className={`border w-full h-[300px] sm:h-[160px] p-4 sm:text-[20px] text-[16px] flex items-center justify-center ${
                    section.title === "Before Growstack"
                      ? "rounded-l-[20px]"
                      : "rounded-r-[20px]"
                  }`}
                >
                  <span className="flex flex-col sm:text-[16px] text-[12px] gap-y-2">
                    <h2 className="sm:hidden flex font-bold">
                      Time
                      <span className="sm:hidden flex font-medium">
                        : {card.time}
                      </span>
                    </h2>
                    <h2 className="font-bold">
                      Task
                      <span className="font-medium">: {card.activity}</span>
                    </h2>{" "}
                    <h2 className="font-bold">
                      Action{" "}
                      <span className="font-medium">: {card.action}</span>
                    </h2>
                    <h2 className="font-bold">
                      Benefit:{" "}
                      <span className="font-medium">{card.problem}</span>
                    </h2>
                    <h2 className="font-bold">
                      Time Saved :{" "}
                      <span className="font-medium">{card.timeWasted}</span>
                    </h2>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Box;
