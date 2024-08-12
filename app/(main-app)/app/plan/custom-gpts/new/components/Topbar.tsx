import { ArrowBack } from "@/components/svgs";
import Spinner from "@/public/svgs/spinner";
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
              <Link href="/app/plan/custom-gpts">
                <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium items-center  transition-all duration-300">
                  <ArrowBack />
                  <h2 className="text-sm font-medium">{from === "CREATE" ? "New GPT" : title}</h2>
                </button>
              </Link>
            </p>
          </div>
        </div>
        {from === "CREATE" && (
          <div className="flex items-center gap-3">
            <button
              className={`inline-flex h-12 sheen items-center justify-center gap-2.5 rounded-xl border border-stroke bg-primary-green text-white px-8 py-3 text-base font-medium dark:border-dark-3 dark:text-white ${
                isAPICalled && "cursor-not-allowed"
              }`}
              disabled={isAPICalled}
              onClick={handleCreateConversation}>
              {isAPICalled && (
                <span>
                  <Spinner />
                </span>
              )}
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
