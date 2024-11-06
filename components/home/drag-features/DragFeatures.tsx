import Image from "next/image";
import DragingBoard from "./DragingBoard";
import SectionHeader from "./SectionHeader";
import FeaturesCategory from "./category/FeaturesCategory";
import "../../../styles/animate.css";
export default function DragFeatures() {
  return (
    <section className="rounded-3xl 2xl:mt-6 bg-gradient-to-b from-[#2DA771]/100 to-[#00693B]/100 sm:bg-[url('/landingpagerevamp/drag.svg')] bg-[100%] bg-cover bg-no-repeat animated-bg">
      <div className="w-full sm:max-w-6xl 2xl:max-w-8xl mx-auto px-4 ">
        <SectionHeader />
        {/* Dragable container */}
        <div className="sm:flex flex-col hidden ">
          {" "}
          <DragingBoard /> <FeaturesCategory />
        </div>
      </div>
    </section>
  );
}
// import { useState } from "react";
// import DragingBoard from "./DragingBoard";
// import SectionHeader from "./SectionHeader";
// import FeaturesCategory from "./category/FeaturesCategory";
// import "../../../styles/hero.css"
// export default function DragFeatures() {
//   const [isFormFocused, setIsFormFocused] = useState(true);
//   return (
//     <section
//       className={`rounded-3xl 2xl:mt-12 transition-all  duration-[10000ms] ease-in-out ${
//         isFormFocused
//           ? "bg-gradient-to-b from-[#ffffff]/100 to-[#009975]"
//           : "bg-gradient-to-b from-[#ffffff]/100 via-[#ffffff]/100 to-[#009975]"
//       }`}
//     >
//       <div
//         onMouseEnter={() => setIsFormFocused(false)}
//         onMouseLeave={() => setIsFormFocused(true)}
//         className="w-full sm:max-w-6xl transition-all duration-[10000ms] ease-in-out 2xl:max-w-8xl mx-auto px-4"
//       >
//         <SectionHeader />

//         <div
//           className={`sm:flex flex-col hidden transition-transform transform duration-[10000ms] ease-in-out ${
//             !isFormFocused
//               ? "translate-y-0 scale-105 opacity-100"
//               : "-translate-y-10 scale-95 opacity-80"
//           }`}
//         >
//           <DragingBoard />
//           <FeaturesCategory />
//         </div>
//       </div>
//     </section>
//   );
// }
