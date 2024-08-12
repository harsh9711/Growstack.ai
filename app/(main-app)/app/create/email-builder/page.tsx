"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endTime: number): TimeLeft => {
  const difference = endTime - new Date().getTime();
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const endTimeRef = useRef<number>(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(endTimeRef.current));
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 h-full w-full flex flex-col items-center justify-center text-center">
      <Image src="/logo/growstack-mini.png" alt="" width={60} height={60} className="mb-10" />
      <div className="text-6xl font-medium mb-12">
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
          <div>Time's up!</div>
        ) : (
          <div className="flex space-x-10 bg-white py-6 px-10 shadow-xl shadow-gray-100 rounded-3xl">
            <div>
              <span>{timeLeft.days}</span>
              <span className="block text-sm">days</span>
            </div>
            <div>
              <span>{timeLeft.hours}</span>
              <span className="block text-sm">hours</span>
            </div>
            <div>
              <span>{timeLeft.minutes}</span>
              <span className="block text-sm">minutes</span>
            </div>
            <div>
              <span>{timeLeft.seconds}</span>
              <span className="block text-sm">seconds</span>
            </div>
          </div>
        )}
      </div>
      <h1 className="text-3xl uppercase font-semibold mb-4">Coming Soon</h1>
      <p className="mb-10 max-w-2xl leading-loose">
        We’re currently working on creating something fantastic. We’ll be here soon. Subscribe to the newsletter to be notified.
      </p>
      <form className="w-full max-w-md">
        <div className="flex items-center border-b-2 border-primary-green py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="Your Email"
            aria-label="Email"
          />
          <button
            className="flex-shrink-0 bg-primary-green hover:bg-primary-green border-primary-green hover:border-primary-green text-sm border-4 text-white py-1.5 px-2.5 rounded-lg"
            type="button">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}


// import fs from "fs";
// import Link from "next/link";
// import path from "path";
// import React from "react";
// import "./styles/index.css";
// // import "../../../../../public/builderjs/assets/css/font.css"
// // import "../../../../../public/builderjs/assets/bootstrap-4.5.0/css/bootstrap.min.css";
// import "../../../../../public/builderjs/assets/css/album.css";
// import "../../../../../public/builderjs/assets/css/sample.css";

// interface Template {
//   id: string;
//   title: string;
//   thumb: string;
// }

// const getTemplates = (dir: string): Template[] => {
//   const templateNames = fs.readdirSync(dir);
//   return templateNames.map((name) => {
//     const templatePath = path.join(dir, name);
//     const indexFile = path.join(templatePath, "index.html");
//     const thumb = fs.existsSync(path.join(templatePath, "thumb.svg"))
//       ? `/builderjs/templates/${path.basename(dir)}/${name}/thumb.svg`
//       : `/builderjs/templates/${path.basename(dir)}/${name}/thumb.png`;

//     let title = "Untitled";
//     if (fs.existsSync(indexFile)) {
//       const content = fs.readFileSync(indexFile, "utf8");
//       const match = content.match(/<title>([^<]*)<\/title>/);
//       if (match) {
//         title = match[1];
//       }
//     }

//     return { id: name, title, thumb };
//   });
// };

// const getTemplatesData = (): { featuredTemplates: Template[]; defaultTemplates: Template[]; customTemplates: Template[] } => {
//   const featuredDir = path.join(process.cwd(), "public/builderjs/templates/featured");
//   const defaultDir = path.join(process.cwd(), "public/builderjs/templates/default");
//   const customDir = path.join(process.cwd(), "public/builderjs/templates/custom");

//   const featuredTemplates = getTemplates(featuredDir);
//   const defaultTemplates = getTemplates(defaultDir);
//   const customTemplates = getTemplates(customDir);

//   return {
//     featuredTemplates,
//     defaultTemplates,
//     customTemplates,
//   };
// };

// const Home: React.FC = () => {
//   const { featuredTemplates, defaultTemplates, customTemplates } = getTemplatesData();

