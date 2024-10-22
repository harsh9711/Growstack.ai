"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const ContentBox = () => {
  const [selectedSection, setSelectedSection] = useState<string>("firstid");

  const handleClick = (id: string) => {
    setSelectedSection(id);
  };

  return (
    <div className="p-4 sm:p-6 md:p-0 flex md:flex-row flex-col max-w-[1240px] gap-4 sm:gap-6 md:gap-10 items-start justify-center mx-auto">
      <div className="flex flex-col gap-y-6 sm:gap-y-8 md:sticky md:top-10">
        <div className="flex flex-row sm:flex-row md:flex-col gap-x-6 sm:gap-x-8">
          <Image
            src="/blog1.svg"
            width={162}
            height={162}
            alt="blog"
            className="w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:w-[162px] md:h-[162px] rounded-xl"
          />
          <div className="flex flex-col">
            <h2 className="font-bold mt-4 text-[12px] sm:text-[16px] md:text-[18px]">
              
              Josh Gould
            
            </h2>
            <p className="text-[12px] sm:text-[13px] md:text-[14px] font-light">
              
              Blog writer
            
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-y-4">
          <h2 className="text-[16px] sm:text-[18px] font-semibold">Contents</h2>
          <div className="flex flex-col text-black font-light gap-y-4 w-full">
            <Link
              href="#firstid"
              className={`flex flex-row gap-6 ${
                selectedSection === "firstid"
                  ? "border-[#034737] border-l-[4.8px] p-4"
                  : ""
              }`}
            >
              <h2
                className={
                  selectedSection === "firstid"
                    ? "text-[#034737] font-extrabold"
                    : "font-medium"
                }
                onClick={() => handleClick("firstid")}
              >
                Understanding Gen AI: More Than Just Hype
              </h2>
            </Link>
            <Link
              href="#secondid"
              className={`flex flex-row gap-6 ${
                selectedSection === "secondid"
                  ? "border-[#034737] border-l-[4.8px] p-4"
                  : ""
              }`}
            >
              <h2
                className={
                  selectedSection === "secondid"
                    ? "text-[#034737] font-extrabold"
                    : "font-medium"
                }
                onClick={() => handleClick("secondid")}
              >
                Omnis ipsum ratione optio sed quos aspernatur nam.
              </h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[884px]">
        <div
          className="flex flex-col gap-y-2 sm:gap-y-4 md:gap-y-6"
          id="firstid"
        >
          <h2 className="font-bold text-[16px] sm:text-[18px]">
            Omnis ipsum ratione optio sed quos aspernatur nam.
          </h2>
          <p className="text-[12px] sm:text-[14px]">
            Maxime distinctio nulla aliquam. Illo voluptatibus nulla. Ut
            consequuntur consequatur tempore suscipit minima voluptatem labore
            laudantium et. Quaerat praesentium consequatur voluptas dolore
            voluptates adipisci. Delectus delectus consequatur ex rerum.
            Laudantium quaerat reprehenderit vel animi.
          </p>
          <h2 className="font-bold text-[16px] sm:text-[18px]">
            Understanding Gen AI: More Than Just Hype
          </h2>

          <h2 className="font-semibold">
            “The future is already here — it’s just not very evenly
            distributed.” – William Gibson.
          </h2>
          <div className="flex flex-row gap-2 sm:gap-4 md:gap-6">
            <div className="border-[#E2E2E2] rounded-2xl border-[4.8px]"></div>
            <p className="max-w-[708px]">
              Modi praesentium maxime quos aperiam nulla nihil consequatur
              soluta enim. Vitae eos eius totam atque. Corrupti voluptatem porro
              quis aut qui aperiam odit hic. Libero sint ea quia quaerat.
            </p>
          </div>
          <p>
            Vero placeat delectus cupiditate placeat ab dicta. Neque dolorem
            sequi culpa quo. Iste ab esse qui quibusdam. Et ullam rerum
            temporibus. Quaerat sit est corporis sit nihil nisi sapiente. Enim
            laudantium ut earum beatae eveniet earum.
          </p>
          <p>
            Quia iusto sint qui recusandae maxime ipsum eos vitae. Deserunt
            quisquam reprehenderit sit et alias doloremque nam necessitatibus
            sit. Est rerum cupiditate commodi sint enim velit suscipit.
          </p>
          <h2 className="font-bold text-[16px] sm:text-[18px]">
            Repellendus architecto atque.
          </h2>
          <p className="text-[12px] sm:text-[14px]">
            Non deleniti qui. Voluptatibus suscipit id non. Fugit adipisci
            explicabo eligendi culpa expedita quidem voluptas.
          </p>
          <h2 className="font-bold text-[18px] sm:text-[20px]">
            Quia qui et et atque repellat et.
          </h2>
          <div className="flex flex-row gap-2 sm:gap-4 md:gap-6">
            <div className="border-[#E2E2E2] rounded-2xl border-[4.8px]"></div>
            <p className="max-w-[708px]">
              Est unde sequi cumque iusto sunt nisi nemo. Dolorem et provident
              tempora dolores suscipit dicta dolores. Laudantium sed cupiditate
              aut. Rem aut omnis sunt ut.
            </p>
          </div>
          <p>
            Nihil occaecati impedit sunt omnis sed quis. Repudiandae ut
            voluptatem sed voluptate rem. Quis et ut et ipsum.
          </p>
          <p>
            Quia velit maiores optio. Illum qui ea autem at vero ut soluta. Non
            architecto voluptas sit vitae qui laudantium voluptatum tempora.
            Doloremque et incidunt ipsam qui modi. Dolorem sit iure earum nihil.
            Harum cumque perferendis.
          </p>
          <Image src="/box.svg" width={925} height={515} alt="box" />
          <div id="secondid">
            <h2 className="font-bold text-[16px] sm:text-[18px]">
              Omnis ipsum ratione optio sed quos aspernatur nam.
            </h2>
            <p className="text-[12px] sm:text-[14px]">
              Maxime distinctio nulla aliquam. Illo voluptatibus nulla. Ut
              consequuntur consequatur tempore suscipit minima voluptatem labore
              laudantium et. Quaerat praesentium consequatur voluptas dolore
              voluptates adipisci. Delectus delectus consequatur ex rerum.
              Laudantium quaerat reprehenderit vel animi.
            </p>
          </div>
          <p>
            According to a Forbes article, 84% of executives stated that
            scalability and customization are vital for the future success of
            AI. Gen AI solutions from GrowStack are built to be unique for your
            business, like a tailor-made suit. Regardless of whether you use our
            tools to launch a new startup, to develop an idea of content
            automation, or as an enterprise of any kind trying to get closer to
            the consumer, our tools adjust to your requirements. We don’t just
            want to be a presence; we want to be leading that presence.
          </p>
          {/* <p>
            Quia iusto sint qui recusandae maxime ipsum eos vitae. Deserunt
            quisquam reprehenderit sit et alias doloremque nam necessitatibus
            sit. Est rerum cupiditate commodi sint enim velit suscipit.
          </p> */}
          {/* <h2 className="font-bold text-[16px] sm:text-[18px]">
            Repellendus architecto atque.
          </h2>
          <p className="text-[12px] sm:text-[14px]">
            Non deleniti qui. Voluptatibus suscipit id non. Fugit adipisci
            explicabo eligendi culpa expedita quidem voluptas.
          </p>
          <h2 className="font-bold text-[18px] sm:text-[20px]">
            Quia qui et et atque repellat et.
          </h2>
          <div className="flex flex-row gap-2 sm:gap-4 md:gap-6">
            <div className="border-[#E2E2E2] rounded-2xl border-[4.8px]"></div>
            <p className="max-w-[708px]">
              Est unde sequi cumque iusto sunt nisi nemo. Dolorem et provident
              tempora dolores suscipit dicta dolores. Laudantium sed cupiditate
              aut. Rem aut omnis sunt ut.
            </p>
          </div>
          <p>
            Nihil occaecati impedit sunt omnis sed quis. Repudiandae ut
            voluptatem sed voluptate rem. Quis et ut et ipsum.
          </p>
          <p>
            Quia velit maiores optio. Illum qui ea autem at vero ut soluta. Non
            architecto voluptas sit vitae qui laudantium voluptatum tempora.
            Doloremque et incidunt ipsam qui modi. Dolorem sit iure earum nihil.
            Harum cumque perferendis.
          </p> */}
          {/* <Image src="/box.svg" width={925} height={515} alt="box" /> */}
          {/* <div id="secondid">
            <h2 className="font-bold text-[16px] sm:text-[18px]">
              Omnis ipsum ratione optio sed quos aspernatur nam.
            </h2>
            <p className="text-[12px] sm:text-[14px]">
              Maxime distinctio nulla aliquam. Illo voluptatibus nulla. Ut
              consequuntur consequatur tempore suscipit minima voluptatem labore
              laudantium et. Quaerat praesentium consequatur voluptas dolore
              voluptates adipisci. Delectus delectus consequatur ex rerum.
              Laudantium quaerat reprehenderit vel animi.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
