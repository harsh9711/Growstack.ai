"use client";
import Link from "next/link";
import React, { useState } from "react";
const ContentBoxCo = () => {
  const [selectedSection, setSelectedSection] = useState<string>("intro");

  const handleClick = (id: string) => {
    setSelectedSection(id);
  };

  return (
    <div className="p-4 sm:p-6 md:p-0 flex md:flex-row flex-col max-w-[1240px] gap-4 sm:gap-6 md:gap-10 items-start justify-center mx-auto">
      <div className="flex flex-col gap-y-6 sm:gap-y-8 md:sticky md:top-10">
        <div className="hidden md:flex flex-col gap-y-4">
          <h2 className="text-[16px] sm:text-[18px] font-semibold">Contents</h2>
          <div className="flex flex-col text-black font-light gap-y-4 w-full">
            {[
              "intro",
              "Navigating",
              "data-driven-decisions",
              "personalization",
              "roi",
            ].map(section => (
              <div
                key={section}
                className={`cursor-pointer ${
                  selectedSection === section
                    ? "border-[#034737] border-l-[4.8px] p-4"
                    : ""
                }`}
                onClick={() => handleClick(section)}
              >
                <a href={`#${section}`}>
                  <h2
                    className={`${
                      window.location.hash === `#${section}`
                        ? "text-[#034737] font-extrabold"
                        : "font-medium"
                    }`}
                  >
                    {section === "intro" && "Introduction"}
                    {section === "Navigating" && " Navigating the AI Landscape"}
                    {section === "data-driven-decisions" &&
                      " Data-Driven Decisions"}
                    {section === "personalization" && "Personalization"}
                    {section === "roi" && "Evaluating ROI"}
                    {/* {section === "co-pilot" && "Gen AI as a Co-Pilot"} */}
                  </h2>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div id="intro">
          {/* <h1 className="text-[32px] font-bold text-[#034737]">
            Cutting Through the Hype: Demystifying the Noise of Gen AI in Market
            Expansion
          </h1>
          <blockquote className="text-gray-600 italic">
            “The greatest enemy of knowledge is not ignorance, but the illusion
            of knowledge.” – Stephen Hawking.
          </blockquote> */}
          <p className="text-gray-700 mt-2 leading-relaxed">
            AI co-pilots have now become everyone’s favorite buzzword in the
            ever-so-dynamic digital marketing environment. It helps to think of
            these strategies as your goodwill sidekicks – Batman and Robin of
            revenue growth roads. But are these co-pilots really matching what
            they are promising? Fasten your seat belts because we are going for
            a ride through the realm of Artificial Intelligence to discover if
            it’s really as good as it is being hyped to be.
          </p>
          {/* <p className="text-gray-700 mt-2 leading-relaxed">
            Picture it like this: If traditional marketing is a map, then Gen AI
            is your GPS system, guiding marketers to their destination. It is a
            tool for prospering in intricate environments, for finding blind
            spots that extend opportunities, and for bringing you to paths
            otherwise inaccessible. However, if incompetent, it can have you
            speeding in circles you do not even know exist. Here is how to fully
            harness it and grow your business frontiers without being consumed
            by the bubble.
          </p> */}
        </div>
        {/* <div className="flex justify-center mt-6 mb-2">
          <img
            src="/landingpage.png"
            alt="Gen AI in Action"
            className="w-2/3 h-auto rounded"
          />
        </div> */}

        <div id="Navigating" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            1. Navigating the AI Landscape: It’s More Than A Sleek Dashboard
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “The only constraint to our achievement of the future will be our
            skepticism of the present.” –
            <span className="font-bold not-italic">
              {" "}
              Franklin D. Roosevelt.
            </span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Picture yourself in a car with all the fancy features you dreamt of,
            only to find out it takes a PhD just to recline the seat. That’s how
            many businesses feel about AI co-pilots. They have good looks and
            sleek interiors, but do they get you to where you want to be?
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            **Stats alert!** It’s estimated that up to 70% of AI initiatives do
            not pay off because interfaces are too complex or goals are unclear.
            Always pick tools that enhance your efficiency rather than hinder
            it. The products we build at GrowStack are easy to use and easy to
            understand—no PhDs required! At other companies, you might be using
            tools you’re constantly staring at but don’t actually see the value.
          </p>
        </div>

        <div id="data-driven-decisions" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            2. Data-Driven Decisions: The Power of AI Insights
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “I believe in Jesus Christ, the son of the living God; as for
            everyone else, bring me the figures.” –
            <span className="font-bold not-italic"> W. Edwards Deming.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            If traditional marketing is somewhat similar to throwing spaghetti
            at a wall to see what would stick, AI co-pilots are the master chefs
            who know exactly what ingredients will make the dish perfect. It’s
            not a wild shot in the dark; it’s implementing an AI solution that
            can significantly increase your revenues. With the right AI tools,
            you’re not just guessing — you’re making data-driven decisions that
            directly impact your bottom line.
          </p>
        </div>

        <div id="personalization" className="flex flex-col gap-y-6">
       
          <h2 className="text-[24px] font-bold text-[#034737]">
            3. Personalization: The Secret Sauce for Customer Engagement
          </h2> <div className="flex justify-center mt-6 mb-2">
          <img
            src="/ac.png"
            alt="Gen AI in Action"
            className="w-2/3 h-auto rounded"
          />
        </div>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “People don’t buy what you do; they buy why you do it.” –
            <span className="font-bold not-italic"> Simon Sinek.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Personalization is the secret sauce of marketing. Think of your
            favorite coffee shop where the barista remembers your name and your
            order. Feels good, right? That’s what AI co-pilots can do at scale.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Stats to consider: <strong>80% of consumers</strong> are more likely
            to purchase from brands that offer personalized experiences. AI
            allows for customization of messages and promotions, making each
            interaction personal.{" "}
            <Link
              href="https://growstack.ai/"
              className="underline text-blue-600 font-bold"
            >
              GrowStack's
            </Link>{" "}
            tools enable you to target your audience, initiate a personal
            relationship, and convert occasional buyers into passionate brand
            advocates.
          </p>
        </div>

        <div id="co-pilot-factor" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            4. The Co-Pilot Factor: Human Touch Meets AI Power
          </h2> <div className="flex justify-center mt-6 mb-2">
          <img
            src="/ra.png"
            alt="Gen AI in Action"
            className="w-2/3 h-auto rounded"
          />
        </div>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
          "Technology is best when it brings people together." –  <span className="font-bold not-italic">Matt Mullenweg</span>


          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Let’s clear the air: If you’re thinking an AI co-pilot is coming for
            your job, think again. They’re helpful assistants, enhancing your
            abilities while you stay in control. They say “teamwork makes the
            dream work,” and that statement has never been truer than it is now.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            According to a survey by Harvard Business Review,{" "}
            <strong>78% of marketers</strong> reported that integrating human
            insights with AI tools improved their campaign success. At
            GrowStack, we are a team that always values a merging of man and
            machine to make the impossible, possible.
          </p>
        </div>

        <div id="roi" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            5. Evaluating ROI: Are You Getting What You Pay For With Your AI
            Co-Pilot?
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “Price is what you pay. Value is what you get.” –  <span className="font-bold not-italic">Warren Buffett.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Let’s talk ROI. Do your AI co-pilots bring real value, or are they
            consuming your cash faster than your AI can process it? To determine
            effectiveness, track performance metrics and set clear KPIs.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            A staggering 90% of organizations find it difficult to quantify the
            ROI on AI. However, with the right tools, you can achieve
            substantial returns. We believe in open metrics and transparent
            results, so you can clearly see how GrowStack’s tools are boosting
            your revenue.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            With GrowStack, you can confidently define your strategic direction
            and leverage AI to scale your business. Well then, are you prepared
            for AI co-pilots to help you soar to success? 🌟
          </p>
        </div>

        {/* <div id="co-pilot" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            Final Thoughts: In Its Use, Therefore, There Are Several Twists That
            One Should Avoid
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            In a world where AI will be the magic wand to all our problems, it
            is easy to lose oneself in it. However, it is important to note that
            many AI-based SaaS providers can fail to deliver their potential due
            to several factors: primarily, when implementing complex solutions,
            there is usually little clarity on exactly how they are going to be
            solved; second, there can be a lot of customization; third, there is
            almost always a lack of the human factor.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            So, what’s the solution? Choose wisely. Seek providers that
            subscribe to a high level of openness, and which can deliver secure
            solutions that are tailored to your specific needs—like GrowStack.
            We are not just any random addition to your strategy; we are your
            guide in the shifting tides of digital marketing. 🌊
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Therefore, if you are planning to plunge yourself into the world of
            AI, then make sure to catch the real deals. This may well be true
            since at the end of the day this is not a game of the number of
            words said (rhetoric) but the amount achieved. Yes, let’s not just
            go along for the ride; let’s make our own tide, can we not? 🌊✨
          </p>
        </div> */}

<h3 className="text-lg font-semibold mt-4">References</h3>
<ul className="list-disc list-inside text-gray-700 mt-2">
  <li><a href="https://medium.com/@bogatinov.leonardo/how-powerful-ai-really-is-the-real-power-of-artificial-intelligence-e82a97da2b90" target="_blank" rel="noopener noreferrer" className="underline">How Powerful AI Really Is</a></li>
  <li><a href="https://www.brookings.edu/articles/how-artificial-intelligence-is-transforming-the-world/" target="_blank" rel="noopener noreferrer" className="underline">How Artificial Intelligence is Transforming the World</a></li>
  <li><a href="https://www.gend.co/blog/unlocking-ai-power-10-essential-tools-for-businesses-to-get-started" target="_blank" rel="noopener noreferrer" className="underline">Unlocking AI Power: 10 Essential Tools</a></li>
  <li><a href="https://www.idemia.com/insights/unlocking-power-ai-empowering-solutions-future" target="_blank" rel="noopener noreferrer" className="underline">Unlocking Power AI: Empowering Solutions for the Future</a></li>
  <li><a href="https://www.pewresearch.org/internet/2018/12/10/artificial-intelligence-and-the-future-of-humans/" target="_blank" rel="noopener noreferrer" className="underline">Artificial Intelligence and the Future of Humans</a></li>
</ul>

      </div>
    </div>
  );
};

export default ContentBoxCo;
