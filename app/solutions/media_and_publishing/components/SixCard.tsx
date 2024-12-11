import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Icon1,
  Icon111,
  Icon2,
  Icon211,
  Icon3,
  Icon311,
  Icon4,
  Icon411,
  Icon5,
  Icon511,
  Icon6,
  Icon611,
  Icon711,
  Icon811,
} from "@/components/svgs/icons";

export const cases = [
  {
    id: 1,
    text: "Comprehensive AI Solutions",
    imageUrl: <Icon111 />,
    name: "All-in-one platform for media professionals",
    description:
      "Growstack offers a wide range of AI-driven tools that streamline content production, enhance audience engagement and optimize monetization strategies, making it an all-in-one platform for media professionals.",
  },
  {
    id: 2,
    text: "Enhanced Productivity",
    imageUrl: <Icon211 />,
    name: "Focus on creativity and strategy",
    description:
      "With features like AI Workflow Builder and automated posting schedules, Growstack allows teams to focus on creativity and strategy rather than repetitive tasks, boosting overall productivity.",
  },
  {
    id: 3,
    text: "Personalized User Experiences",
    imageUrl: <Icon311 />,
    name: "Tailored content delivery",
    description:
      "Growstack’s Recommendation Engine and AI Custom GPT empower media companies to deliver tailored content to their audiences, improving engagement and satisfaction.",
  },
  {
    id: 4,
    text: "Data-driven Insights",
    imageUrl: <Icon411 />,
    name: "Informed decision-making",
    description:
      "Our analytics tools provide actionable insights into audience behavior and content performance, enabling informed decision-making and continuous improvement of strategies.",
  },
  {
    id: 5,
    text: "Seamless Collaboration",
    imageUrl: <Icon511 />, // Assuming an Icon5 exists
    name: "Enhanced team communication",
    description:
      "With features like AI Secured Chat and a centralized Content Calendar, Growstack enhances team collaboration and communication, ensuring everyone is aligned and informed.",
  },
  {
    id: 6,
    text: "Scalable Solutions",
    imageUrl: <Icon611 />, // Assuming an Icon6 exists
    name: "Accommodate growth and market demands",
    description:
      "Whether you're a small media startup or a large publishing house, Growstack’s flexible features can scale with your needs, accommodating growth and evolving market demands.",
  },
  {
    id: 7,
    text: "Cost Efficiency",
    imageUrl: <Icon711/>, // Assuming an Icon4 exists
    name: "Reduce operational costs",
    description:
      "By automating various processes and optimizing resource allocation, Growstack helps organizations reduce operational costs while maximizing output and revenue potential.",
  },
  {
    id: 8,
    text: "Expert Support",
    imageUrl: <Icon811 />, // Assuming an Icon3 exists
    name: "Ongoing assistance",
    description:
      "Our dedicated support team is available to assist with onboarding, training, and ongoing support, ensuring that you get the most out of our platform.",
  },
];


const Box = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      offset: 1,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      {cases.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="relative text-black bg-white hover:bg-primary-green group  max-h-[414px] rounded-[20px] shadow-lg hover:shadow-2xl text-center sm:text-start items-center sm:items-start transition-transform duration-500 ease-in-out max-w-[300px] h-full flex flex-col gap-y-4 justify-center group overflow-hidden"
        >
          
          <div className="flex flex-col  sm:items-start items-center gap-y-4 px-8 py-4">
            <div className="relative z-10 w-20 group-hover:fill-white fill-primary-green">
              {item.imageUrl}
            </div>
            <h2 className="sm:text-[20px]  text-[16px] w-full font-bold group-hover:text-white transition-colors duration-300">
              {item.name}{" "}
             
            </h2>
            <p className="text-[14px] sm:text-[16px] max-w-[320px] font-light text-black group-hover:text-white  transition-colors duration-300">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SixCard = () => {
  return (
    <div className="py-8">
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 sm:gap-y-8 w-full mx-auto">
        <div
          className="max-w-[184px] rounded-2xl flex items-center justify-center w-full px-4 py-2  text-[#034737] bg-[#03473714]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] sm:text-[16px] font-extrabold">
          Customer stories
          </h2>
        </div>
        <div
          className="flex flex-col sm:text-start text-center gap-6 w-full justify-between items-center sm:items-start"
          data-aos="fade-right"
        >
          <h1 className="text-[28px] xl:text-[40px] w-full leading-tight font-semibold text-black">
            Why choose <span className="font-light">Growstack</span>
          </h1>
        </div>

        <Box />
      </div>
    </div>
  );
};

export default SixCard;
