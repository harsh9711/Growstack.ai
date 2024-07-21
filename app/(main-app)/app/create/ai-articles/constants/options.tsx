import { AnthropicClaude, ChatGptIcon2, GoogleGemini } from "@/components/svgs";

export const aiModelOptions = [
  // { label: "ChatGPT 3.5", value: "gpt-3.5", icon: <ChatGptIcon2 /> },
  {
    label: "ChatGPT 3.5 Turbo",
    value: "gpt-3.5-turbo",
    icon: <ChatGptIcon2 />,
  },
  { label: "GPT 4", value: "gpt-4", icon: <ChatGptIcon2 /> },
  // { label: "GPT 4 Turbo", value: "gpt-4-turbo", icon: <ChatGptIcon2 /> },
  { label: "GPT 4o", value: "gpt-4o", icon: <ChatGptIcon2 /> },
  {
    label: "Claude 3.5 Sonnet",
    value: "claude-3-5-sonnet-20240620",
    icon: <AnthropicClaude />,
  },
  {
    label: "Claude 3 Opus",
    value: "claude-3-opus-20240229",
    icon: <AnthropicClaude />,
  },
  {
    label: "Claude 3 Sonnet",
    value: "claude-3-sonnet-20240229",
    icon: <AnthropicClaude />,
  },
  {
    label: "Claude 3 Haiku",
    value: "claude-3-haiku-20240307",
    icon: <AnthropicClaude />,
  },
  {
    label: "Gemini 1.5 Flash",
    value: "gemini-1.5-flash",
    icon: <GoogleGemini />,
  },
  {
    label: "Gemini 1.5 Pro",
    value: "gemini-1.5-pro",
    icon: <GoogleGemini />,
  },
];

export const writingToneOptions = [
  {
    label: "Professional",
    value: "Professional",
  },
  {
    label: "Casual",
    value: "Casual",
  },
];
export const creativityOptions = [
  {
    label: "Original",
    value: "original",
  },
  {
    label: "Repetitive",
    value: "repetitive",
  },
  {
    label: "Deterministic",
    value: "deterministic",
  },
  {
    label: "Creative",
    value: "creative",
  },
  {
    label: "Imaginative",
    value: "imaginative",
  },
];
export const povOptions = [
  {
    label: "First Person",
    value: "First Person",
  },
  {
    label: "Second Person",
    value: "Second Person",
  },
  {
    label: "Third Person",
    value: "Third Person",
  },
];
export const languageOptions = [
  {
    label: "English",
    value: "english",
    icon: "",
  },
  {
    label: "Hindi",
    value: "hindi",
    icon: "",
  },
  {
    label: "Spanish",
    value: "spanish",
    icon: "",
  },
  {
    label: "French",
    value: "french",
    icon: "",
  },
];
