import DragingBoard from "./DragingBoard";
import SectionHeader from "./SectionHeader";
import FeaturesCategory from "./category/FeaturesCategory";

export default function DragFeatures() {
  return (
    <section className="rounded-3xl 2xl:mt-12 bg-gradient-to-b from-[#ffffff]/100 via-[#ffffff]/100 to-[#009975]">
      <div className="w-full sm:max-w-6xl 2xl:max-w-8xl mx-auto px-4  ">
        <SectionHeader />
        {/* Dragable container */}
        <div className="sm:flex flex-col hidden ">
          {" "}
          <DragingBoard />
          {/* Category Nav area */}
          <FeaturesCategory />
        </div>
      </div>
    </section>
  );
}
