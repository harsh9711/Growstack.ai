import {
  AnthropicClaude,
  ChatGptIcon2,
  GoogleGemini,
  Llama,
  LogoIcon,
  Mistra,
  Perplexity,
} from "@/components/svgs";

export const aiModelOptions = [
  {
    modelCategory: "growStackAiMessagesModel",
    label: "GrowStack AI Messages Models",
    models: [
      {
        label: "GrowStack LLM",
        value: "growstack-llm",
        icon: <LogoIcon />,
      },
    ],
  },
  {
    modelCategory: "fastAiMessagesModel",
    label: "Fast AI Messages Models",
    models: [
      {
        label: "GPT 4o Mini",
        value: "gpt-4o-mini",
        icon: <ChatGptIcon2 />,
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
    ],
  },
  {
    modelCategory: "smartAiMessagesModel",
    label: "Smart AI Messages Models",
    models: [
      { label: "GPT 4o", value: "gpt-4o", icon: <ChatGptIcon2 /> },
      { label: "GPT 4", value: "gpt-4", icon: <ChatGptIcon2 /> },
      { label: "GPT 4 Turbo", value: "gpt-4-turbo", icon: <ChatGptIcon2 /> },
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
        label: "Perplexity",
        value: "perplexity",
        icon: <Perplexity />,
      },
    ],
  },
];

