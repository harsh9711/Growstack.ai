import Image from "next/image";
import Link from "next/link";

export default function SchedulerPage() {
  return (
    <div className="w-full max-w-4xl bg-white px-10 py-14 rounded-3xl shadow-2xl shadow-gray-400">
      <h1 className="text-[28px] font-semibold">Connect a profile</h1>
      <p className="text-primary-black text-opacity-70 mt-3 leading-relaxed">Attach a profile to see how growstack can help grow your business.</p>
      <div className="w-full grid grid-cols-3 gap-4 mt-8">
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Facebook" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#217BEE] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/facebook-icon.svg" alt="" width={30} height={30} />
            Facebook
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Instagram" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#E4405F] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/instagram-icon.svg" alt="" width={30} height={30} />
            Instagram
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Linkedin" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#0A66C2] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/linkedin-icon.svg" alt="" width={30} height={30} />
            Linkedin
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "X Profile" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#070707] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/x-icon.svg" alt="" width={30} height={30} />X Profile
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Blogger" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#F06A35] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/blogger-icon.svg" alt="" width={30} height={30} />
            Blogger
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Pinterest" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#D7143A] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/pinterest-icon.svg" alt="" width={30} height={30} />
            Pinterest
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Google Business" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#4989F5] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/google-my-business-icon.svg" alt="" width={30} height={30} />
            Google business
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Blogger" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#314358] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/tumblr-icon.svg" alt="" width={30} height={30} />
            Blogger
          </div>
        </Link>
        <Link
          href={{
            pathname: "/app/publish/scheduler/quick-posting/profiles/connect-account",
            query: { profile: "Reddit" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#FF4500] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/reddit-icon.svg" alt="" width={40} height={40} />
            Reddit
          </div>
        </Link>
      </div>
    </div>
  );
}
