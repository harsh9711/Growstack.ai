/* eslint-disable @next/next/no-img-element */
import { Header } from "./components/Header";
import { InteractiveElement } from "./components/Element";
import Footer from "@/app/(landing)/components/Footer";

export default function Page() {
  return (
    <div
      className="bg-gray-100 min-h-screen relative"
      style={{
        backgroundImage: "url(/dragimages/background-grids.png)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full  -z-0"
        style={{
          backgroundImage: "url(/dragimages/bg-grediant.png)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full  z-0"
        style={{
          backgroundImage: "url(/dragimages/background_image.svg)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative pb-[23rem] z-0 max-w-[dvw] overflow-hidden">
        <Header />
        <InteractiveElement />
      </div>
      <Footer />
    </div>
  );
}
