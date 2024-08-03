import Image from "next/image";
import { ArrowRight, Video } from "lucide-react";
import React from "react";
import Slider from "react-slick";
import Navbar from '@/components/navbar/Navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// const nunito = Nunito_Sans({
//   subsets: ["latin"],
//   weight: ["800"],
//   display: "swap",
// });
const MidMarket=()=> {
    type SliderRef = Slider | null;

const sliderRef = React.createRef<Slider>();

const next = () => {
  sliderRef.current?.slickNext();
};

const previous = () => {
  sliderRef.current?.slickPrev();
};

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,
  centerPadding: '20px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        centerPadding: '15px', 
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '10px', 
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '5px', 
      },
    },
  ],
};
  return (
    <main className="">
<Navbar logoUrl="/images/logo.png" logoAlt="Custom Logo" />

      <section className="">
        <div className="relative flex items-center w-full h-full  rounded-[40px]  pt-40 bg-[#F3F7F6] ">
          <div className="w-full h-full mx-auto flex flex-col  justify-between max-h-[870px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[303px] ">
                  Growstack for large enterprises
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[56px]  leading-12 flex flex-col  items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    <span className="font-semibold text-center">
                      Streamline complex
                    </span>
                    <span className="font-light text-center">
                      operation's with advance AI solutions
                    </span>
                  </h1>

                  <p className="text-[18px]  items-center justify-center text-center max-w-[819px] leading-loose">
                    Growstack's advanced Al tools and scalable solutions address
                    the unique challenges of large enterprises by ensuring
                    global alignment, consistent marketing and sales, effective
                    personalization, and seamless data integration.{" "}
                  </p>
                  <div className="flex flex-col gap-24 mt-4 items-center justify-center ">
                    <div className="flex flex-row gap-8 ">
                      <button className="bg-[#034737] text-white font-medium flex items-center gap-2 py-4 px-7 rounded-xl hover:font-bold shadow-md shadow-[#00000025]">
                        Free free trial <ArrowRight />
                      </button>
                      <button className="border border-[#D9D9D9] flex items-center gap-2 text-black hover:font-bold font-medium py-4 px-7 rounded-xl shadow-md shadow-[#00000025]">
                        See demo <ArrowRight className="text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
            <div className="relative translate-y-16 flex -translate-x-60 ">
                <Image src="/solutions/dlk.svg" width={1951} height={448} alt="img"/>
              </div>
          </div>
        </div>
      </section>

    

      <section className="mb-20 mt-10">
      <div className=" w-full max-w-[1920px] h-[602px] gap-y-4 flex flex-col items-center justify-center mx-auto" style={{ backgroundImage: 'url(/solutions/background.svg)', maxWidth:"2000px" }}>
             

      <div className="relative flex flex-col gap-y-4 justify-center items-center mx-auto bg-cover py-20 bg-center bg-no-repeat" >
  
  <h1 className="text-[56px] leading-12 flex flex-col items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent relative z-10">
    <span className="font-semibold text-center">
      Comprehensive solution for
    </span>
    <span className="font-light text-center">
      enterprise level success
    </span>
  </h1>

  <p className="text-[18px] text-center max-w-[819px] leading-loose relative z-10">
    Discover how GrowStacks advanced AI solutions streamline processes
  </p>
</div>

              </div>
      </section>
      <section className="p-4">
        <div className="relative flex items-center w-full h-full  rounded-[40px]  py-40 bg-gradient-to-b from-[#E2F0CB4D] to-[#FFFFFF4D] overflow-hidden">
          <div className="w-full h-full mx-auto flex flex-col  justify-between max-h-[950px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[139px] ">
                Consistency
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[56px]  leading-12 flex  gap-4  items-center justify-center text-black">
                    <span className="font-semibold text-center">
                    Global  alignment 
                    </span>
                    <span className="font-light text-center">
                    and consistency
                    </span>
                  </h1>

            
                  <div className="">
                    {/* <video width="320" height="240" controls preload="none">
      <source src="/solutions/lineanimation.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video> */}
    {/* <Slider ref={sliderRef} {...settings} className=""> 
      {testimonials.map((item, index) => (
        <div
          key={index}
          className="w-[682px] h-[468px] bg-white rounded-[17px] border border-[#e9e7e7] flex flex-col p-6 mx-4" // Adjusted margin for space between cards
        >
          <div className="flex flex-col justify-between h-full w-full">
            <div className="flex flex-col gap-y-4 pb-6">
              <h1 className="text-[18px] text-black leading-normal font-light multi-line-ellipsis">
                {item.id}
              </h1>
            </div>
            <div className="space-x-4 mt-10 flex flex-row">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-[24px] text-black leading-normal font-medium multi-line-ellipsis">
                  {item.name}
                </h1>
                <p className="text-[18px] text-black multi-line-ellipsis">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider> */}
  </div>
                </div>
              </div>
            
            </div>
           
          </div>
        </div>
      </section>
      {/* <section className="mb-20">
        <div className="space-y-7 max-w-[1860px] mx-auto">
          <div className="max-w-[1480px] mx-auto">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#034737]">
              Core Features
            </div>
            <div className="flex items-center justify-between gap-20 mt-2">
              <h1 className="w-full text-[42px] max-w-2xl leading-normal bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                <span className="font-semibold">Discover Our Powerful  </span>
                <br /> <span className="font-extralight">AI Features</span>
              </h1>
              <p className="w-full max-w-lg leading-loose">
                Explore how our AI-driven tools transform every aspect of your business strategy and propel your success forward
              </p>
            </div>
          </div>

        
        </div>
      </section> */}

      {/* <section className="bg-[url('/backgrounds/abstract-dots.png')] mb-20 bg-no-repeat bg-cover  pt-28">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#03473726]/15 py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#034737]">Complete Marketing Ecosystem</div>
          <h1 className="text-[42px] w-full leading-normal flex flex-col font-semibold  text-center">
          Streamline Your Marketing Workflow from<span className="font-light">Planning to Engagement with Growstack</span>
          </h1>
        </div>
      </section> */}
 {/* <section className="py-10 mb-20">
        <div className="bg-[#FAFBFC]   flex flex-row items-center justify-center gap-4"><div><Image src="/lappygreen.png" alt="lappy" width={700} height={600}/></div>
          <div className="flex flex-col items-start space-y-4">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#034737]">
              {" "}
              Premium analytics            </div>
            <h1 className="text-[42px] max-w-2xl leading-normal font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text  text-left">
            Security & data privacy of the 
            highest degree <span className="text-[14px] text-transparent">(GDPR Compliance & HIPAA Compliance)</span>
            </h1>
            <p className="text-[18px] w-[700px] text-left !mt-10">We collaborate with all major LLMs, ensuring choice and flexibility while making sure your contact data is 100% secure and cannot be used for anyone else's purposes.</p>
    
          </div>
        </div>
      </section> */}
      {/* <section className="mb-20">
        <div className="space-y-7 max-w-[1860px] mx-auto">
          <div className="max-w-[1480px] mx-auto">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#009689]">
              Other Features
            </div>
            <div className="flex items-center justify-between gap-20 mt-5">
              <h1 className="w-full text-[42px] max-w-2xl leading-normal bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                <span className="font-semibold">Expand Your Capabilities</span>
                <br /> <span className="font-extralight"> with Seamless Integrations                </span>
              </h1>
              <p className="w-full max-w-lg leading-loose">Unlock the full potential of your business with integrated AI solutions for reputation management and automated communication.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="grid grid-cols-1 grid-rows-2 gap-5">
                <div className="bg-[#C1B1E4] p-10 rounded-3xl space-y-2">
                  <h1 className="text-[34px] font-semibold">Reputation management</h1>
                  <p className="leading-relaxed text-lg">Monitor and improve your ratings across multiple review platforms, ensuring your brand shines.</p>
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
                  <h1 className="text-[34px] font-semibold mt-4">Contact Management</h1>
                  <p className="leading-relaxed text-lg mt-6">Keep your contact information organized and protected.</p>
                </div>
              </div>
              <div className="bg-[#F582A5] p-10 rounded-3xl gap-10 flex flex-col">
                <h1 className="text-[34px] font-semibold">
                  WhatsApp and Telegram <br /> automation <span className="font-light"> with our apps</span>
                </h1>
                <p className="leading-relaxed text-lg">
                Utilize our apps to automate messaging workflows, maintain engagement, and boost customer satisfaction.
                </p>
                <svg className="translate-y-40 translate-x-10"  width="568" height="504" viewBox="0 0 568 504" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_4401_13588)">
<circle cx="284" cy="168.477" r="108" fill="white"/>
</g>
<circle cx="284" cy="168.477" r="127" stroke="white" stroke-width="2"/>
<path d="M451.5 168.477C451.5 212.9 433.853 255.505 402.44 286.917C371.028 318.329 328.424 335.977 284 335.977C239.576 335.977 196.972 318.329 165.56 286.917C134.147 255.505 116.5 212.9 116.5 168.477" stroke="white" stroke-dasharray="9 9"/>
<circle cx="136" cy="242.477" r="14" fill="white"/>
<circle cx="181" cy="300.477" r="14" fill="white"/>
<circle cx="245" cy="332.477" r="14" fill="white"/>
<circle cx="321" cy="332.477" r="14" fill="white"/>
<circle cx="388" cy="300.477" r="14" fill="white"/>
<circle cx="432" cy="242.477" r="14" fill="white"/>
<circle cx="136" cy="242.477" r="8" fill="#FD01B6"/>
<circle cx="181" cy="300.477" r="8" fill="#1977F3"/>
<circle cx="245" cy="332.477" r="8" fill="#33ABE0"/>
<circle cx="321" cy="332.477" r="8" fill="#27D045"/>
<circle cx="388" cy="300.477" r="8" fill="#EA4335"/>
<circle cx="432" cy="242.477" r="8" fill="#185C37"/>
<path d="M126 252.477L75 303.477" stroke="white" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M173.345 313.477L144.959 379.781" stroke="white" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M242.825 346.477L237.07 418.372" stroke="white" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M322.651 346.476L329.178 418.305" stroke="white" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M396.423 313.477L430.918 376.818" stroke="white" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M444.534 251.475L490.798 306.807" stroke="white" stroke-width="2" stroke-dasharray="4 4"/>
<circle cx="38" cy="336.477" r="37.5" fill="white" stroke="#FCB002"/>
<circle cx="113" cy="419.477" r="37.5" fill="white" stroke="#E74694"/>
<circle cx="229" cy="465.477" r="37.5" fill="white" stroke="#10A1F3"/>
<circle cx="333" cy="465.477" r="37.5" fill="white" stroke="#009689"/>
<circle cx="449" cy="428.477" r="37.5" fill="white" stroke="#FCB002"/>
<circle cx="530" cy="355.477" r="37.5" fill="white" stroke="#C84DFF"/>
<path d="M225.64 190.617C225.08 189.329 224.221 188.321 223.064 187.593C221.925 186.846 220.581 186.473 219.032 186.473C217.576 186.473 216.269 186.809 215.112 187.481C213.955 188.153 213.04 189.114 212.368 190.365C211.696 191.597 211.36 193.034 211.36 194.677C211.36 196.319 211.696 197.766 212.368 199.017C213.04 200.267 213.955 201.229 215.112 201.901C216.269 202.573 217.576 202.909 219.032 202.909C220.395 202.909 221.617 202.619 222.7 202.041C223.801 201.443 224.679 200.603 225.332 199.521C226.004 198.419 226.387 197.141 226.48 195.685H218.248V194.089H228.552V195.517C228.459 197.234 227.992 198.793 227.152 200.193C226.312 201.574 225.183 202.666 223.764 203.469C222.364 204.271 220.787 204.673 219.032 204.673C217.221 204.673 215.579 204.253 214.104 203.413C212.629 202.554 211.463 201.369 210.604 199.857C209.764 198.326 209.344 196.599 209.344 194.677C209.344 192.754 209.764 191.037 210.604 189.525C211.463 187.994 212.629 186.809 214.104 185.969C215.579 185.11 217.221 184.681 219.032 184.681C221.123 184.681 222.952 185.203 224.52 186.249C226.088 187.294 227.227 188.75 227.936 190.617H225.64ZM234.102 191.905C234.532 190.953 235.185 190.215 236.062 189.693C236.958 189.17 238.05 188.909 239.338 188.909V190.953H238.806C237.388 190.953 236.249 191.335 235.39 192.101C234.532 192.866 234.102 194.145 234.102 195.937V204.477H232.142V189.189H234.102V191.905ZM248.979 204.701C247.542 204.701 246.244 204.383 245.087 203.749C243.948 203.095 243.043 202.181 242.371 201.005C241.718 199.81 241.391 198.419 241.391 196.833C241.391 195.246 241.727 193.865 242.399 192.689C243.071 191.494 243.986 190.579 245.143 189.945C246.3 189.291 247.598 188.965 249.035 188.965C250.472 188.965 251.77 189.291 252.927 189.945C254.103 190.579 255.018 191.494 255.671 192.689C256.343 193.865 256.679 195.246 256.679 196.833C256.679 198.401 256.343 199.782 255.671 200.977C254.999 202.171 254.075 203.095 252.899 203.749C251.723 204.383 250.416 204.701 248.979 204.701ZM248.979 202.993C249.987 202.993 250.92 202.769 251.779 202.321C252.638 201.854 253.328 201.163 253.851 200.249C254.392 199.315 254.663 198.177 254.663 196.833C254.663 195.489 254.402 194.359 253.879 193.445C253.356 192.511 252.666 191.821 251.807 191.373C250.948 190.906 250.015 190.673 249.007 190.673C247.999 190.673 247.066 190.906 246.207 191.373C245.348 191.821 244.658 192.511 244.135 193.445C243.631 194.359 243.379 195.489 243.379 196.833C243.379 198.177 243.631 199.315 244.135 200.249C244.658 201.163 245.339 201.854 246.179 202.321C247.038 202.769 247.971 202.993 248.979 202.993ZM280.412 189.189L275.624 204.477H273.664L269.436 191.653L265.208 204.477H263.22L258.432 189.189H260.42L264.228 202.489L268.512 189.189H270.472L274.7 202.517L278.48 189.189H280.412Z" fill="#14171B"/>
<path d="M289.356 204.673C288.049 204.673 286.873 204.449 285.828 204.001C284.782 203.534 283.961 202.881 283.364 202.041C282.766 201.201 282.468 200.221 282.468 199.101H285.884C285.958 199.941 286.285 200.631 286.864 201.173C287.461 201.714 288.292 201.985 289.356 201.985C290.457 201.985 291.316 201.723 291.932 201.201C292.548 200.659 292.856 199.969 292.856 199.129C292.856 198.475 292.66 197.943 292.268 197.533C291.894 197.122 291.418 196.805 290.84 196.581C290.28 196.357 289.496 196.114 288.488 195.853C287.218 195.517 286.182 195.181 285.38 194.845C284.596 194.49 283.924 193.949 283.364 193.221C282.804 192.493 282.524 191.522 282.524 190.309C282.524 189.189 282.804 188.209 283.364 187.369C283.924 186.529 284.708 185.885 285.716 185.437C286.724 184.989 287.89 184.765 289.216 184.765C291.101 184.765 292.641 185.241 293.836 186.193C295.049 187.126 295.721 188.414 295.852 190.057H292.324C292.268 189.347 291.932 188.741 291.316 188.237C290.7 187.733 289.888 187.481 288.88 187.481C287.965 187.481 287.218 187.714 286.64 188.181C286.061 188.647 285.772 189.319 285.772 190.197C285.772 190.794 285.949 191.289 286.304 191.681C286.677 192.054 287.144 192.353 287.704 192.577C288.264 192.801 289.029 193.043 290 193.305C291.288 193.659 292.333 194.014 293.136 194.369C293.957 194.723 294.648 195.274 295.208 196.021C295.786 196.749 296.076 197.729 296.076 198.961C296.076 199.95 295.805 200.883 295.264 201.761C294.741 202.638 293.966 203.347 292.94 203.889C291.932 204.411 290.737 204.673 289.356 204.673ZM303.566 191.653V200.193C303.566 200.771 303.697 201.191 303.958 201.453C304.238 201.695 304.705 201.817 305.358 201.817H307.318V204.477H304.798C303.361 204.477 302.26 204.141 301.494 203.469C300.729 202.797 300.346 201.705 300.346 200.193V191.653H298.526V189.049H300.346V185.213H303.566V189.049H307.318V191.653H303.566ZM309.196 196.693C309.196 195.143 309.513 193.771 310.148 192.577C310.801 191.382 311.679 190.458 312.78 189.805C313.9 189.133 315.132 188.797 316.476 188.797C317.689 188.797 318.744 189.039 319.64 189.525C320.555 189.991 321.283 190.579 321.824 191.289V189.049H325.044V204.477H321.824V202.181C321.283 202.909 320.545 203.515 319.612 204.001C318.679 204.486 317.615 204.729 316.42 204.729C315.095 204.729 313.881 204.393 312.78 203.721C311.679 203.03 310.801 202.078 310.148 200.865C309.513 199.633 309.196 198.242 309.196 196.693ZM321.824 196.749C321.824 195.685 321.6 194.761 321.152 193.977C320.723 193.193 320.153 192.595 319.444 192.185C318.735 191.774 317.969 191.569 317.148 191.569C316.327 191.569 315.561 191.774 314.852 192.185C314.143 192.577 313.564 193.165 313.116 193.949C312.687 194.714 312.472 195.629 312.472 196.693C312.472 197.757 312.687 198.69 313.116 199.493C313.564 200.295 314.143 200.911 314.852 201.341C315.58 201.751 316.345 201.957 317.148 201.957C317.969 201.957 318.735 201.751 319.444 201.341C320.153 200.93 320.723 200.333 321.152 199.549C321.6 198.746 321.824 197.813 321.824 196.749ZM328.173 196.749C328.173 195.162 328.49 193.771 329.125 192.577C329.778 191.363 330.674 190.43 331.813 189.777C332.951 189.123 334.258 188.797 335.733 188.797C337.599 188.797 339.139 189.245 340.353 190.141C341.585 191.018 342.415 192.278 342.845 193.921H339.401C339.121 193.155 338.673 192.558 338.057 192.129C337.441 191.699 336.666 191.485 335.733 191.485C334.426 191.485 333.381 191.951 332.597 192.885C331.831 193.799 331.449 195.087 331.449 196.749C331.449 198.41 331.831 199.707 332.597 200.641C333.381 201.574 334.426 202.041 335.733 202.041C337.581 202.041 338.803 201.229 339.401 199.605H342.845C342.397 201.173 341.557 202.423 340.325 203.357C339.093 204.271 337.562 204.729 335.733 204.729C334.258 204.729 332.951 204.402 331.813 203.749C330.674 203.077 329.778 202.143 329.125 200.949C328.49 199.735 328.173 198.335 328.173 196.749ZM352.13 196.777L359.242 204.477H354.93L349.218 197.841V204.477H346.026V183.757H349.218V195.797L354.818 189.049H359.242L352.13 196.777Z" fill="#034737"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M286 168.477C304.225 168.477 319 153.702 319 135.477C319 117.251 304.225 102.477 286 102.477C267.775 102.477 253 117.251 253 135.477C253 153.702 267.775 168.477 286 168.477ZM287.944 108.301C283.414 116.389 279.014 134.313 297.65 141.301L287.944 163.624L258.824 136.448C260.767 128.036 269.31 110.63 287.944 108.301Z" fill="#034737"/>
<defs>
<filter id="filter0_i_4401_13588" x="176" y="53.4766" width="216" height="223" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-7"/>
<feGaussianBlur stdDeviation="5.55"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.518333 0 0 0 0 0.518333 0 0 0 0 0.518333 0 0 0 0.61 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_4401_13588"/>
</filter>
</defs>
</svg>


              </div>
              <div className="bg-[#FDDF6E] p-10 rounded-3xl col-span-2 ">
                <h1 className="text-[34px] font-semibold mt-40">
                Discover Valuable Contacts<span className="font-light">  with Google Web Scraping</span>
                </h1>
                <p className="leading-relaxed text-lg mt-6">Use our Google web scraping tool to identify and collect contact details, enhancing your marketing and outreach efforts..</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="mb-20">
        <div className="bg-[url('/backgrounds/abstract-dots.png')] bg-no-repeat bg-cover w-full space-y-12 py-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#009689]">
            Why Choose GrowStack?
            </div>
            <h1 className="text-[42px] max-w-4xl leading-normal font-semibold  text-center">
            Experience unparalleled growth with 
            our cutting-edge  <span className="font-light">AI solutions designed 
              to elevate your business</span>
            </h1>
          </div>
          <div className="flex gap-5 max-w-[1480px] mx-auto">
            <div className="bg-white space-y-4 rounded-3xl border border-[#E3E3E3] p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="p-3 max-w-fit bg-[#6B66DA] rounded-xl">
                <Image src="/icons/efficiency.svg" alt="" width={40} height={40} />
              </div>
              <h1 className="text-[24px] max-w-[300px] leading-normal font-bold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
              Supercharge Your  <span className="font-normal">Efficiency</span>
              </h1>
              <p className="leading-relaxed">
              Harness the power of AI to streamline your workflows and boost productivity, ensuring you achieve more with less effort.              </p>
            </div>
            <div className="bg-white space-y-4 rounded-3xl border border-[#E3E3E3] p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="p-3 max-w-fit bg-[#FFCC29] rounded-xl">
                <Image src="/icons/social-engagement.svg" alt="" width={40} height={40} />
              </div>
              <h1 className="text-[24px] max-w-2xl leading-normal font-bold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
              Optimize Your  <span className="font-normal">Revenue</span>
              </h1>
              <p className="leading-relaxed">
              Leverage data-driven insights and AI tools to optimize your revenue streams, enhancing profitability and business growth.
              </p>
            </div>
            <div className="bg-white space-y-4 rounded-3xl border border-[#E3E3E3] p-10 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="p-3 max-w-fit bg-[#10A1F3] rounded-xl">
                <Image src="/icons/competitive-advantage.svg" alt="" width={40} height={40} />
              </div>
              <h1 className="text-[24px] max-w-2xl leading-normal font-bold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
              Speed Up Your <span className="font-normal">Work</span>
              </h1>
              <p className="leading-relaxed">
              Quickly integrate our AI solutions into your existing systems, accelerating your operations without disrupting daily activities.              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-primary-green">
        <div className="flex items-center">
          <div className="w-full mx-auto flex justify-end py-20">
            <div className="max-w-[740px] w-full">
              <div className="w-full max-w-3xl space-y-6 text-white">
                <div className="bg-[#FFFFFF14] py-2 px-4 flex items-center gap-3 rounded-full text-sm font-semibold max-w-fit">
                  {" "}
                  CTA
                </div>
                <h1 className="text-[38px] max-w-2xl leading-normal bg-gradient-to-b from-white  bg-clip-text ">
                  <span className="font-semibold">
                    On-The-Go with Our Mobile App{" "}
                  </span>
                  <br /> <span className="font"> integrated CRM platform </span>{" "}
                  <br />{" "}
                  <span className="font-extralight"> built for success</span>
                </h1>
                <p className="text-[17px] leading-loose">
                  Stay productive anywhere with real-time control and insights,
                  effortlessly managing your business with our intuitive mobile
                  app
                </p>
                <button className="bg-white flex items-center gap-2 text-primary-green py-4 px-9 rounded-xl shadow-md shadow-[#00000025]">
                  Get Started <ArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[url('/backgrounds/background-ellipse.png')] translate-y-14 bg-center bg-no-repeat flex justify-end py-10 mt-10">
            <Image src="/phone.png" alt="" width={900} height={900} />
          </div>
        </div>
      </section>

      <section className="py-10 flex flex-col gap-20 mt-20">
        <div className="flex flex-col items-center gap-7">
          <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#034737]">
            {" "}
            FAQ
          </div>
          <h1 className="text-[42px] font-semibold text-primary-green">
            Quick answers{" "}
            <span className="font-light bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
              on GrowStack
            </span>{" "}
          </h1>
        </div>
        <div className="bg-[url('/backgrounds/abstract-dots.png')] bg-no-repeat bg-cover bg-right-bottom w-full"></div>
      </section>
    </main>
  );
}
export default MidMarket;