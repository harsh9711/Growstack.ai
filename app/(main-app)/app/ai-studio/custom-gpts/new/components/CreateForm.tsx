import { ArrowBack } from "@/components/svgs";
import Spinner from "@/public/svgs/spinner";
import Link from "next/link";

export default function CreateForm({
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
    <div>
      {from === "CREATE" && (
        <div className="flex items-center">
          <button
            className={`inline-flex h-12 sheen items-center justify-center gap-2.5 rounded-xl border border-stroke bg-primary-green text-white px-12 py-3 text-base font-medium dark:border-dark-3 dark:text-white ${
              isAPICalled && "cursor-not-allowed"
            }`}
            disabled={isAPICalled}
            onClick={handleCreateConversation}
          >
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
  );
}
