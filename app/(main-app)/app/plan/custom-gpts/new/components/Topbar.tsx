import { aiModelOptions } from '@/app/(main-app)/app/create/ai-articles/constants/options';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import clsx from 'clsx';
import { Download, Settings, Share2, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { downloadDocx, downloadPdf, downloadTxt } from './utils/downloadHelpers';
import Link from 'next/link';
import Spinner from '@/public/svgs/spinner';

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
  const [selectedAiModel, setSelectedAiModel] = useState(aiModelOptions[0].value);

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between">
        <div className="flex items-center ">
          <div>
            <p className="flex items-center gap-2 text-primary-black text-opacity-70">
              <Link href="/app/plan/custom-gpts">
                <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2 rounded-full font-medium items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25L24.125 16.25C24.125 13.9718 22.2782 12.125 20 12.125L20 10.375ZM25.875 16.25C25.875 19.4947 23.2447 22.125 20 22.125L20 20.375C22.2782 20.375 24.125 18.5282 24.125 16.25L25.875 16.25ZM20 22.125L18.75 22.125L18.75 20.375L20 20.375L20 22.125Z"
                      fill="#212833"
                    />
                  </svg>
                  <h2 className="text-sm font-medium">{from === 'CREATE' ? 'New GPT' : title}</h2>
                </button>
              </Link>
            </p>
          </div>
        </div>
        {from === 'CREATE' && (
          <div className="flex items-center gap-3">
            <button
              className={`inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border border-stroke bg-primary-green text-white px-6 py-3 text-base font-medium dark:border-dark-3 dark:text-white ${isAPICalled && 'cursor-not-allowed'}`}
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
    </div>
  );
}
