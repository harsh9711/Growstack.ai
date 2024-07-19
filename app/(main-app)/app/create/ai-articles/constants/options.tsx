
import { AnthropicClaude, ChatGptIcon2, GoogleGemini } from "@/components/svgs";

export const aiModelOptions = [
  { label: "ChatGPT 3.5", value: "gpt-3.5", icon: <ChatGptIcon2 /> },
  { label: "ChatGPT 3.5 Turbo", value: "gpt-3.5-turbo", icon: <ChatGptIcon2 /> },
  { label: "GPT 4", value: "gpt-4", icon: <ChatGptIcon2 /> },
  { label: "GPT 4 Turbo", value: "gpt-4-turbo", icon: <ChatGptIcon2 /> },
  { label: "GPT 4o", value: "gpt-4o", icon: <ChatGptIcon2 /> },
  { label: "Claude 2", value: "claude-2", icon: <AnthropicClaude /> },
  { label: "Claude 3 Haiku", value: "claude-3-haiku", icon: <AnthropicClaude /> },
  { label: "Claude 3 Opus", value: "claude-3-opus", icon: <AnthropicClaude /> },
  { label: "Claude 3 Sonnet", value: "claude-3-sonnet", icon: <AnthropicClaude /> },
  { label: "Claude 3.5 Sonnet", value: "claude-3.5-sonnet", icon: <AnthropicClaude /> },
  { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash", icon: <GoogleGemini /> },
  { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro", icon: <GoogleGemini /> },
  { label: "LLaMA 2 13B Chat", value: "llama-2-13b-chat", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 2 70B Chat", value: "llama-2-70b-chat", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 2 7B Chat", value: "llama-2-7b-chat", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 3 70B Instruct", value: "llama-3-70b-instruct", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 3 70B Instruct Groq", value: "llama-3-70b-instruct-groq", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 3 8B Instruct", value: "llama-3-8b-instruct", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 3 8B Instruct Groq", value: "llama-3-8b-instruct-groq", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 3 Sonar Large 32K Chat", value: "llama-3-sonar-large-32k-chat", icon: <ChatGptIcon2 /> },
  { label: "LLaMA 3 Sonar Small 32K Chat", value: "llama-3-sonar-small-32k-chat", icon: <ChatGptIcon2 /> },
  { label: "Mistral 7B Instruct 4K", value: "mistral-7b-instruct-4k", icon: <ChatGptIcon2 /> },
  { label: "Mistral Codestral", value: "mistral-codestral", icon: <ChatGptIcon2 /> },
  { label: "Mistral Large", value: "mistral-large", icon: <ChatGptIcon2 /> },
  { label: "Mistral Medium", value: "mistral-medium", icon: <ChatGptIcon2 /> },
  { label: "Mistral Small", value: "mistral-small", icon: <ChatGptIcon2 /> },
  { label: "Mistral 8x22B Instruct", value: "mistral-8x22b-instruct", icon: <ChatGptIcon2 /> },
  { label: "Mistral 8x7B", value: "mistral-8x7b", icon: <ChatGptIcon2 /> },
  { label: "Mistral 8x7B Groq", value: "mistral-8x7b-groq", icon: <ChatGptIcon2 /> },
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