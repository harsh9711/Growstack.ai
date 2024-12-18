import DragingBoard from "./DragingBoard";
import SectionHeader from "./SectionHeader";
import FeaturesCategory from "./category/FeaturesCategory";
import "../../../styles/animate.css";
export default function DragFeatures() {
  return (
    <section className="rounded-3xl  bg-gradient-to-b from-[#2DA771]/100 to-[#00693B]/100 sm:bg-[url('/landingpagerevamp/drag.svg')] bg-[100%] bg-cover bg-no-repeat animated-bg">
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
