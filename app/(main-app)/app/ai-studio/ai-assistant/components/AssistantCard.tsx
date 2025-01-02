// import Image from "next/image";
// import Link from "next/link";
// import { Assistant } from "./types";

// export default function AssistantCard({ avatar, name, role, id }: Assistant) {
//   return (
//     <div className="bg-white border border-[#E8E8E8] rounded-3xl p-5">
//       <div className="group relative rounded-2xl overflow-hidden group shadow-box">
//         <Image
//           src={avatar || "/assets/avatar_placeholder.png"}
//           alt={name}
//           width={200}
//           height={200}
//           className="group-hover:scale-110 transition-all duration-300 min-h-[255px] w-full object-cover max-h-[255px]"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-[1] flex flex-col justify-end text-white p-4 gap-2">
//           <div>
//             <p className="text-center text-white font-bold text-opacity-80 text-sm">
//               {role}
//             </p>
//           </div>
//         </div>
//       </div>
//       <Link href={`/app/ai-studio/ai-assistant/chat/${id}`}>
//         <button className="border border-[#2DA771] bg-white text-[#2DA771] h-12 w-full rounded-xl mt-3 hover:bg-[#2DA771] hover:text-white transition-all duration-300">
//           Chat now
//         </button>
//       </Link>
//     </div>
//   );
// }
// import Image from "next/image";
// import Link from "next/link";
// import { Assistant } from "./types";

// export default function AssistantCard({ avatar, name, role, id }: Assistant) {
//   return (
//     <div className="bg-white border border-[#E8E8E8] rounded-3xl p-5">
//       <div className="group relative rounded-2xl overflow-hidden group shadow-box">
//         {/* Flip Effect Container */}
//         <div className="relative w-full h-[255px] group perspective-1000">
//           {/* Flip Card */}
//           <div className="w-full h-full transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-180">
//             {/* Front Side: Image */}
//             <div className="absolute inset-0 backface-hidden">
//               <Image
//                 src={avatar || "/assets/avatar_placeholder.png"}
//                 alt={name}
//                 width={200}
//                 height={200}
//                 className="group-hover:opacity-0 transition-opacity duration-300 min-h-[255px] w-full object-cover max-h-[255px]"
//               />
//             </div>

//             {/* Back Side: Content */}
//             <div className="absolute inset-0 backface-hidden flex justify-center items-center bg-black bg-opacity-50 text-white p-4 z-10 group-hover:bg-white group-hover:text-black transition-all duration-300">
//               <div className="text-center">
//                 {/* Assistant's Name */}
//                 <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">{name}</p>
//                 {/* Assistant's Role */}
//                 <p className="text-sm sm:text-base md:text-lg">{role}</p>
//                 {/* Sample Content - Short Bio or Description */}
//                 <div className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
//                   <p>"A highly skilled AI assistant, ready to help you with tasks and provide insights."</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-[1] flex flex-col justify-end text-white p-4 gap-2">
//           <div>
//             <p className="text-center text-white font-bold text-opacity-80 text-sm sm:text-base md:text-lg lg:text-xl">
//               {role}
//             </p>
//           </div>
//         </div>
//       </div>
//       <Link href={`/app/ai-studio/ai-assistant/chat/${id}`}>
//         <button className="border border-[#2DA771] bg-white text-[#2DA771] h-12 w-full rounded-xl mt-3 hover:bg-[#2DA771] hover:text-white transition-all duration-300">
//           Chat now
//         </button>
//       </Link>
//     </div>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import { Assistant } from "./types";

export default function AssistantCard({ avatar, name, role, id,summary }: Assistant) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-3xl p-5">
      <div className="relative rounded-2xl overflow-hidden group shadow-box">
        {/* Flip Effect Container */}
        <div className="relative w-full h-[255px] group perspective-1000">
          {/* Flip Card */}
          <div className="w-full h-full transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-180">
            {/* Front Side: Image */}
            <div className="absolute inset-0 backface-hidden">
              <Image
                src={avatar || "/assets/avatar_placeholder.png"}
                alt={name}
                width={200}
                height={200}
                className="min-h-[255px] w-full object-cover max-h-[255px]"
              />
            </div>

            {/* Back Side: Content */}
            <div className="absolute inset-0 backface-hidden flex justify-center items-center bg-black bg-opacity-50 text-white p-4 z-10 group-hover:bg-white group-hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100">
              <div className="text-center">
              <div className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
              <p
    className="overflow-hidden text-ellipsis"
    style={{
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 4,
      maxWidth: "100%",
    }}
  >
   {summary}
  </p>
</div>

              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-[1] flex flex-col justify-end text-white p-4 gap-2">
          <div>
            <p className="text-center text-white font-bold text-opacity-80 text-sm sm:text-base md:text-lg lg:text-xl">
              {role}
            </p>
          </div>
        </div>
      </div>
      <Link href={`/app/ai-studio/ai-assistant/chat/${id}`}>
        <button className="border border-[#2DA771] bg-white text-[#2DA771] h-12 w-full rounded-xl mt-3 hover:bg-[#2DA771] hover:text-white transition-all duration-300">
          Chat now
        </button>
      </Link>
    </div>
  );
}
