import { AllDataState } from "@/types/workflows";

export const dummyData1 = [
  {
    title: "General",
    category: "general",
    icon: {
      src: "/images/workflow/general.svg",
      alt: "general",
      width: 25,
      height: 24,
    },
    color: {
      bg: "#FFE6FF",
      content: "#F985F9",
      boxShadow: "0px 11.249px 21.092px 0px rgba(249, 133, 249, 0.25)",
    },
  },
  {
    title: "Integrations",
    category: "integrations",
    icon: {
      src: "/images/workflow/integration.svg",
      alt: "Integrations",
      width: 28,
      height: 28,
    },
    color: {
      bg: "#FCE1E4",
      content: "#FB8491",
      boxShadow: "0px 9.642px 18.079px 0px rgba(236, 176, 205, 0.25)",
    },
  },
  {
    title: "Tools",
    category: "tools",
    icon: {
      src: "/images/workflow/tools.svg",
      alt: "Integrations",
      width: 24,
      height: 24,
    },
    color: {
      bg: "#FCF4DD",
      content: "#F1B917",
      boxShadow: "0px 9.642px 18.079px 0px rgba(241, 185, 22, 0.25)",
    },
  },
  {
    title: "LLMs",
    category: "llms",
    icon: {
      src: "/images/workflow/llms.svg",
      alt: "Integrations",
      width: 24,
      height: 24,
    },
    color: {
      bg: "#DAEAF6",
      content: "#69BFFF",
      boxShadow: "0px 9.642px 18.079px 0px rgba(105, 191, 255, 0.25)",
    },
  },
];

export const dummyData2 = [
  {
    src: "/images/workflow/file.svg",
    alt: "Save",
    width: 24,
    height: 24,
  },
  {
    src: "/images/workflow/trash.svg",
    alt: "trash",
    width: 24,
    height: 24,
  },
  {
    src: "/images/workflow/share.svg",
    alt: "share",
    width: 24,
    height: 24,
  },
  {
    src: "/images/workflow/player.svg",
    alt: "play",
    width: 24,
    height: 24,
  },
];

export const dummyData3 = [
  {
    width: 24,
    height: 24,
    text: "Build",
  },
  {
    text: "Run",
    width: 24,
    height: 24,
  },
  {
    text: "Timeline",
    width: 24,
    height: 24,
  },
];

