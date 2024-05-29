import Image from "next/image";
import Faq from "./components/Faq";
import { ArrowRight } from "lucide-react";
import { Nunito_Sans } from "next/font/google";
import Slider from "./components/Slider";
import Marquee from "react-fast-marquee";
import { testimonials } from "./components/constants/testimonials";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export default function Home() {
  return (
    <main className="space-y-20">
      <section className="p-4 mt-20">
        <div className="bg-gradient-to-b from-transparent  to-[#009975] h-[70vh] rounded-[40px] pl-40 py-20">
          <div className="flex justify-between items-center">
            <div className="flex justify-end w-full">
              <div className="max-w-[820px] w-full">
                <div className="max-w-3xl space-y-5">
                  <h1 className="text-[56px] max-w-2xl leading-normal bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    <span className="font-semibold">AI has ushered in a </span>
                    <br /> <span className="font"> transformative era </span> <br /> <span className="font-extralight"> in marketing.</span>
                  </h1>
                  <p className="text-[17px] leading-loose">
                    Empower Your Business with AI-Powered Solutions for Seamless Marketing, Sales, and Social Media Management
                  </p>
                  <button className="bg-white flex items-center gap-2 text-primary-green py-4 px-7 rounded-xl shadow-md shadow-[#00000025]">
                    Get Started <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <div className="bg-white/50 py-5 pl-5 rounded-l-[40px] shadow-2xl">
                <Image src="/assets/dashboard-preview.png" alt="" width={700} height={400} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-between max-w-[1620px] mx-auto">
        <div className="flex flex-col items-center justify-center space-y-3 border-r border-primary-light-gray w-full">
          <h1 className={`text-5xl font-bold ${nunito.className}`}>70%</h1>
          <p className="text-black text-opacity-70">Increase efficiency </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 border-r border-primary-light-gray w-full">
          <h1 className={`text-5xl font-bold ${nunito.className}`}>$1000</h1>
          <p className="text-black text-opacity-70">Increase efficiency </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 border-r border-primary-light-gray w-full">
          <h1 className={`text-5xl font-bold ${nunito.className}`}>15hr</h1>
          <p className="text-black text-opacity-70">Increase efficiency </p>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center gap-7">
          <div className="bg-[#00968914] py-2 px-3.5 flex items-center gap-3 rounded-full text-sm font-semibold uppercase max-w-fit"> Our process </div>
          <h1 className="text-center text-[42px] leading-normal">
            <span className="bg-gradient-to-r from-black to-black/50 bg-clip-text text-transparent">A User-Friendly</span>
            <br />
            <span className="bg-gradient-to-r from-black to-black/50 bg-clip-text text-transparent">Interface to Build AI Solutions</span>
          </h1>
          <p className="max-w-2xl leading-loose text-center">
            Our sales success platform integrates with your sales team’s workflow. So, every sales rep is equipped to convert pipeline more effectively.
          </p>
          <div className="bg-[#F9F9F9] p-5 rounded-[30px] custom-shadow-box">
            <Image src="/assets/ui-solutions-preview.png" alt="" width={1000} height={1000} />
          </div>
        </div>
      </section>

      <section>
        <div className="space-y-7 max-w-[1860px] mx-auto">
          <div className="max-w-[1480px] mx-auto">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit text-primary-green">
              {" "}
              FAQ
            </div>
            <div className="flex items-center justify-between gap-20 mt-5">
              <h1 className="w-full text-[42px] max-w-2xl leading-normal bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                <span className="font-semibold">The platform your whole </span>
                <br /> <span className="font-extralight"> business will love.</span>
              </h1>
              <p className="w-full max-w-lg leading-loose">
                Explore how our AI-driven tools transform every aspect of your business strategy and propel your success forward
              </p>
            </div>
          </div>
          <div className="mt-10 bg-[#F9DE6F]/30 p-5 rounded-[40px] md:pt-10 md:pb-20">
            <div className="max-w-[1480px] mx-auto flex justify-between items-center">
              <div className="space-y-5 w-full">
                <h2>01</h2>
                <h1 className="leading-relaxed text-[42px] max-w-md font-semibold !mt-2">AI marketing and sales apps</h1>
                <p className="w-full max-w-lg leading-loose">
                  An AI marketing and sales application uses artificial intelligence to enhance and automate marketing and sales processes, improving customer
                  engagement and driving conversions.
                </p>
                <ul className="space-y-4 !mt-7">
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Listen to what they say about you
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Randomised words which.
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Internet tend to repeat predefined chunks
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Automate multiple scenarios
                  </li>
                </ul>
                <button className="bg-transparent ring-1 ring-primary-green ring-inset hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Get Started <ArrowRight />
                </button>
              </div>
              <div className="w-full flex justify-center items-center">
                <Image src="/assets/marketing-apps.png" alt="" width={900} height={900} className="translate-y-[80px]" />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-[#9AEEE7]/30 p-5 rounded-[40px] md:pt-10 md:pb-20">
            <div className="max-w-[1480px] mx-auto flex justify-between items-center">
              <div className="space-y-5 w-full">
                <h2>01</h2>
                <h1 className="leading-relaxed text-[42px] max-w-md font-semibold !mt-2">AI marketing and sales apps</h1>
                <p className="w-full max-w-lg leading-loose">
                  An AI marketing and sales application uses artificial intelligence to enhance and automate marketing and sales processes, improving customer
                  engagement and driving conversions.
                </p>
                <ul className="space-y-4 !mt-7">
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Listen to what they say about you
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Randomised words which.
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Internet tend to repeat predefined chunks
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Automate multiple scenarios
                  </li>
                </ul>
                <button className="bg-transparent ring-1 ring-primary-green ring-inset hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Get Started <ArrowRight />
                </button>
              </div>
              <div className="w-full flex justify-center items-center">
                <Image src="/assets/marketing-apps.png" alt="" width={900} height={900} className="translate-y-[80px]" />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-[#FAE8F1] p-5 rounded-[40px] md:pt-10 md:pb-20">
            <div className="max-w-[1480px] mx-auto flex justify-between items-center">
              <div className="space-y-5 w-full">
                <h2>01</h2>
                <h1 className="leading-relaxed text-[42px] max-w-md font-semibold !mt-2">AI marketing and sales apps</h1>
                <p className="w-full max-w-lg leading-loose">
                  An AI marketing and sales application uses artificial intelligence to enhance and automate marketing and sales processes, improving customer
                  engagement and driving conversions.
                </p>
                <ul className="space-y-4 !mt-7">
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Listen to what they say about you
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Randomised words which.
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Internet tend to repeat predefined chunks
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Automate multiple scenarios
                  </li>
                </ul>
                <button className="bg-transparent ring-1 ring-primary-green ring-inset hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Get Started <ArrowRight />
                </button>
              </div>
              <div className="w-full flex justify-center items-center">
                <Image src="/assets/marketing-apps.png" alt="" width={900} height={900} className="translate-y-[80px]" />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-[#FFEDE6] p-5 rounded-[40px] md:pt-10 md:pb-20">
            <div className="max-w-[1480px] mx-auto flex justify-between items-center">
              <div className="space-y-5 w-full">
                <h2>01</h2>
                <h1 className="leading-relaxed text-[42px] max-w-md font-semibold !mt-2">AI marketing and sales apps</h1>
                <p className="w-full max-w-lg leading-loose">
                  An AI marketing and sales application uses artificial intelligence to enhance and automate marketing and sales processes, improving customer
                  engagement and driving conversions.
                </p>
                <ul className="space-y-4 !mt-7">
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Listen to what they say about you
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Randomised words which.
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Internet tend to repeat predefined chunks
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Automate multiple scenarios
                  </li>
                </ul>
                <button className="bg-transparent ring-1 ring-primary-green ring-inset hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Get Started <ArrowRight />
                </button>
              </div>
              <div className="w-full flex justify-center items-center">
                <Image src="/assets/marketing-apps.png" alt="" width={900} height={900} className="translate-y-[80px]" />
              </div>
            </div>
          </div>
          <div className="mt-10 bg-[#E2F0CB] p-5 rounded-[40px] md:pt-10 md:pb-20">
            <div className="max-w-[1480px] mx-auto flex justify-between items-center">
              <div className="space-y-5 w-full">
                <h2>01</h2>
                <h1 className="leading-relaxed text-[42px] max-w-md font-semibold !mt-2">AI marketing and sales apps</h1>
                <p className="w-full max-w-lg leading-loose">
                  An AI marketing and sales application uses artificial intelligence to enhance and automate marketing and sales processes, improving customer
                  engagement and driving conversions.
                </p>
                <ul className="space-y-4 !mt-7">
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Listen to what they say about you
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Randomised words which.
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Internet tend to repeat predefined chunks
                  </li>
                  <li className="flex gap-x-2 items-center">
                    <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                    Automate multiple scenarios
                  </li>
                </ul>
                <button className="bg-transparent ring-1 ring-primary-green ring-inset hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Get Started <ArrowRight />
                </button>
              </div>
              <div className="w-full flex justify-center items-center">
                <Image src="/assets/marketing-apps.png" alt="" width={900} height={900} className="translate-y-[80px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit text-primary-green">
            {" "}
            Advocacy
          </div>
          <h1 className="text-[42px] max-w-2xl leading-normal font-semibold  text-center">
            Social hub & <span className="font-light">Advocacy</span>
          </h1>
        </div>
        <Slider />
      </section>

      <section>
        <div className="space-y-7 max-w-[1860px] mx-auto">
          <div className="max-w-[1480px] mx-auto">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit text-[#009689]">
              Other Features
            </div>
            <div className="flex items-center justify-between gap-20 mt-5">
              <h1 className="w-full text-[42px] max-w-2xl leading-normal bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                <span className="font-semibold">The platform your whole </span>
                <br /> <span className="font-extralight"> business will love.</span>
              </h1>
              <p className="w-full max-w-lg leading-loose">"Transform your business with AI-driven solutions for growth and efficiency." </p>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="grid grid-cols-1 grid-rows-2 gap-5">
                <div className="bg-[#C1B1E4] p-10 rounded-3xl space-y-2">
                  <h1 className="text-[34px] font-semibold">Reputation management</h1>
                  <p className="leading-relaxed text-lg">Enhance your online reputation effortlessly with our management solution.</p>
                  <div className="grid grid-cols-2 gap-5 !mt-5">
                    <div className="bg-white px-6 py-8 rounded-3xl">
                      <Image src="/assets/trustpilot.svg" alt="" width={140} height={100} />
                      <div className="flex gap-3 items-center mt-5 flex-wrap md:flex-nowrap">
                        <Image src="/assets/truspilot-rating.svg" alt="" width={150} height={100} />
                        <p className="font-semibold text-sm whitespace-nowrap">4.9/5 | 9010 reviews</p>
                      </div>
                    </div>
                    <div className="bg-white px-6 py-8 rounded-3xl">
                      <Image src="/assets/google.svg" alt="" width={100} height={100} />
                      <div className="flex gap-3 items-center mt-5 flex-wrap md:flex-nowrap">
                        <Image src="/assets/google-rating.svg" alt="" width={150} height={100} />
                        <p className="font-semibold text-sm whitespace-nowrap">4.9/5 | 9010 reviews</p>
                      </div>
                    </div>
                    <div className="bg-white px-6 py-8 rounded-3xl">
                      <Image src="/assets/hostadvice.svg" alt="" width={130} height={100} />
                      <div className="flex gap-3 items-center mt-5 flex-wrap md:flex-nowrap">
                        <Image src="/assets/google-rating.svg" alt="" width={150} height={100} />
                        <p className="font-semibold text-sm whitespace-nowrap">4.9/5 | 9010 reviews</p>
                      </div>
                    </div>
                    <div className="bg-white px-6 py-8 rounded-3xl">
                      <Image src="/assets/serchen.svg" alt="" width={100} height={100} />
                      <div className="flex gap-3 items-center mt-5 flex-wrap md:flex-nowrap">
                        <Image src="/assets/serchen-rating.svg" alt="" width={150} height={100} />
                        <p className="font-semibold text-sm whitespace-nowrap">4.9/5 | 9010 reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#C6D88F] p-10 rounded-3xl ">
                  <div className="flex justify-center items-center">
                    <Image src="/assets/man-working-on-metaverse.png" alt="" width={420} height={300} />
                  </div>
                  <h1 className="text-[34px] font-semibold mt-4">Research</h1>
                  <p className="leading-relaxed text-lg">Access valuable insights instantly with our AI-powered research assistant.</p>
                </div>
              </div>
              <div className="bg-[#F582A5] p-10 rounded-3xl">
                <h1 className="text-[34px] font-semibold">
                  WhatsApp and Telegram <br /> automation <span className="font-light"> with our apps</span>
                </h1>
                <p className="leading-relaxed text-lg">
                  Lorem ipsum dolor sit amet consectetur. Porttitor orci tortor vehicula nibh enim quam eget diam. <br /> <br /> Volutpat posuere amet quisque
                  tincidunt tristique donec pulvinar. Ullamcorper nunc volutpat ut fringilla. Nam vitae at purus.
                </p>
              </div>
              <div className="bg-[#FDDF6E] p-10 rounded-3xl col-span-2">
                <h1 className="text-[34px] font-semibold">
                  Google web scraping <span className="font-light"> tool for marketing</span>
                </h1>
                <p className="leading-relaxed text-lg">Gain targeted marketing insights with our Google web scraping tool.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[url('/backgrounds/abstract-dots.png')] bg-no-repeat bg-cover w-full space-y-12 py-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit text-[#009689]">
              {" "}
              Benefits
            </div>
            <h1 className="text-[42px] max-w-2xl leading-normal font-semibold  text-center">
              <span className="font-light">Best solutions </span> for your business
            </h1>
          </div>
          <div className="flex gap-5 max-w-[1480px] mx-auto">
            <div className="bg-white space-y-4 rounded-3xl border border-[#E3E3E3] p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="p-3 max-w-fit bg-[#6B66DA] rounded-xl">
                <Image src="/icons/efficiency.svg" alt="" width={40} height={40} />
              </div>
              <h1 className="text-[24px] max-w-2xl leading-normal font-bold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                Efficiency <span className="font-normal">Boost</span>
              </h1>
              <p className="leading-relaxed">
                Automate tasks and streamline workflows with AI-powered tools, freeing up time for strategic planning and core business operations.
              </p>
            </div>
            <div className="bg-white space-y-4 rounded-3xl border border-[#E3E3E3] p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="p-3 max-w-fit bg-[#FFCC29] rounded-xl">
                <Image src="/icons/social-engagement.svg" alt="" width={40} height={40} />
              </div>
              <h1 className="text-[24px] max-w-2xl leading-normal font-bold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                Enhanced <span className="font-normal">Engagement</span>
              </h1>
              <p className="leading-relaxed">
                Personalize interactions and content to connect with customers on a deeper level, fostering stronger relationships and driving loyalty.
              </p>
            </div>
            <div className="bg-white space-y-4 rounded-3xl border border-[#E3E3E3] p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="p-3 max-w-fit bg-[#10A1F3] rounded-xl">
                <Image src="/icons/competitive-advantage.svg" alt="" width={40} height={40} />
              </div>
              <h1 className="text-[24px] max-w-2xl leading-normal font-bold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                Competitive <span className="font-normal">Edge</span>
              </h1>
              <p className="leading-relaxed">
                Harness the power of data-driven and innovative marketing strategies to outperform competitors, expand your market reach, and achieve growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[#EDCFFF80] py-40">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit text-primary-green">
              {" "}
              Future plans
            </div>
            <h1 className="text-[42px] max-w-2xl leading-normal font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent text-center">
              Future plans
            </h1>
            <p className="text-[18px] text-center !mt-10">Marketing agent workflow</p>
            <p className="text-[18px] text-center">End-to-end analytics platform</p>
            <p className="text-[18px] text-center">Buyer journey segmentation and contact buying</p>
            <p className="text-[18px] text-center">Automated calling facility</p>
            <p className="text-[18px] text-center">Connectivity with customers in the distribution chain.</p>
            <p className="text-[18px] text-center">Build a CRM system that connects with our apps</p>
          </div>
        </div>
      </section>

      <section>
        <div className="space-y-7 max-w-[1860px] mx-auto">
          <div className="max-w-[1480px] mx-auto">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit text-[#009689]">
              Customer stories
            </div>
            <div className="flex items-center justify-between gap-20 mt-5">
              <h1 className="w-full text-[42px] max-w-2xl leading-normal bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                <span className="font-semibold">Don’t take our words </span>
                <br /> for it listen to our customers
              </h1>
              <button className="bg-transparent ring-1 ring-primary-green ring-inset hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                See all stories <ArrowRight />
              </button>
            </div>
          </div>
        </div>
        <Marquee pauseOnHover className="py-14">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-10 hover:shadow-2xl hover:shadow-[#d4d4d4] transition-all duration-300 rounded-3xl space-y-7 cursor-pointer mx-4">
              <Image src={testimonial.company_logo} alt="" width={180} height={30} />
              <p className="max-w-[300px] leading-relaxed">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <Image src={testimonial.author.image_url} alt="" width={100} height={100} className="rounded-full w-[52px] h-[52px] object-cover" />
                <div className="space-y-1">
                  <h1 className="font-semibold text-lg">{testimonial.author.name}</h1>
                  <h1 className="text-black/50">{testimonial.author.job_position}</h1>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      <section className="bg-primary-green">
        <div className="flex items-center">
          <div className="w-full mx-auto flex justify-end py-20">
            <div className="max-w-[740px] w-full">
              <div className="w-full max-w-3xl space-y-7 text-white">
                <div className="bg-[#00968914] py-2 px-4 flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit"> CTA</div>
                <h1 className="text-[42px] max-w-2xl leading-normal bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
                  <span className="font-semibold">Your complete all-in-one </span>
                  <br /> <span className="font"> integrated CRM platform </span> <br /> <span className="font-extralight"> built for success</span>
                </h1>
                <p className="text-[17px] leading-loose">
                  Empower Your Business with AI-Powered Solutions for Seamless Marketing, Sales, and Social Media Management
                </p>
                <button className="bg-white flex items-center gap-2 text-primary-green py-4 px-9 rounded-xl shadow-md shadow-[#00000025]">
                  Get Started <ArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[url('/backgrounds/background-ellipse.png')] bg-center bg-no-repeat flex justify-end py-10 mt-10">
            <Image src="/assets/dashboard-preview.png" alt="" width={800} height={700} />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="flex flex-col items-center gap-7">
          <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit text-primary-green"> FAQ</div>
          <h1 className="text-[42px] font-semibold text-primary-green">Quick answers on GrowStack</h1>
        </div>
        <div className="bg-[url('/backgrounds/abstract-dots.png')] bg-no-repeat bg-cover bg-right-bottom w-full">
          <Faq />
        </div>
      </section>
    </main>
  );
}