//   return (
//     <>
//       <main role="main">
//         <section className="album py-10 bg-light" id="example">
//           <div className="container space-y-14">
//             <div className="text-center space-y-2">
//               <h2 className="font-weight-normal font-size-40">Getting started with a template</h2>
//               <p className="">Start your design by choosing one of available layout templates that come with our Email builder.</p>
//             </div>
//             <div className="grid grid-cols-4 gap-7">
//               {featuredTemplates.map((template) => (
//                 <div key={template.id}>
//                   <div className="rounded-xl overflow-hidden mb-4 shadow-md shadow-gray-300/50 bg-white group">
//                     <Link href={`/app/create/email-builder/design?type=featured&id=${template.id}`}>
//                       <img
//                         width="100%"
//                         height="100%"
//                         className="group-hover:opacity-80 transition-all duration-300"
//                         src={template.thumb}
//                         title={template.title}
//                         alt={template.title}
//                       />
//                     </Link>
//                     <div className="py-5 px-6 space-y-1.5">
//                       <h5 className="line-clamp-1 text-[17px]">{template.title}</h5>
//                       <div className="!mt-5 flex justify-between items-center">
//                         <Link
//                           href={`/app/create/email-builder/design?type=featured&id=${template.id}`}
//                           className="px-6 py-2 sheen rounded-lg bg-primary-green text-white">
//                           Design
//                         </Link>
//                         <small className="">Featured</small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section className="album py-10 bg-light" id="default">
//           <div className="container space-y-14">
//             <div className="text-center space-y-2">
//               <h2 className="font-weight-normal font-size-40">Basic layouts</h2>
//               <p className="">Start your design by choosing one of available layout templates that come with our Email builder.</p>
//             </div>
//             <div className="grid grid-cols-4 gap-7">
//               {defaultTemplates.map((template) => (
//                 <div key={template.id}>
//                   <div className="rounded-xl overflow-hidden mb-4 shadow-md shadow-gray-300/50 bg-white group">
//                     <Link href={`/app/create/email-builder/design?type=default&id=${template.id}`}>
//                       <img
//                         width="100%"
//                         height="100%"
//                         className="group-hover:opacity-80 transition-all duration-300"
//                         src={template.thumb}
//                         title={template.title}
//                         alt={template.title}
//                       />
//                     </Link>
//                     <div className="py-5 px-6 space-y-1.5">
//                       <h5 className="line-clamp-1 text-[17px]">{template.title}</h5>
//                       <div className="!mt-5 flex justify-between items-center">
//                         <Link
//                           href={`/app/create/email-builder/design?type=default&id=${template.id}`}
//                           className="px-6 py-2 sheen rounded-lg bg-primary-green text-white">
//                           Design
//                         </Link>
//                         <small className="">Default</small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               w
//             </div>
//           </div>
//         </section>
//         <section className="album py-10 bg-light" id="custom">
//           <div className="container space-y-14">
//             <div className="text-center space-y-2">
//               <h2 className="font-weight-normal font-size-40">Or upload your template and edit</h2>
//               <p className="">If you already have an email or page template, just load it to the editor and start editing...</p>
//             </div>
//             <div className="grid grid-cols-4 gap-7">
//               {customTemplates.map((template) => (
//                 <div key={template.id}>
//                   <div className="rounded-xl overflow-hidden mb-4 shadow-md shadow-gray-300/50 bg-white group">
//                     <Link href={`/app/create/email-builder/design?type=custom&id=${template.id}`}>
//                       <img
//                         width="100%"
//                         height="100%"
//                         className="group-hover:opacity-80 transition-all duration-300"
//                         src={template.thumb}
//                         title={template.title}
//                         alt={template.title}
//                       />
//                     </Link>
//                     <div className="py-5 px-6 space-y-1.5">
//                       <h5 className="line-clamp-1 text-[17px]">{template.title}</h5>
//                       <div className="!mt-5 flex justify-between items-center">
//                         <Link
//                           href={`/app/create/email-builder/design?type=custom&id=${template.id}`}
//                           className="px-6 py-2 sheen rounded-lg bg-primary-green text-white">
//                           Design
//                         </Link>
//                         <small className="">Custom</small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Home;