export const assistantHeader = [
  {
    id: 1,
    label: "Education",
    image: {
      src: "/images/workflow/education.svg",
      alt: "Growstack LLM",
      width: 22,
      height: 20,
    },
  },
  {
    id: 2,
    label: "Marketing",
    image: {
      src: "/images/workflow/marketing.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 3,
    label: "Sales",
    image: {
      src: "/images/workflow/sales.svg",
      alt: "Growstack LLM",
      width: 17,
      height: 20,
    },
  },
  {
    id: 4,
    label: "Tech",
    image: {
      src: "/images/workflow/tech.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 5,
    label: "Analytics",
    image: {
      src: "/images/workflow/analytics.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 18,
    },
  },
  {
    id: 6,
    label: "Research & Strategy",
    image: {
      src: "/images/workflow/research.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 7,
    label: "Regular use",
    image: {
      src: "/images/workflow/regular.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 8,
    label: "Customer Success",
    image: {
      src: "/images/workflow/customerSuccess.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 9,
    label: "Finance",
    image: {
      src: "/images/workflow/finance.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 10,
    label: "fun",
    image: {
      src: "/images/workflow/fun.svg",
      alt: "Growstack LLM",
      width: 18,
      height: 20,
    },
  },
];

export const templatesHeader = [
  {
    id: 1,
    label: "Articles and contents",
    image: {
      src: "/images/workflow/Articles.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 2,
    label: "Blog posts",
    image: {
      src: "/images/workflow/blogpost.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 3,
    label: "Emails",
    image: {
      src: "/images/workflow/emails.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 18,
    },
  },
  {
    id: 4,
    label: "Ecommerce",
    image: {
      src: "/images/workflow/cart.svg",
      alt: "Growstack LLM",
      width: 17,
      height: 20,
    },
  },
  {
    id: 5,
    label: "Frameworks",
    image: {
      src: "/images/workflow/framework.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 6,
    label: "Marketing",
    image: {
      src: "/images/workflow/marketing1.svg",
      alt: "Growstack LLM",
      width: 24,
      height: 20,
    },
  },
  {
    id: 7,
    label: "Social media",
    image: {
      src: "/images/workflow/socailMedia.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
  {
    id: 8,
    label: "Websites",
    image: {
      src: "/images/workflow/website.svg",
      alt: "Growstack LLM",
      width: 20,
      height: 20,
    },
  },
];

export const AllData: AllDataState[] = [
  {
    id: 1,
    thirdparty: "",
    category: "llms",
    description: "",
    name: "Growstack llm",
    subCategory: "Growstack ai model",
    image: {
      src: "/images/workflow/growtackllm.svg",
      alt: "Growstack LLM",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },
  {
    id: 1,
    thirdparty: "",
    category: "llms",
    description: "",
    name: "Open AI",
    subCategory: "Fast ai model",
    image: {
      src: "/svgs/openai.svg",
      alt: "Growstack LLM",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "open-ai",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 3,
    name: "Anthropic",
    category: "llms",
    thirdparty: "",
    description: "",
    subCategory: "Fast ai model",
    image: {
      src: "/images/workflow/claude.svg",
      alt: "Claude 3 Haiku",
      width: 49,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "anthropic",
      position: { x: 0, y: 0 },
      data: {
        label: "Claude 3 Haiku",
        image: {
          src: "/images/workflow/claude.svg",
          alt: "Claude 3 Haiku",
          width: 49,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },
  {
    id: 4,
    name: "Gemini 1.5 flash",
    category: "llms",
    image: {
      src: "/images/workflow/gemini.svg",
      alt: "Gemini 1.5 Flash",
      width: 96,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "gemini",
      position: { x: 0, y: 0 },
      data: {
        label: "Gemini 1.5 flash",
        image: {
          src: "/images/workflow/gemini.svg",
          alt: "Gemini 1.5 Flash",
          width: 96,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Fast ai model",
  },
  {
    id: 5,
    name: "GPT-40",
    category: "llms",
    image: {
      src: "/images/workflow/chatgpt.svg",
      alt: "GPT-40",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "GPT-40",
        image: {
          src: "/images/workflow/chatgpt.svg",
          alt: "GPT-40",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },
  {
    id: 6,
    name: "GPT-4",
    category: "llms",
    image: {
      src: "/images/workflow/chatgpt.svg",
      alt: "GPT-4",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "GPT-4",
        image: {
          src: "/images/workflow/chatgpt.svg",
          alt: "GPT-4",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },
  {
    id: 7,
    name: "GPT 4 Turbo",
    category: "llms",
    image: {
      src: "/images/workflow/chatgpt.svg",
      alt: "GPT 4 Turbo",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "GPT 4 Turbo",
        image: {
          src: "/images/workflow/chatgpt.svg",
          alt: "GPT 4 Turbo",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },
  {
    id: 8,
    name: "Claude 3 Opus",
    category: "llms",
    image: {
      src: "/images/workflow/claude.svg",
      alt: "Claude 3 Opus",
      width: 49,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "Claude 3 Opus",
        image: {
          src: "/images/workflow/claude.svg",
          alt: "Claude 3 Opus",
          width: 49,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },
  {
    id: 9,
    name: "Claude 3 sonnet",
    category: "llms",
    image: {
      src: "/images/workflow/claude.svg",
      alt: "Claude 3 Sonnet",
      width: 49,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "Claude 3 sonnet",
        image: {
          src: "/images/workflow/claude.svg",
          alt: "Claude 3 Sonnet",
          width: 49,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },
  {
    id: 10,
    name: "Perplexity",
    category: "llms",
    image: {
      src: "/images/workflow/perplexity.svg",
      alt: "Perplexity",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "perplexity",
      position: { x: 0, y: 0 },
      data: {
        label: "perplexity",
        image: {
          src: "/images/workflow/perplexity.svg",
          alt: "Perplexity",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },

  {
    id: 100,
    name: "Mistral",
    category: "llms",
    image: {
      src: "/svgs/mistral.svg",
      alt: "mistral",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "mistral",
      position: { x: 0, y: 0 },
      data: {
        label: "perplexity",
        image: {
          src: "/images/workflow/perplexity.svg",
          alt: "Perplexity",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },
  {
    id: 110,
    name: "Generate Image",
    category: "llms",
    image: {
      src: "/svgs/generate-image.svg",
      alt: "Generate Image",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "generate-image",
      position: { x: 0, y: 0 },
      data: {
        label: "perplexity",
        image: {
          src: "/images/workflow/perplexity.svg",
          alt: "Perplexity",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },

  {
    id: 120,
    name: "Read Image",
    category: "llms",
    image: {
      src: "/svgs/read-image.svg",
      alt: "Read Image",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "read-image",
      position: { x: 0, y: 0 },
      data: {
        label: "perplexity",
        image: {
          src: "/images/workflow/perplexity.svg",
          alt: "Perplexity",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Smart ai model",
  },

  {
    id: 11,
    name: "Short Text",
    category: "general",
    image: {
      src: "/svgs/short_text.svg",
      alt: "Short Text",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "short-text",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "SHORT_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Input type",
  },
  {
    id: 12,
    name: "Long Text",
    category: "general",
    image: {
      src: "/svgs/long-text.svg",
      alt: "Long Text",
      width: 26,
      height: 17,
    },
    node: {
      id: Date.now().toString(),
      type: "long-text",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "LONG_TEXT",
            variable_label: "message",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Input type",
  },
  {
    id: 12,
    name: "Boolean",
    category: "general",
    image: {
      src: "/svgs/switch.svg",
      alt: "Boolean",
      width: 28,
      height: 17,
    },
    node: {
      id: Date.now().toString(),
      type: "boolean",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "BOOLEAN",
            variable_label: "value",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Input type",
  },
  {
    id: 13,
    name: "Number",
    category: "general",
    image: {
      src: "/svgs/number-hashtag.svg",
      alt: "Number",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "number",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "NUMBER",
            variable_label: "value",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Input type",
  },
  {
    id: 14,
    name: "File Upload",
    category: "general",
    image: {
      src: "/svgs/file-upload.svg",
      alt: "File Upload",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "file-upload",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "FILE_UPLOAD",
            variable_label: "file",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Input type",
  },

  {
    id: 155,
    name: "Checklist",
    category: "general",
    image: {
      src: "/svgs/circle-checklist.svg",
      alt: "Checklist",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "checklist",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "CHECKLIST",
            variable_label: "text",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Input type",
  },

  {
    id: 16,
    name: "Plain Text",
    category: "general",
    image: {
      src: "/svgs/short_text.svg",
      alt: "Plain Text",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "PLAIN_TEXT",
            variable_label: "text",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Output type",
  },
  {
    id: 16,
    name: "Markdown",
    category: "general",
    image: {
      src: "/svgs/long-text.svg",
      alt: "Markdown",
      width: 26,
      height: 17,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/images/workflow/growtackllm.svg",
          alt: "Growstack LLM",
          width: 26,
          height: 17,
        },
        inputs: [
          {
            variable_type: "MARKDOWN",
            variable_label: "text",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Output type",
  },
  {
    id: 17,
    name: "Image",
    category: "general",
    image: {
      src: "/svgs/image.svg",
      alt: "Image",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/image.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "IMAGE",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Output type",
  },
  {
    id: 18,
    name: "Audio",
    category: "general",
    image: {
      src: "/svgs/audio.svg",
      alt: "Audio",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/audio.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "AUDIO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Output type",
  },
  {
    id: 19,
    name: "Video",
    category: "general",
    image: {
      src: "/svgs/text-to-video.svg",
      alt: "Video",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    description: "",
    subCategory: "Output type",
  },
  {
    id: 20,
    description:
      "Summarize any text in a short and easy to understand concise way",
    name: "Summarize text",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_1.svg",
      alt: "Summarize text",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 21,
    description: "Write the description about your product and why it worth it",
    name: "Product description",
    category: "ai-templates",
    // icon: "/svgs/workflow_actions/icon_2.svg",
    image: {
      src: "/svgs/workflow_actions/icon_2.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 22,
    description:
      "Generate cool, creative, and catchy names for your startup in seconds",
    name: "Startup name generator",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_3.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 23,
    description:
      "Take a piece of content and rewrite it to make it more interesting, creative, and engaging",
    name: "Content rewriter",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_4.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 24,
    description:
      "Write short, simple and informative points for the subheadings of your article",
    name: "Talking points",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_5.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 25,
    description:
      "Allow AI to generate creative stories for you based on input text",
    name: "Creative stories",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_6.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 26,
    description:
      "Make sure that there are no errors in your product component and article",
    name: "Grammar checker",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_7.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 27,
    description:
      "Nobody wants to read boring blog titles, generate catchy blog titles with this tool",
    name: "Blog Titles",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_8.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 28,
    description:
      "The perfect tool to start writing great articles. Generate creative ideas for your next post",
    name: "Blog Ideas",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_9.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 29,
    description: "Create welcome emails for your customers",
    name: "Welcome Email",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_10.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 30,
    description: "Create a creative clickbait titles for your products",
    name: "Clickbait titles",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_11.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 31,
    description: "Write a company press release with the help of AI",
    name: "Company press release",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_12.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 32,
    description: "Write a brand or product press release with the help of AI",
    name: "Brand/product press release",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_13.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 33,
    description: "Generate unique brand names with the help of AI",
    name: "Brand names",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_14.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 34,
    description: "Write an attention grabbing ad headlines",
    name: "Ad Headlines",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_15.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 35,
    description: "Create professional cold emails with the help of AI",
    name: "Cold Email",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_16.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 36,
    description: "Create professional email follow up with just few clicks",
    name: "Follow-Up Email",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_17.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 37,
    description: "Create professional email subject lines",
    name: "Email Subject Lines",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_18.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 38,
    description:
      "Generate one of most effective copywriting formula for your business",
    name: "Problem-Agitate-Solution (PAS) Framework",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_19.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 39,
    description:
      "AIDA model will help you ensure that any kind of writing, is as effective as possible",
    name: "Attention-Interest-Desire-Action (AIDA) Framework",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_20.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 40,
    description:
      "Generate paragraphs about any topic including a keyword and in a specific tone of voice",
    name: "Paragraph generator",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_21.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 41,
    description:
      "Write the pros and cons of a product, service or website for your blog article",
    name: "Pros & Cons",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_22.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 42,
    description: "Develop a privacy policy information for your organization",
    name: "Privacy policy",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_23.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 43,
    description:
      "Develop a terms and conditions information for your organization",
    name: "Terms and conditions",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_24.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 44,
    description: "Use a dictionary to find all details of your word",
    name: "Dictionary",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_25.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 45,
    description:
      "Write a full blog section (few paragraphs) about a subheading of your article",
    name: "Blog section",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_26.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 46,
    description:
      "Write an intro that will entice your visitors to read more about your article",
    name: "Blog intros",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_27.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 47,
    description: "End your blog articles with an engaging conclusion paragraph",
    name: "Blog conclusion",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_28.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 48,
    description:
      "Create a comprehensive comparison of two products between each other",
    name: "Product Comparisons",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_29.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 49,
    description: "Create attention grabbing amazon product description",
    name: "Amazon Product Description",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_30.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 50,
    description: "List out product benefits via help of AI solution",
    name: "Product benefits",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_31.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 51,
    description: "Find out selling product titles for your product description",
    name: "Selling product titles",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_32.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 52,
    description: "Write a full product characteristics",
    name: "Product Characteristics",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_33.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 53,
    description:
      "Advantages and features of your products that will make them irresistible for shoppers",
    name: "Amazon product features",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_34.svg",
      alt: "Product description",
      width: 24,
      height: 24,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },
  {
    id: 54,
    description:
      "Conversion-oriented formula designed to make a particular offer more appealing",
    name: "Before–after–bridge (BAB) framework",
    category: "ai-templates",
    image: {
      src: "/svgs/workflow_actions/icon_35.svg",
      alt: "Product description",
      width: 35,
      height: 35,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        image: {
          src: "/svgs/text-to-video.svg",
          alt: "Growstack LLM",
          width: 35,
          height: 35,
        },
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
    thirdparty: "",
    subCategory: "",
  },

  {
    id: 55,
    name: "Salesforce",
    category: "integrations",
    subCategory: "CRM",
    image: {
      src: "/images/workflow/Salesforce.png",
      alt: "Salesforce",
      width: 52,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },
  {
    id: 56,
    name: "HubSpot",
    category: "integrations",
    subCategory: "CRM",
    image: {
      src: "/images/workflow/HubSpot.png",
      alt: "HubSpot",
      width: 52,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },
  {
    id: 57,
    name: "Keap",
    category: "integrations",
    subCategory: "CRM",
    image: {
      src: "/images/workflow/Keap.png",
      alt: "Keap",
      width: 52,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },
  {
    id: 58,
    name: "Dynamics 365 Sales",
    category: "integrations",
    subCategory: "CRM",
    image: {
      src: "/images/workflow/Dynamics.png",
      alt: "Dynamics",
      width: 52,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 58,
    name: "Zoho CRMs",
    category: "integrations",
    subCategory: "CRM",
    image: {
      src: "/images/workflow/zohocrm.png",
      alt: "zohocrm",
      width: 52,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 59,
    name: "Outreach",
    category: "integrations",
    subCategory: "Sales",
    image: {
      src: "/images/workflow/Outreach.png",
      alt: "Outreach",
      width: 52,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 59,
    name: "Active Campaign",
    category: "integrations",
    subCategory: "Marketing Automation",
    image: {
      src: "/images/workflow/ActiveCampaign.png",
      alt: "Active Campaign",
      width: 52,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 60,
    name: "Google Search Console",
    category: "integrations",
    subCategory: "Analytics",
    image: {
      src: "/images/workflow/google.png",
      alt: "google",
      width: 40,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 61,
    name: "Google Campaign Manager 360",
    category: "integrations",
    subCategory: "Advertising",
    image: {
      src: "/images/workflow/GoogleCampaign.png",
      alt: "GoogleCampaign",
      width: 44,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 62,
    name: "BambooHR",
    category: "integrations",
    subCategory: "HR",
    image: {
      src: "/images/workflow/BambooHR.png",
      alt: "BambooHR",
      width: 44,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 63,
    name: "Shopify",
    category: "integrations",
    subCategory: "E-commerce",
    image: {
      src: "/images/workflow/Shopify.png",
      alt: "Shopify",
      width: 44,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 63,
    name: "Slack",
    category: "integrations",
    subCategory: "Team Communication",
    image: {
      src: "/images/workflow/Slack.png",
      alt: "Slack",
      width: 44,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        nodeMasterId: "",
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },
  {
    id: 661,
    name: "Gmail",
    category: "integrations",
    subCategory: "Team Communication",
    image: {
      src: "/svgs/gmail.svg",
      alt: "Slack",
      width: 44,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "gmail",
      position: { x: 0, y: 0 },
      data: {
        nodeMasterId: "",
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 662,
    name: "Linkedin",
    category: "integrations",
    subCategory: "Team Communication",
    image: {
      src: "/assets/node_icon/linkedin-single.svg",
      alt: "Slack",
      width: 44,
      height: 40,
    },
    node: {
      id: Date.now().toString(),
      type: "linkedin",
      position: { x: 0, y: 0 },
      data: {
        nodeMasterId: "",
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 64,
    name: "Text to image",
    description:
      "Marina Lee is an esteemed academician dedicated to rigorous research and accurate documentation. With a keen eye for reliable sources, she leverages peer-reviewed journals, scholarly books, and reputable AI Templates, ensuring all facts are cross-checked and validated. Utilizing tools like Google Scholar and JSTOR, she gathers dependable sources, meticulously organizing her material into coherent outlines. Marina adheres to a consistent citation style, expertly using tools like Zotero and EndNote for precise referencing. Her writing is clear, concise, and structured, following a methodical format: introduction, literature review, methodology, results, discussion, and conclusion. Known for her clarity, accuracy, and thoroughness, Marina addresses conflicting sources and acknowledges research limitations, always suggesting areas for future inquiry.",
    category: "tools",
    subCategory: "Image",
    image: {
      src: "https://growstackai.s3.amazonaws.com/avatars/Ai+Images/Marina_.jpeg",
      alt: "Slack",
      width: 50,
      height: 50,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 65,
    name: "Background remover",
    description:
      "Marina Lee is an esteemed academician dedicated to rigorous research and accurate documentation. With a keen eye for reliable sources, she leverages peer-reviewed journals, scholarly books, and reputable AI Templates, ensuring all facts are cross-checked and validated. Utilizing tools like Google Scholar and JSTOR, she gathers dependable sources, meticulously organizing her material into coherent outlines. Marina adheres to a consistent citation style, expertly using tools like Zotero and EndNote for precise referencing. Her writing is clear, concise, and structured, following a methodical format: introduction, literature review, methodology, results, discussion, and conclusion. Known for her clarity, accuracy, and thoroughness, Marina addresses conflicting sources and acknowledges research limitations, always suggesting areas for future inquiry.",
    category: "tools",
    subCategory: "Image",
    image: {
      src: "https://growstackai.s3.amazonaws.com/avatars/Ai+Images/Marina_.jpeg",
      alt: "Slack",
      width: 50,
      height: 50,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 66,
    name: "Background enhancer",
    description:
      "Marina Lee is an esteemed academician dedicated to rigorous research and accurate documentation. With a keen eye for reliable sources, she leverages peer-reviewed journals, scholarly books, and reputable AI Templates, ensuring all facts are cross-checked and validated. Utilizing tools like Google Scholar and JSTOR, she gathers dependable sources, meticulously organizing her material into coherent outlines. Marina adheres to a consistent citation style, expertly using tools like Zotero and EndNote for precise referencing. Her writing is clear, concise, and structured, following a methodical format: introduction, literature review, methodology, results, discussion, and conclusion. Known for her clarity, accuracy, and thoroughness, Marina addresses conflicting sources and acknowledges research limitations, always suggesting areas for future inquiry.",
    category: "tools",
    subCategory: "Image",
    image: {
      src: "https://growstackai.s3.amazonaws.com/avatars/Ai+Images/Marina_.jpeg",
      alt: "Slack",
      width: 50,
      height: 50,
    },
    node: {
      id: Date.now().toString(),
      type: "chat-gpt",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 67,
    name: "AI text to video",
    category: "tools",
    subCategory: "Video",
    description:
      "Marina Lee is an esteemed academician dedicated to rigorous research and accurate documentation. With a keen eye for reliable sources, she leverages peer-reviewed journals, scholarly books, and reputable AI Templates, ensuring all facts are cross-checked and validated. Utilizing tools like Google Scholar and JSTOR, she gathers dependable sources, meticulously organizing her material into coherent outlines. Marina adheres to a consistent citation style, expertly using tools like Zotero and EndNote for precise referencing. Her writing is clear, concise, and structured, following a methodical format: introduction, literature review, methodology, results, discussion, and conclusion. Known for her clarity, accuracy, and thoroughness, Marina addresses conflicting sources and acknowledges research limitations, always suggesting areas for future inquiry.",
    image: {
      src: "https://growstackai.s3.amazonaws.com/avatars/Ai+Images/Marina_.jpeg",
      alt: "asdas",
      width: 50,
      height: 50,
    },
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 68,
    name: "",
    category: "tools",
    subCategory: "Text",
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },

  {
    id: 69,
    name: "",
    category: "tools",
    subCategory: "Mixed",
    node: {
      id: Date.now().toString(),
      type: "growstack-llm",
      position: { x: 0, y: 0 },
      data: {
        label: "growstack-llm",
        inputs: [
          {
            variable_type: "VIDEO",
            variable_label: "url",
            variable_value: "",
            variable_values: [],
          },
        ],
      },
    },
  },
];
