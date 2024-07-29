import {
  AnthropicClaude,
  ChatGptIcon2,
  GoogleGemini,
  Llama,
  Mistra,
} from "@/components/svgs";

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

export const modelData = [
  {
    provider: "openAi",
    models: [
      {
        label: "ChatGPT 3.5 Turbo",
        value: "gpt-3.5-turbo",
        icon: <ChatGptIcon2 />,
      },
      {
        label: "GPT 4",
        value: "gpt-4",
        icon: <ChatGptIcon2 />,
      },
      {
        label: "GPT 4o",
        value: "gpt-4o",
        icon: <ChatGptIcon2 />,
      },
      {
        label: "GPT 4o Mini",
        value: "gpt-4o-mini",
        icon: <ChatGptIcon2 />,
      },
      {
        label: "GPT 4 Turbo",
        value: "gpt-4-turbo",
        icon: <ChatGptIcon2 />,
      },
    ],
  },
  {
    provider: "google",
    models: [
      {
        label: "Gemini 1.5 Pro",
        value: "models/gemini-1.5-pro",
        icon: <GoogleGemini />,
      },
      {
        label: "Gemini 1.5 Flash",
        value: "models/gemini-1.5-flash",
        icon: <GoogleGemini />,
      },
      {
        label: "Gemini 1.5 Flash Pro",
        value: "models/gemini-1.5-pro-latest",
        icon: <GoogleGemini />,
      },
      {
        label: "Gemini 1.5 Flash Latest",
        value: "models/gemini-1.5-flash-latest",
        icon: <GoogleGemini />,
      },
    ],
  },
  {
    provider: "anthropic",
    models: [
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
    ],
  },
  {
    provider: "perplexity",
    models: [
      {
        label: "Llama 3 Sonar Small 32k Online",
        value: "llama-3-sonar-small-32k-online",
        icon: <Llama />,
      },
      {
        label: "Llama 3 Sonar Small 32k Chat",
        value: "llama-3-sonar-small-32k-chat",
        icon: <Llama />,
      },
      {
        label: "Llama 3 Sonar Large 32k Online",
        value: "llama-3-sonar-large-32k-online",
        icon: <Llama />,
      },
      {
        label: "Llama 3 Sonar Large 32k Chat",
        value: "llama-3-sonar-large-32k-chat",
        icon: <Llama />,
      },
    ],
  },
  {
    provider: "mistral",
    models: [
      {
        label: "Mistral Large Latest",
        value: "mistral-large-latest",
        icon: <Mistra />,
      },
      {
        label: "Mistral Medium Latest",
        value: "mistral-medium-latest",
        icon: <Mistra />,
      },
      {
        label: "Mistral Small Latest",
        value: "mistral-small-latest",
        icon: <Mistra />,
      },
      {
        label: "Open Mistral Nemo",
        value: "open-mistral-nemo",
        icon: <Mistra />,
      },
      {
        label: "Open Mixtral 8x22b",
        value: "open-mixtral-8x22b",
        icon: <Mistra />,
      },
      {
        label: "Open Mixtral 8x7b",
        value: "open-mixtral-8x7b",
        icon: <Mistra />,
      },
      {
        label: "Open Mistral 7b",
        value: "open-mistral-7b",
        icon: <Mistra />,
      },
    ],
  },
];
