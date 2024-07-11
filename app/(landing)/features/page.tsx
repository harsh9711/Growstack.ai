import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Marquee from "react-fast-marquee";
import Faq from "./Faq";
import Slider from "./Slider";
import { testimonials } from "../components/constants/testimonials";
import { featuresData } from "../components/constants/featuresData";
import Timeline from "../components/Timeline";
import Circle from "../components/Circle";

// const nunito = Nunito_Sans({
//   subsets: ["latin"],
//   weight: ["800"],
//   display: "swap",
// });

export default function Home() {
  return (
    <main className="">
      <section className="p-4 mb-20">
        <div className="relative flex items-center bg-gradient-to-b from-transparent to-[#009975] h-[75vh] rounded-[40px] pl-40 py-20 overflow-hidden">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center justify-end w-full">
              <div className="max-w-[820px] w-full gap-y-4 flex flex-col">
              <div className="bg-[#0347371A] text-[#034737] py-2 px-3.5 flex items-center gap-3 rounded-full text-sm font-semibold uppercase max-w-fit"> Users around the world</div>

                <div className="max-w-3xl     ">
                  <h1 className="text-[56px] max-w-2xl leading-12 bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    <span className="font-semibold">Your AI Catalyst for </span>
                    <br /> <span className="font-light">Business Success!</span>
                   
                  </h1>
                  <svg  className="translate-x-[520px] -translate-y-48" width="99" height="102" viewBox="0 0 99 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M90.377 22.5576L48.7356 46.5992" stroke="#034737" stroke-width="4" stroke-linecap="round"/>
<path d="M80.7051 85.6982L50.698 79.3566" stroke="#034737" stroke-width="4" stroke-linecap="round"/>
<path d="M38.7402 4.58105L25.9227 32.4441" stroke="#034737" stroke-width="4" stroke-linecap="round"/>
</svg>


                  <p className="text-[17px] w-[600px] leading-loose -translate-y-20">
                  AI is transforming the way we work. GrowStack transforms your business into an innovation powerhouse, driving unmatched productivity and meaningful progress.                  </p>
                  <div className="flex flex-row gap-8 -translate-y-10"><button className="bg-white flex items-center gap-2 text-primary-green py-4 px-7 rounded-xl shadow-md shadow-[#00000025]">
                    Get Started <ArrowRight />
                  </button><button className="border border-white flex items-center gap-2 text-white py-4 px-7 rounded-xl shadow-md shadow-[#00000025]">
                  Learn More <ArrowRight className="text-white" />
                  </button></div>
                </div>
                
              </div>
              
            </div>
            
            <div className="w-full flex items-center justify-center">
              <div />
              <svg className="-translate-x-[700px] translate-y-60" width="320" height="274" viewBox="0 0 320 274" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dddddd_4401_12416)">
<rect x="26.0002" y="124" width="251.95" height="40" rx="20" fill="white"/>
<path d="M58.1052 138.075V148.5H56.3952V141.36L53.2152 148.5H52.0302L48.8352 141.36V148.5H47.1252V138.075H48.9702L52.6302 146.25L56.2752 138.075H58.1052ZM59.6828 144.33C59.6828 143.5 59.8528 142.765 60.1928 142.125C60.5428 141.485 61.0128 140.99 61.6028 140.64C62.2028 140.28 62.8628 140.1 63.5828 140.1C64.2328 140.1 64.7978 140.23 65.2778 140.49C65.7678 140.74 66.1578 141.055 66.4478 141.435V140.235H68.1728V148.5H66.4478V147.27C66.1578 147.66 65.7628 147.985 65.2628 148.245C64.7628 148.505 64.1928 148.635 63.5528 148.635C62.8428 148.635 62.1928 148.455 61.6028 148.095C61.0128 147.725 60.5428 147.215 60.1928 146.565C59.8528 145.905 59.6828 145.16 59.6828 144.33ZM66.4478 144.36C66.4478 143.79 66.3278 143.295 66.0878 142.875C65.8578 142.455 65.5528 142.135 65.1728 141.915C64.7928 141.695 64.3828 141.585 63.9428 141.585C63.5028 141.585 63.0928 141.695 62.7128 141.915C62.3328 142.125 62.0228 142.44 61.7828 142.86C61.5528 143.27 61.4378 143.76 61.4378 144.33C61.4378 144.9 61.5528 145.4 61.7828 145.83C62.0228 146.26 62.3328 146.59 62.7128 146.82C63.1028 147.04 63.5128 147.15 63.9428 147.15C64.3828 147.15 64.7928 147.04 65.1728 146.82C65.5528 146.6 65.8578 146.28 66.0878 145.86C66.3278 145.43 66.4478 144.93 66.4478 144.36ZM72.0288 141.435C72.2788 141.015 72.6088 140.69 73.0188 140.46C73.4388 140.22 73.9338 140.1 74.5038 140.1V141.87H74.0688C73.3988 141.87 72.8888 142.04 72.5388 142.38C72.1988 142.72 72.0288 143.31 72.0288 144.15V148.5H70.3188V140.235H72.0288V141.435ZM79.2456 144.375L83.0556 148.5H80.7456L77.6856 144.945V148.5H75.9756V137.4H77.6856V143.85L80.6856 140.235H83.0556L79.2456 144.375ZM91.7563 144.165C91.7563 144.475 91.7363 144.755 91.6963 145.005H85.3813C85.4313 145.665 85.6763 146.195 86.1163 146.595C86.5563 146.995 87.0963 147.195 87.7363 147.195C88.6563 147.195 89.3063 146.81 89.6863 146.04H91.5313C91.2813 146.8 90.8263 147.425 90.1663 147.915C89.5163 148.395 88.7063 148.635 87.7363 148.635C86.9463 148.635 86.2363 148.46 85.6063 148.11C84.9863 147.75 84.4963 147.25 84.1363 146.61C83.7863 145.96 83.6113 145.21 83.6113 144.36C83.6113 143.51 83.7813 142.765 84.1213 142.125C84.4713 141.475 84.9563 140.975 85.5763 140.625C86.2063 140.275 86.9263 140.1 87.7363 140.1C88.5163 140.1 89.2113 140.27 89.8213 140.61C90.4313 140.95 90.9063 141.43 91.2463 142.05C91.5863 142.66 91.7563 143.365 91.7563 144.165ZM89.9713 143.625C89.9613 142.995 89.7363 142.49 89.2963 142.11C88.8563 141.73 88.3113 141.54 87.6613 141.54C87.0713 141.54 86.5663 141.73 86.1463 142.11C85.7263 142.48 85.4763 142.985 85.3963 143.625H89.9713ZM95.3341 141.63V146.205C95.3341 146.515 95.4041 146.74 95.5441 146.88C95.6941 147.01 95.9441 147.075 96.2941 147.075H97.3441V148.5H95.9941C95.2241 148.5 94.6341 148.32 94.2241 147.96C93.8141 147.6 93.6091 147.015 93.6091 146.205V141.63H92.6341V140.235H93.6091V138.18H95.3341V140.235H97.3441V141.63H95.3341ZM99.6902 139.14C99.3802 139.14 99.1202 139.035 98.9102 138.825C98.7002 138.615 98.5952 138.355 98.5952 138.045C98.5952 137.735 98.7002 137.475 98.9102 137.265C99.1202 137.055 99.3802 136.95 99.6902 136.95C99.9902 136.95 100.245 137.055 100.455 137.265C100.665 137.475 100.77 137.735 100.77 138.045C100.77 138.355 100.665 138.615 100.455 138.825C100.245 139.035 99.9902 139.14 99.6902 139.14ZM100.53 140.235V148.5H98.8202V140.235H100.53ZM106.845 140.1C107.495 140.1 108.075 140.235 108.585 140.505C109.105 140.775 109.51 141.175 109.8 141.705C110.09 142.235 110.235 142.875 110.235 143.625V148.5H108.54V143.88C108.54 143.14 108.355 142.575 107.985 142.185C107.615 141.785 107.11 141.585 106.47 141.585C105.83 141.585 105.32 141.785 104.94 142.185C104.57 142.575 104.385 143.14 104.385 143.88V148.5H102.675V140.235H104.385V141.18C104.665 140.84 105.02 140.575 105.45 140.385C105.89 140.195 106.355 140.1 106.845 140.1ZM115.646 140.1C116.286 140.1 116.851 140.23 117.341 140.49C117.841 140.74 118.231 141.055 118.511 141.435V140.235H120.236V148.635C120.236 149.395 120.076 150.07 119.756 150.66C119.436 151.26 118.971 151.73 118.361 152.07C117.761 152.41 117.041 152.58 116.201 152.58C115.081 152.58 114.151 152.315 113.411 151.785C112.671 151.265 112.251 150.555 112.151 149.655H113.846C113.976 150.085 114.251 150.43 114.671 150.69C115.101 150.96 115.611 151.095 116.201 151.095C116.891 151.095 117.446 150.885 117.866 150.465C118.296 150.045 118.511 149.435 118.511 148.635V147.255C118.221 147.645 117.826 147.975 117.326 148.245C116.836 148.505 116.276 148.635 115.646 148.635C114.926 148.635 114.266 148.455 113.666 148.095C113.076 147.725 112.606 147.215 112.256 146.565C111.916 145.905 111.746 145.16 111.746 144.33C111.746 143.5 111.916 142.765 112.256 142.125C112.606 141.485 113.076 140.99 113.666 140.64C114.266 140.28 114.926 140.1 115.646 140.1ZM118.511 144.36C118.511 143.79 118.391 143.295 118.151 142.875C117.921 142.455 117.616 142.135 117.236 141.915C116.856 141.695 116.446 141.585 116.006 141.585C115.566 141.585 115.156 141.695 114.776 141.915C114.396 142.125 114.086 142.44 113.846 142.86C113.616 143.27 113.501 143.76 113.501 144.33C113.501 144.9 113.616 145.4 113.846 145.83C114.086 146.26 114.396 146.59 114.776 146.82C115.166 147.04 115.576 147.15 116.006 147.15C116.446 147.15 116.856 147.04 117.236 146.82C117.616 146.6 117.921 146.28 118.151 145.86C118.391 145.43 118.511 144.93 118.511 144.36ZM134.234 148.5L132.944 147.21C132.444 147.71 131.899 148.085 131.309 148.335C130.719 148.575 130.059 148.695 129.329 148.695C128.589 148.695 127.934 148.565 127.364 148.305C126.794 148.045 126.354 147.675 126.044 147.195C125.734 146.705 125.579 146.14 125.579 145.5C125.579 144.78 125.784 144.14 126.194 143.58C126.604 143.01 127.214 142.56 128.024 142.23C127.734 141.88 127.529 141.555 127.409 141.255C127.289 140.945 127.229 140.605 127.229 140.235C127.229 139.775 127.344 139.365 127.574 139.005C127.814 138.645 128.154 138.36 128.594 138.15C129.034 137.94 129.544 137.835 130.124 137.835C130.714 137.835 131.214 137.95 131.624 138.18C132.044 138.4 132.354 138.705 132.554 139.095C132.764 139.485 132.849 139.92 132.809 140.4H131.099C131.109 140.03 131.019 139.745 130.829 139.545C130.639 139.335 130.379 139.23 130.049 139.23C129.719 139.23 129.449 139.33 129.239 139.53C129.039 139.72 128.939 139.955 128.939 140.235C128.939 140.505 129.014 140.775 129.164 141.045C129.324 141.305 129.599 141.645 129.989 142.065L132.749 144.81L133.814 143.055H135.659L134.309 145.365L133.934 145.98L136.469 148.5H134.234ZM129.329 147.24C130.269 147.24 131.099 146.855 131.819 146.085L129.059 143.31C127.879 143.78 127.289 144.49 127.289 145.44C127.289 145.95 127.479 146.38 127.859 146.73C128.239 147.07 128.729 147.24 129.329 147.24ZM144.287 148.635C143.637 148.635 143.052 148.52 142.532 148.29C142.022 148.05 141.617 147.73 141.317 147.33C141.017 146.92 140.857 146.465 140.837 145.965H142.607C142.637 146.315 142.802 146.61 143.102 146.85C143.412 147.08 143.797 147.195 144.257 147.195C144.737 147.195 145.107 147.105 145.367 146.925C145.637 146.735 145.772 146.495 145.772 146.205C145.772 145.895 145.622 145.665 145.322 145.515C145.032 145.365 144.567 145.2 143.927 145.02C143.307 144.85 142.802 144.685 142.412 144.525C142.022 144.365 141.682 144.12 141.392 143.79C141.112 143.46 140.972 143.025 140.972 142.485C140.972 142.045 141.102 141.645 141.362 141.285C141.622 140.915 141.992 140.625 142.472 140.415C142.962 140.205 143.522 140.1 144.152 140.1C145.092 140.1 145.847 140.34 146.417 140.82C146.997 141.29 147.307 141.935 147.347 142.755H145.637C145.607 142.385 145.457 142.09 145.187 141.87C144.917 141.65 144.552 141.54 144.092 141.54C143.642 141.54 143.297 141.625 143.057 141.795C142.817 141.965 142.697 142.19 142.697 142.47C142.697 142.69 142.777 142.875 142.937 143.025C143.097 143.175 143.292 143.295 143.522 143.385C143.752 143.465 144.092 143.57 144.542 143.7C145.142 143.86 145.632 144.025 146.012 144.195C146.402 144.355 146.737 144.595 147.017 144.915C147.297 145.235 147.442 145.66 147.452 146.19C147.452 146.66 147.322 147.08 147.062 147.45C146.802 147.82 146.432 148.11 145.952 148.32C145.482 148.53 144.927 148.635 144.287 148.635ZM148.629 144.33C148.629 143.5 148.799 142.765 149.139 142.125C149.489 141.485 149.959 140.99 150.549 140.64C151.149 140.28 151.809 140.1 152.529 140.1C153.179 140.1 153.744 140.23 154.224 140.49C154.714 140.74 155.104 141.055 155.394 141.435V140.235H157.119V148.5H155.394V147.27C155.104 147.66 154.709 147.985 154.209 148.245C153.709 148.505 153.139 148.635 152.499 148.635C151.789 148.635 151.139 148.455 150.549 148.095C149.959 147.725 149.489 147.215 149.139 146.565C148.799 145.905 148.629 145.16 148.629 144.33ZM155.394 144.36C155.394 143.79 155.274 143.295 155.034 142.875C154.804 142.455 154.499 142.135 154.119 141.915C153.739 141.695 153.329 141.585 152.889 141.585C152.449 141.585 152.039 141.695 151.659 141.915C151.279 142.125 150.969 142.44 150.729 142.86C150.499 143.27 150.384 143.76 150.384 144.33C150.384 144.9 150.499 145.4 150.729 145.83C150.969 146.26 151.279 146.59 151.659 146.82C152.049 147.04 152.459 147.15 152.889 147.15C153.329 147.15 153.739 147.04 154.119 146.82C154.499 146.6 154.804 146.28 155.034 145.86C155.274 145.43 155.394 144.93 155.394 144.36ZM160.975 137.4V148.5H159.265V137.4H160.975ZM170.695 144.165C170.695 144.475 170.675 144.755 170.635 145.005H164.32C164.37 145.665 164.615 146.195 165.055 146.595C165.495 146.995 166.035 147.195 166.675 147.195C167.595 147.195 168.245 146.81 168.625 146.04H170.47C170.22 146.8 169.765 147.425 169.105 147.915C168.455 148.395 167.645 148.635 166.675 148.635C165.885 148.635 165.175 148.46 164.545 148.11C163.925 147.75 163.435 147.25 163.075 146.61C162.725 145.96 162.55 145.21 162.55 144.36C162.55 143.51 162.72 142.765 163.06 142.125C163.41 141.475 163.895 140.975 164.515 140.625C165.145 140.275 165.865 140.1 166.675 140.1C167.455 140.1 168.15 140.27 168.76 140.61C169.37 140.95 169.845 141.43 170.185 142.05C170.525 142.66 170.695 143.365 170.695 144.165ZM168.91 143.625C168.9 142.995 168.675 142.49 168.235 142.11C167.795 141.73 167.25 141.54 166.6 141.54C166.01 141.54 165.505 141.73 165.085 142.11C164.665 142.48 164.415 142.985 164.335 143.625H168.91ZM175.278 148.635C174.628 148.635 174.043 148.52 173.523 148.29C173.013 148.05 172.608 147.73 172.308 147.33C172.008 146.92 171.848 146.465 171.828 145.965H173.598C173.628 146.315 173.793 146.61 174.093 146.85C174.403 147.08 174.788 147.195 175.248 147.195C175.728 147.195 176.098 147.105 176.358 146.925C176.628 146.735 176.763 146.495 176.763 146.205C176.763 145.895 176.613 145.665 176.313 145.515C176.023 145.365 175.558 145.2 174.918 145.02C174.298 144.85 173.793 144.685 173.403 144.525C173.013 144.365 172.673 144.12 172.383 143.79C172.103 143.46 171.963 143.025 171.963 142.485C171.963 142.045 172.093 141.645 172.353 141.285C172.613 140.915 172.983 140.625 173.463 140.415C173.953 140.205 174.513 140.1 175.143 140.1C176.083 140.1 176.838 140.34 177.408 140.82C177.988 141.29 178.298 141.935 178.338 142.755H176.628C176.598 142.385 176.448 142.09 176.178 141.87C175.908 141.65 175.543 141.54 175.083 141.54C174.633 141.54 174.288 141.625 174.048 141.795C173.808 141.965 173.688 142.19 173.688 142.47C173.688 142.69 173.768 142.875 173.928 143.025C174.088 143.175 174.283 143.295 174.513 143.385C174.743 143.465 175.083 143.57 175.533 143.7C176.133 143.86 176.623 144.025 177.003 144.195C177.393 144.355 177.728 144.595 178.008 144.915C178.288 145.235 178.433 145.66 178.443 146.19C178.443 146.66 178.313 147.08 178.053 147.45C177.793 147.82 177.423 148.11 176.943 148.32C176.473 148.53 175.918 148.635 175.278 148.635ZM183.417 144.33C183.417 143.5 183.587 142.765 183.927 142.125C184.277 141.485 184.747 140.99 185.337 140.64C185.937 140.28 186.597 140.1 187.317 140.1C187.967 140.1 188.532 140.23 189.012 140.49C189.502 140.74 189.892 141.055 190.182 141.435V140.235H191.907V148.5H190.182V147.27C189.892 147.66 189.497 147.985 188.997 148.245C188.497 148.505 187.927 148.635 187.287 148.635C186.577 148.635 185.927 148.455 185.337 148.095C184.747 147.725 184.277 147.215 183.927 146.565C183.587 145.905 183.417 145.16 183.417 144.33ZM190.182 144.36C190.182 143.79 190.062 143.295 189.822 142.875C189.592 142.455 189.287 142.135 188.907 141.915C188.527 141.695 188.117 141.585 187.677 141.585C187.237 141.585 186.827 141.695 186.447 141.915C186.067 142.125 185.757 142.44 185.517 142.86C185.287 143.27 185.172 143.76 185.172 144.33C185.172 144.9 185.287 145.4 185.517 145.83C185.757 146.26 186.067 146.59 186.447 146.82C186.837 147.04 187.247 147.15 187.677 147.15C188.117 147.15 188.527 147.04 188.907 146.82C189.287 146.6 189.592 146.28 189.822 145.86C190.062 145.43 190.182 144.93 190.182 144.36ZM197.053 148.635C196.403 148.635 195.818 148.52 195.298 148.29C194.788 148.05 194.383 147.73 194.083 147.33C193.783 146.92 193.623 146.465 193.603 145.965H195.373C195.403 146.315 195.568 146.61 195.868 146.85C196.178 147.08 196.563 147.195 197.023 147.195C197.503 147.195 197.873 147.105 198.133 146.925C198.403 146.735 198.538 146.495 198.538 146.205C198.538 145.895 198.388 145.665 198.088 145.515C197.798 145.365 197.333 145.2 196.693 145.02C196.073 144.85 195.568 144.685 195.178 144.525C194.788 144.365 194.448 144.12 194.158 143.79C193.878 143.46 193.738 143.025 193.738 142.485C193.738 142.045 193.868 141.645 194.128 141.285C194.388 140.915 194.758 140.625 195.238 140.415C195.728 140.205 196.288 140.1 196.918 140.1C197.858 140.1 198.613 140.34 199.183 140.82C199.763 141.29 200.073 141.935 200.113 142.755H198.403C198.373 142.385 198.223 142.09 197.953 141.87C197.683 141.65 197.318 141.54 196.858 141.54C196.408 141.54 196.063 141.625 195.823 141.795C195.583 141.965 195.463 142.19 195.463 142.47C195.463 142.69 195.543 142.875 195.703 143.025C195.863 143.175 196.058 143.295 196.288 143.385C196.518 143.465 196.858 143.57 197.308 143.7C197.908 143.86 198.398 144.025 198.778 144.195C199.168 144.355 199.503 144.595 199.783 144.915C200.063 145.235 200.208 145.66 200.218 146.19C200.218 146.66 200.088 147.08 199.828 147.45C199.568 147.82 199.198 148.11 198.718 148.32C198.248 148.53 197.693 148.635 197.053 148.635ZM204.966 148.635C204.316 148.635 203.731 148.52 203.211 148.29C202.701 148.05 202.296 147.73 201.996 147.33C201.696 146.92 201.536 146.465 201.516 145.965H203.286C203.316 146.315 203.481 146.61 203.781 146.85C204.091 147.08 204.476 147.195 204.936 147.195C205.416 147.195 205.786 147.105 206.046 146.925C206.316 146.735 206.451 146.495 206.451 146.205C206.451 145.895 206.301 145.665 206.001 145.515C205.711 145.365 205.246 145.2 204.606 145.02C203.986 144.85 203.481 144.685 203.091 144.525C202.701 144.365 202.361 144.12 202.071 143.79C201.791 143.46 201.651 143.025 201.651 142.485C201.651 142.045 201.781 141.645 202.041 141.285C202.301 140.915 202.671 140.625 203.151 140.415C203.641 140.205 204.201 140.1 204.831 140.1C205.771 140.1 206.526 140.34 207.096 140.82C207.676 141.29 207.986 141.935 208.026 142.755H206.316C206.286 142.385 206.136 142.09 205.866 141.87C205.596 141.65 205.231 141.54 204.771 141.54C204.321 141.54 203.976 141.625 203.736 141.795C203.496 141.965 203.376 142.19 203.376 142.47C203.376 142.69 203.456 142.875 203.616 143.025C203.776 143.175 203.971 143.295 204.201 143.385C204.431 143.465 204.771 143.57 205.221 143.7C205.821 143.86 206.311 144.025 206.691 144.195C207.081 144.355 207.416 144.595 207.696 144.915C207.976 145.235 208.121 145.66 208.131 146.19C208.131 146.66 208.001 147.08 207.741 147.45C207.481 147.82 207.111 148.11 206.631 148.32C206.161 148.53 205.606 148.635 204.966 148.635ZM210.749 139.14C210.439 139.14 210.179 139.035 209.969 138.825C209.759 138.615 209.654 138.355 209.654 138.045C209.654 137.735 209.759 137.475 209.969 137.265C210.179 137.055 210.439 136.95 210.749 136.95C211.049 136.95 211.304 137.055 211.514 137.265C211.724 137.475 211.829 137.735 211.829 138.045C211.829 138.355 211.724 138.615 211.514 138.825C211.304 139.035 211.049 139.14 210.749 139.14ZM211.589 140.235V148.5H209.879V140.235H211.589ZM216.734 148.635C216.084 148.635 215.499 148.52 214.979 148.29C214.469 148.05 214.064 147.73 213.764 147.33C213.464 146.92 213.304 146.465 213.284 145.965H215.054C215.084 146.315 215.249 146.61 215.549 146.85C215.859 147.08 216.244 147.195 216.704 147.195C217.184 147.195 217.554 147.105 217.814 146.925C218.084 146.735 218.219 146.495 218.219 146.205C218.219 145.895 218.069 145.665 217.769 145.515C217.479 145.365 217.014 145.2 216.374 145.02C215.754 144.85 215.249 144.685 214.859 144.525C214.469 144.365 214.129 144.12 213.839 143.79C213.559 143.46 213.419 143.025 213.419 142.485C213.419 142.045 213.549 141.645 213.809 141.285C214.069 140.915 214.439 140.625 214.919 140.415C215.409 140.205 215.969 140.1 216.599 140.1C217.539 140.1 218.294 140.34 218.864 140.82C219.444 141.29 219.754 141.935 219.794 142.755H218.084C218.054 142.385 217.904 142.09 217.634 141.87C217.364 141.65 216.999 141.54 216.539 141.54C216.089 141.54 215.744 141.625 215.504 141.795C215.264 141.965 215.144 142.19 215.144 142.47C215.144 142.69 215.224 142.875 215.384 143.025C215.544 143.175 215.739 143.295 215.969 143.385C216.199 143.465 216.539 143.57 216.989 143.7C217.589 143.86 218.079 144.025 218.459 144.195C218.849 144.355 219.184 144.595 219.464 144.915C219.744 145.235 219.889 145.66 219.899 146.19C219.899 146.66 219.769 147.08 219.509 147.45C219.249 147.82 218.879 148.11 218.399 148.32C217.929 148.53 217.374 148.635 216.734 148.635ZM223.642 141.63V146.205C223.642 146.515 223.712 146.74 223.852 146.88C224.002 147.01 224.252 147.075 224.602 147.075H225.652V148.5H224.302C223.532 148.5 222.942 148.32 222.532 147.96C222.122 147.6 221.917 147.015 221.917 146.205V141.63H220.942V140.235H221.917V138.18H223.642V140.235H225.652V141.63H223.642ZM226.558 144.33C226.558 143.5 226.728 142.765 227.068 142.125C227.418 141.485 227.888 140.99 228.478 140.64C229.078 140.28 229.738 140.1 230.458 140.1C231.108 140.1 231.673 140.23 232.153 140.49C232.643 140.74 233.033 141.055 233.323 141.435V140.235H235.048V148.5H233.323V147.27C233.033 147.66 232.638 147.985 232.138 148.245C231.638 148.505 231.068 148.635 230.428 148.635C229.718 148.635 229.068 148.455 228.478 148.095C227.888 147.725 227.418 147.215 227.068 146.565C226.728 145.905 226.558 145.16 226.558 144.33ZM233.323 144.36C233.323 143.79 233.203 143.295 232.963 142.875C232.733 142.455 232.428 142.135 232.048 141.915C231.668 141.695 231.258 141.585 230.818 141.585C230.378 141.585 229.968 141.695 229.588 141.915C229.208 142.125 228.898 142.44 228.658 142.86C228.428 143.27 228.313 143.76 228.313 144.33C228.313 144.9 228.428 145.4 228.658 145.83C228.898 146.26 229.208 146.59 229.588 146.82C229.978 147.04 230.388 147.15 230.818 147.15C231.258 147.15 231.668 147.04 232.048 146.82C232.428 146.6 232.733 146.28 232.963 145.86C233.203 145.43 233.323 144.93 233.323 144.36ZM241.364 140.1C242.014 140.1 242.594 140.235 243.104 140.505C243.624 140.775 244.029 141.175 244.319 141.705C244.609 142.235 244.754 142.875 244.754 143.625V148.5H243.059V143.88C243.059 143.14 242.874 142.575 242.504 142.185C242.134 141.785 241.629 141.585 240.989 141.585C240.349 141.585 239.839 141.785 239.459 142.185C239.089 142.575 238.904 143.14 238.904 143.88V148.5H237.194V140.235H238.904V141.18C239.184 140.84 239.539 140.575 239.969 140.385C240.409 140.195 240.874 140.1 241.364 140.1ZM248.83 141.63V146.205C248.83 146.515 248.9 146.74 249.04 146.88C249.19 147.01 249.44 147.075 249.79 147.075H250.84V148.5H249.49C248.72 148.5 248.13 148.32 247.72 147.96C247.31 147.6 247.105 147.015 247.105 146.205V141.63H246.13V140.235H247.105V138.18H248.83V140.235H250.84V141.63H248.83Z" fill="#10A1F3"/>
</g>
<path d="M305.648 117.963C306.295 116.94 305.528 115.612 304.319 115.661L283.487 116.518C282.36 116.564 281.686 117.79 282.25 118.766L291.924 135.523C292.488 136.499 293.887 136.528 294.49 135.576L305.648 117.963Z" fill="black"/>
<path d="M305.648 117.963C306.295 116.94 305.528 115.612 304.319 115.661L283.487 116.518C282.36 116.564 281.686 117.79 282.25 118.766L291.924 135.523C292.488 136.499 293.887 136.528 294.49 135.576L305.648 117.963Z" fill="#10A1F3"/>
<defs>
<filter id="filter0_dddddd_4401_12416" x="0.000244141" y="124" width="303.95" height="96" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_4401_12416"/>
<feOffset dy="30"/>
<feGaussianBlur stdDeviation="15"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4401_12416"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="3.33333" operator="erode" in="SourceAlpha" result="effect2_dropShadow_4401_12416"/>
<feOffset dy="13.6468"/>
<feGaussianBlur stdDeviation="6.8234"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_4401_12416" result="effect2_dropShadow_4401_12416"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="2.66667" operator="erode" in="SourceAlpha" result="effect3_dropShadow_4401_12416"/>
<feOffset dy="6.8656"/>
<feGaussianBlur stdDeviation="3.4328"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.067 0"/>
<feBlend mode="normal" in2="effect2_dropShadow_4401_12416" result="effect3_dropShadow_4401_12416"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect4_dropShadow_4401_12416"/>
<feOffset dy="3.62176"/>
<feGaussianBlur stdDeviation="1.81088"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0"/>
<feBlend mode="normal" in2="effect3_dropShadow_4401_12416" result="effect4_dropShadow_4401_12416"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1.33333" operator="erode" in="SourceAlpha" result="effect5_dropShadow_4401_12416"/>
<feOffset dy="1.80656"/>
<feGaussianBlur stdDeviation="0.90328"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0"/>
<feBlend mode="normal" in2="effect4_dropShadow_4401_12416" result="effect5_dropShadow_4401_12416"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="0.666667" operator="erode" in="SourceAlpha" result="effect6_dropShadow_4401_12416"/>
<feOffset dy="0.706592"/>
<feGaussianBlur stdDeviation="0.353296"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
<feBlend mode="normal" in2="effect5_dropShadow_4401_12416" result="effect6_dropShadow_4401_12416"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_4401_12416" result="shape"/>
</filter>
</defs>
</svg>

              <div className="absolute -top-[25%] -right-[15%] flex items-center justify-center" style={{ width: "1260px", height: "1260px" }}>
                <Circle size={1300} animation="animate-rotateClockwise" />
                <Circle size={1000} animation="animate-rotateCounterClockwise" />
                <div className="absolute flex items-center justify-center">
                  <Image src="/assets/dashboard-preview.png" alt="Center Image" width={700} height={700} />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

  

      <section  className="mb-32">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-[#00968914] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"> Our process </div>
          <h1 className="text-center text-[42px] leading-normal">
            <span className="bg-gradient-to-r from-black to-black/50 bg-clip-text font-bold text-transparent"> Effortlessly Create</span>
            <span className="bg-gradient-to-r from-black to-black/50 bg-clip-text font-extralight text-transparent"> AI Magicflow!</span>
          </h1>
          <p className="max-w-2xl leading-loose text-center">
          Build AI-driven workflows with ease. Automate tasks and collaborate seamlessly with our fun, no-code tool.          </p>
          <div className="bg-[#F9F9F9] p-5 rounded-[30px] mt-10 shadow-box">
            <Image src="/assets/ui-solutions-preview.png" alt="" width={1000} height={1000} />
          </div>
        </div>
      </section>

      <section className="mb-20 mt-10">
        <div className="flex flex-col items-center gap-4 bg-[#FAFBFC] py-20">
          <div className="bg-[#00968914] py-2 px-3.5 flex items-center gap-3 rounded-full text-sm font-semibold uppercase max-w-fit"> Powered by</div>
          <h1 className="text-center text-[42px] leading-normal">
            <span className="font-semibold">We are </span>
            model agnostic
          </h1>
         
          <div className="grid grid-cols-7 gap-4 w-full max-w-[1460px] mx-auto">
            <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 w-full flex justify-center items-center hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300 cursor-pointer">
              <Image src="/brands/openai.svg" alt="" width={50} height={50} className="max-h-16" />
            </div>
            <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 w-full flex justify-center items-center hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300 cursor-pointer">
              <Image src="/brands/gemini.svg" alt="" width={100} height={100} className="max-h-16" />
            </div>
            <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 w-full flex justify-center items-center hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300 cursor-pointer">
              <Image src="/brands/anthropic.svg" alt="" width={50} height={50} className="max-h-16" />
            </div>
            <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 w-full flex justify-center items-center hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300 cursor-pointer">
              <Image src="/donkey.png" alt="" width={350} height={170} className="w-full" />
            </div>
            <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 w-full flex justify-center items-center hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300 cursor-pointer">
              <Image src="/brands/knowprose.svg" alt="" width={50} height={50} className="max-h-16" />
            </div>
            <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 w-full flex justify-center items-center hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300 cursor-pointer">
              <Image src="/brands/mistral.svg" alt="" width={50} height={50} className="max-h-16" />
            </div>
            <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 w-full flex justify-center items-center hover:shadow-2xl hover:shadow-gray-300 transition-all duration-300 cursor-pointer">
              <Image src="/brands/ibm.svg" alt="" width={80} height={80} className="max-h-16" />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
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

          {featuresData.map((card, index) => (
            <div key={card.id} className={`sticky top-40`}>
              <div
                key={card.id}
                className={`relative mt-16 h-[820px] p-5 rounded-[40px] md:pt-10 md:pb-20 backdrop-blur-[300px] ${card.bgColor}`}
                style={{ top: `calc(-5vh + ${index * 25}px)` }}>
                <div className={`max-w-[1480px] mx-auto flex ${card.id % 2 === 0 ? "flex-row-reverse" : ""} gap-20 justify-between items-center`}>
                  <div className="space-y-5 w-full">
                    <h2>{card.number}</h2>
                    <h1 className="leading-relaxed text-[42px] max-w-md font-medium !mt-2">{card.title}</h1>
                    <p className="w-full max-w-lg leading-loose">{card.description}</p>
                    <ul className="space-y-4 !mt-7">
                      {card.listItems.map((item, index) => (
                        <li key={index} className="flex gap-x-2 items-center  font-semibold">
                          <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                      Learn more <ArrowRight />
                    </button>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <Image src={card.imageUrl} alt="" width={900} height={900} className="translate-y-[80px]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[url('/backgrounds/abstract-dots.png')] mb-20 bg-no-repeat bg-cover  pt-28">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-[#03473726]/15 py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#034737]">Complete Marketing Ecosystem</div>
          <h1 className="text-[42px] w-full leading-normal flex flex-col font-semibold  text-center">
          Streamline Your Marketing Workflow from<span className="font-light">Planning to Engagement with Growstack</span>
          </h1>
        </div>
        <Slider />
      </section>
 <section className="py-10 mb-20">
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
      </section>
      <section className="mb-20">
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
      </section>

      <section className="mb-20">
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
      </section>

        <Timeline />


      <section className="bg-primary-green w-[1242px] p-10 rounded-3xl mx-auto">
         <div className="flex flex-row items-center px-10">   
           <div className="w-full space-y-6 text-white">
                <h1 className="text-[38px] max-w-2xl leading-normal bg-gradient-to-b from-white  bg-clip-text ">
                  <span className="font-semibold">How to use Custom GPTs?                  </span>
                </h1>
             
                <div className="text-white 
                flex items-center gap-2   ">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z" fill="white"/>
</svg>
  Watch video
                </div>
              </div>
          <div className="w-full  flex justify-end ">
            <Image src="/video.png" alt="" width={363} height={161} />
          </div></div> 
      </section>

      <section className="py-10 flex flex-col gap-20 mt-20">
        <div className="flex flex-col items-center gap-7">
          <div className="bg-[#00968914] py-2 px-4 uppercase flex items-center gap-3 rounded-full text-xs font-semibold max-w-fit text-[#034737]"> FAQ</div>
          <h1 className="text-[42px] font-semibold text-primary-green">Quick answers <span className="font-light bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">on GrowStack</span> </h1>
        </div>
        <div className="bg-[url('/backgrounds/abstract-dots.png')] bg-no-repeat bg-cover bg-right-bottom w-full">
          <Faq />
        </div>
      </section>
    </main>
  );
}