export const aiModelOptionsTemplate = [
  {
    modelCategory: "growStackAiMessagesModel",
    label: "GrowStack AI Messages Models",
    models: [
      {
        label: "GrowStack LLM",
        value: "growstack-llm",
        icon: <LogoIcon />,
      },
    ],
  },
  {
    modelCategory: "fastAiMessagesModel",
    label: "Fast AI Messages Models",
    models: [
      {
        label: "GPT 3.5 Turbo",
        value: "gpt-3.5-turbo",
        icon: <ChatGptIcon2 />,
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
    ],
  },
  {
    modelCategory: "smartAiMessagesModel",
    label: "Smart AI Messages Models",
    models: [
      // { label: "GPT 4o", value: "gpt-4o", icon: <ChatGptIcon2 /> },
      { label: "GPT 4", value: "gpt-4", icon: <ChatGptIcon2 /> },
      { label: "GPT 4 Turbo", value: "gpt-4-turbo", icon: <ChatGptIcon2 /> },
      // {
      //   label: "Claude 3 Opus",
      //   value: "claude-3-opus-20240229",
      //   icon: <AnthropicClaude />,
      // },
      {
        label: "Claude 3 Sonnet",
        value: "claude-3-sonnet-20240229",
        icon: <AnthropicClaude />,
      },
      {
        label: "Gemini 1.5 Pro",
        value: "gemini-1.5-pro",
        icon: <GoogleGemini />,
      },
    ],
  },
];

export const llmComparisonModels = [
  {
    modelCategory: "growStackAiMessagesModel",
    label: "GrowStack AI Messages Models",
    models: [
      {
        provider: "growStack",
        label: "GrowStack LLM",
        value: "growstack-llm",
        icon: <LogoIcon />,
      },
    ],
  },
  {
    modelCategory: "fastAiMessagesModel",
    label: "Fast AI Messages Models",
    models: [
      {
        provider: "openAi",
        label: "ChatGPT 3.5 Turbo",
        value: "gpt-3.5-turbo",
        icon: <ChatGptIcon2 />,
      },
      {
        provider: "openAi",
        label: "GPT 4o Mini",
        value: "gpt-4o-mini",
        icon: <ChatGptIcon2 />,
      },
      {
        provider: "anthropic",
        label: "Claude 3 Haiku",
        value: "claude-3-haiku-20240307",
        icon: <AnthropicClaude />,
      },
      {
        provider: "google",
        label: "Gemini 1.5 Flash",
        value: "gemini-1.5-flash",
        icon: <GoogleGemini />,
      },
      // {
      //   provider: "google",
      //   label: "Gemini 1.0 Pro",
      //   value: "gemini-1.0-pro",
      //   icon: <GoogleGemini />,
      // },
      {
        provider: "google",
        label: "Gemini 1.5 Flash Latest",
        value: "gemini-1.5-flash-latest",
        icon: <GoogleGemini />,
      },
    ],
  },
  {
    modelCategory: "smartAiMessagesModel",
    label: "Smart AI Messages Models",
    models: [
      {
        provider: "openAi",
        label: "GPT 4o",
        value: "gpt-4o",
        icon: <ChatGptIcon2 />,
      },
      {
        provider: "openAi",
        label: "GPT 4",
        value: "gpt-4",
        icon: <ChatGptIcon2 />,
      },
      {
        provider: "openAi",
        label: "GPT 4 Turbo",
        value: "gpt-4-turbo",
        icon: <ChatGptIcon2 />,
      },
      {
        provider: "anthropic",
        label: "Claude 3 Opus",
        value: "claude-3-opus-20240229",
        icon: <AnthropicClaude />,
      },
      {
        provider: "anthropic",
        label: "Claude 3.5 Sonnet",
        value: "claude-3-sonnet-20240229",
        icon: <AnthropicClaude />,
      },
      {
        provider: "google",
        label: "Gemini 1.5 Pro",
        value: "gemini-1.5-pro",
        icon: <GoogleGemini />,
      },
      {
        provider: "perplexity",
        label: "Llama 3.1 Sonar Large 128k Chat",
        value: "llama-3.1-sonar-large-128k-chat",
        icon: <Llama />,
      },
      {
        provider: "perplexity",
        label: "Llama 3.1 Sonar Small 128k Chat",
        value: "llama-3.1-sonar-small-128k-chat",
        icon: <Llama />,
      },
      {
        provider: "mistral",
        label: "Mistral Small Latest",
        value: "mistral-small-latest",
        icon: <Mistra />,
      },
      {
        provider: "mistral",
        label: "Mistral Large Latest",
        value: "mistral-large-latest",
        icon: <Mistra />,
      },
    ],
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
    label: "English (USA)",
    value: "english_usa",
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
  {
    label: "German",
    value: "german",
    icon: "",
  },
  {
    label: "Italian",
    value: "italian",
    icon: "",
  },
  {
    label: "Chinese (Simplified)",
    value: "chinese_simplified",
    icon: "",
  },
  {
    label: "Chinese (Traditional)",
    value: "chinese_traditional",
    icon: "",
  },
  {
    label: "Japanese",
    value: "japanese",
    icon: "",
  },
  {
    label: "Korean",
    value: "korean",
    icon: "",
  },
  {
    label: "Portuguese",
    value: "portuguese",
    icon: "",
  },
  {
    label: "Russian",
    value: "russian",
    icon: "",
  },
  {
    label: "Arabic",
    value: "arabic",
    icon: "",
  },
  {
    label: "Hindi",
    value: "hindi",
    icon: "",
  },
  {
    label: "Bengali",
    value: "bengali",
    icon: "",
  },
  {
    label: "Indonesian",
    value: "indonesian",
    icon: "",
  },
  {
    label: "Dutch",
    value: "dutch",
    icon: "",
  },
  {
    label: "Turkish",
    value: "turkish",
    icon: "",
  },
  {
    label: "Vietnamese",
    value: "vietnamese",
    icon: "",
  },
  {
    label: "Thai",
    value: "thai",
    icon: "",
  },
  {
    label: "Greek",
    value: "greek",
    icon: "",
  },
  {
    label: "Swedish",
    value: "swedish",
    icon: "",
  },
  {
    label: "Norwegian",
    value: "norwegian",
    icon: "",
  },
  {
    label: "Danish",
    value: "danish",
    icon: "",
  },
  {
    label: "Finnish",
    value: "finnish",
    icon: "",
  },
  {
    label: "Polish",
    value: "polish",
    icon: "",
  },
  {
    label: "Czech",
    value: "czech",
    icon: "",
  },
  {
    label: "Hungarian",
    value: "hungarian",
    icon: "",
  },
  {
    label: "Romanian",
    value: "romanian",
    icon: "",
  },
  {
    label: "Hebrew",
    value: "hebrew",
    icon: "",
  },
  {
    label: "Malay",
    value: "malay",
    icon: "",
  },
  {
    label: "Filipino",
    value: "filipino",
    icon: "",
  },
  {
    label: "Swahili",
    value: "swahili",
    icon: "",
  },
  {
    label: "Zulu",
    value: "zulu",
    icon: "",
  },
  {
    label: "Afrikaans",
    value: "afrikaans",
    icon: "",
  },
  {
    label: "Serbian",
    value: "serbian",
    icon: "",
  },
  {
    label: "Croatian",
    value: "croatian",
    icon: "",
  },
  {
    label: "Bulgarian",
    value: "bulgarian",
    icon: "",
  },
  {
    label: "Slovak",
    value: "slovak",
    icon: "",
  },
  {
    label: "Slovenian",
    value: "slovenian",
    icon: "",
  },
  {
    label: "Lithuanian",
    value: "lithuanian",
    icon: "",
  },
  {
    label: "Latvian",
    value: "latvian",
    icon: "",
  },
  {
    label: "Estonian",
    value: "estonian",
    icon: "",
  },
  {
    label: "Icelandic",
    value: "icelandic",
    icon: "",
  },
  {
    label: "Irish",
    value: "irish",
    icon: "",
  },
  {
    label: "Welsh",
    value: "welsh",
    icon: "",
  },
  {
    label: "Maltese",
    value: "maltese",
    icon: "",
  },
  {
    label: "Luxembourgish",
    value: "luxembourgish",
    icon: "",
  },
  {
    label: "Catalan",
    value: "catalan",
    icon: "",
  },
  {
    label: "Galician",
    value: "galician",
    icon: "",
  },
  {
    label: "Basque",
    value: "basque",
    icon: "",
  },
  {
    label: "Scottish Gaelic",
    value: "scottish_gaelic",
    icon: "",
  },
  {
    label: "Breton",
    value: "breton",
    icon: "",
  },
  {
    label: "Corsican",
    value: "corsican",
    icon: "",
  },
  {
    label: "Esperanto",
    value: "esperanto",
    icon: "",
  },
  {
    label: "Latin",
    value: "latin",
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
        label: "Llama 3.1 Sonar Large 128k Online",
        value: "llama-3.1-sonar-large-128k-chat",
        icon: <Llama />,
      },
      {
        label: "Llama 3.1 Sonar Small 128k Chat",
        value: "llama-3.1-sonar-small-128k-chat",
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
        label: "Open Mistral 8x22b",
        value: "open-mixtral-8x22b",
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
