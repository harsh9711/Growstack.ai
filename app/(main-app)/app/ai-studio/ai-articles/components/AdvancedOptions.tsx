import React from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import {
  aiModelOptions,
  creativityOptions,
  languageOptions,
  povOptions,
  writingToneOptions,
} from "../constants/options";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import toast from "react-hot-toast";

interface AdvancedOptionsProps {
  aiModel: string;
  setAiModel: React.Dispatch<React.SetStateAction<string>>;
  writingTone: string;
  setWritingTone: React.Dispatch<React.SetStateAction<string>>;
  creativity: string;
  setCreativity: React.Dispatch<React.SetStateAction<string>>;
  pov: string;
  setPov: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  aiModel,
  setAiModel,
  writingTone,
  setWritingTone,
  creativity,
  setCreativity,
  pov,
  setPov,
  language,
  setLanguage,
}) => {
  const { user, currentPlan } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const handleModalSelection = (value: string) => {
    if (!currentPlan) return;
    const currentCategory = aiModelOptions.find(category =>
      category.models.some(model => model.value === value)
    );

    const currentModal = currentCategory?.models.find(
      model => model.value === value
    );

    if (!currentCategory || !currentModal) {
      console.error("Model not found");
      return;
    }

    const freeCategories = ["growStackAiMessagesModel"];

    if (
      user?.user_type === "ADMIN" ||
      freeCategories.includes(currentCategory.modelCategory)
    ) {
      setAiModel(value);
      return;
    }

    let usageLimit = 0;

    if (currentCategory.modelCategory === "smartAiMessagesModel") {
      usageLimit = currentPlan.smart_ai_messages;
    } else if (currentCategory.modelCategory === "fastAiMessagesModel") {
      usageLimit = currentPlan.fast_ai_messages;
    }

    if (usageLimit <= 0) {
      toast.error(
        `You have no remaining usage for ${currentCategory.label}. Please switch to another model.`
      );
      return;
    }

    setAiModel(value);
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden mt-4"
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="font-medium" htmlFor="ai-model">
            AI model
          </label>
          <Select value={aiModel} onValueChange={handleModalSelection}>
            <SelectTrigger className="w-full h-14 border-0">
              <SelectValue placeholder="Select an option">
                {aiModel && (
                  <div className="flex items-center gap-2">
                    <span className="min-w-fit">
                      {
                        aiModelOptions
                          .flatMap(option => option.models)
                          .find(model => model.value === aiModel)?.icon
                      }
                    </span>
                    {aiModel}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {aiModelOptions.map(({ label: categoryLabel, models }) => (
                <SelectGroup key={categoryLabel}>
                  <React.Fragment key={categoryLabel}>
                    <div className="font-bold text-gray-500 px-4 py-2">
                      {categoryLabel}
                    </div>
                    {models.map(({ icon, label, value }) => (
                      <SelectItem key={value} value={value}>
                        <div
                          className={clsx(
                            "flex items-center gap-2",
                            aiModel === value &&
                              "text-primary-green font-medium"
                          )}
                        >
                          <span className="min-w-fit">{icon}</span>
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </React.Fragment>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="font-medium" htmlFor="writing-style">
            Writing Style
          </label>
          <Select value={writingTone} onValueChange={setWritingTone}>
            <SelectTrigger className="w-full h-14 border-0">
              <SelectValue placeholder="Select an option">
                {writingTone}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {writingToneOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        writingTone === value &&
                          "text-primary-green font-medium"
                      )}
                    >
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="font-medium" htmlFor="creativity">
            Creativity
          </label>
          <Select value={creativity} onValueChange={setCreativity}>
            <SelectTrigger className="w-full h-14 border-0">
              <SelectValue placeholder="Select an option">
                {creativity}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {creativityOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        creativity === value && "text-primary-green font-medium"
                      )}
                    >
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="font-medium" htmlFor="creativity">
            Point of View
          </label>
          <Select value={pov} onValueChange={setPov}>
            <SelectTrigger className="w-full h-14 border-0">
              <SelectValue placeholder="Select an option">{pov}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {povOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        pov === value && "text-primary-green font-medium"
                      )}
                    >
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="font-medium" htmlFor="article-length">
            Article length
          </label>
          <input
            type="text"
            id="article-length"
            placeholder="e.g. 1000"
            className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-medium" htmlFor="creativity">
            Language
          </label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full h-14 border-0">
              <SelectValue placeholder="Select an option">
                {language}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languageOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        language === value && "text-primary-green font-medium"
                      )}
                    >
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedOptions;
