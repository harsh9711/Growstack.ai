import { ArrowBack } from "@/components/svgs";
import { ALL_ROUTES } from "@/utils/constant";
import Link from "next/link";

export default function Topbar({
  handleCreateConversation,
  isAPICalled,
  from,
  title,
}: {
  handleCreateConversation: () => void;
  isAPICalled: boolean;
  from: string;
  title?: string;
}) {
  return (
    <div className="px-8 pt-5 pb-3">
      <div className="flex justify-between">
        <div className="flex items-center ">
          <div>
            <p className="flex items-center gap-2 text-primary-black text-opacity-70">
              <Link href={ALL_ROUTES.AI_CUSTOM_GPT}>
                <button className="text-[#212833] hover:bg-[#2DA771]/10 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium items-center  transition-all duration-300">
                  <ArrowBack />
                  <h2 className="text-sm font-medium">
                    {from === "CREATE" ? "New GPT" : title}
                  </h2>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
