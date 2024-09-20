import DragingBoard from "./DragingBoard";
import SectionHeader from "./SectionHeader";
import FeaturesCategory from "./category/FeaturesCategory";

export default function DragFeatures() {
  return (
    <section
      className="rounded-3xl mt-1  bg-gradient-to-b from-[#ffffff]/100 via-[#ffffff]/100 to-[#009975]"
    >
      <div className="max-w-8xl mx-auto px-4">
        <SectionHeader />
        {/* Dragable container */}
        <DragingBoard />
        {/* Category Nav area */}
        <FeaturesCategory />
      </div>
    </section>
  );
}
