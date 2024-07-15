export type Tool = {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  preset_json: Object;
  provider: string;
  subtype: string;
  event_execute: string;
};

export const tools: Tool[] = [
  {
    id: 1,
    description: "Use it for engaging conversations, gain insights, automate tasks",
    name: "OpenAI GPT",
    category: "Text",
    icon: "/dummy/providers/chat.svg",
    provider:"Openai",
    subtype:"gpt",
    preset_json: {
      body:{
        inputs: [
         { input_type:"DROPDOWN",
          input_label:"model",
          input_default_value:"gpt-4o",
          input_values:[
            "gpt-4",
            "gpt-3.5-turbo",
            "gpt-4o"
          ]
        
        },
        {
          input_type:"TEXT_AREA",
          input_label:"instruction",
          input_default_value:"Tell me a joke about AI",
          input_values:""
        }
        ],
        
      }
    },
    event_execute:"processLLM"
  },
  {
    id: 2,
    description: "Turn a title and outline text into a fully complete high quality article within seconds",
    name: "Article Writer",
    category: "Text",
    icon: "/dummy/providers/article-svgrepo-com.svg",
    provider: "Openai",
    subtype: "gpt",
    preset_json: {
      body: {
        inputs: [
          {
            input_type: "DROPDOWN",
            input_label: "model",
            input_default_value: "gpt-4o",
            input_values: [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o"
            ]
          },
          {
            input_type: "TEXT_AREA",
            input_label: "instruction",
            input_default_value: "generate article on ai",
            input_values: "",
            is_prompt: true,
            prompt: "Assume You are best article writer in the world. you are supposed to write article based on users instructions,ssume You are best article writer in the world. you are supposed to write article based on users instructionsssume You are best article writer in the world. you are supposed to write article based on users instructions"
          }
        ],

      }
    },
    event_execute: "processLLM"
  },
  {
    id: 3,
    description: "Summarize any text in a short and easy to understand concise way",
    name: "Summarize text",
    category: "Text",
    icon: "/dummy/providers/summarize-text.svg",
    provider: "LLM",
    subtype: "LLM",
    preset_json: {
      body: {
        inputs: [
          {

            input_type: "DROPDOWN",
            input_label: "model",
            input_default_value: "gpt-4o",
            input_values: [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "gemini-1.0-pro",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307"
            ]
          },
          {
            input_type: "TEXT_AREA",
            input_label: "instruction",
            input_default_value: "",
            input_values: "",
            is_prompt: true,
            prompt: "Please summarize the following text in a short and easy-to-understand manner, highlighting the key points and main ideas in a concise way."
          }
        ],

      }
    },
    event_execute: "processLLM"
  },
  {
    id: 4,
    description: "Write the description about your product and why it worth it",
    name: "Product description",
    category: "Text",
    icon: "/dummy/providers/product-description.svg",
    provider: "LLM",
    subtype: "LLM",
    preset_json: {
      body: {
        inputs: [
          {
            input_type: "DROPDOWN",
            input_label: "model",
            input_default_value: "gpt-4o",
            input_values: [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "gemini-1.0-pro",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307"
            ]
          },
          {
            input_type: "TEXT_AREA",
            input_label: "instruction",
            input_default_value: "",
            input_values: "",
            is_prompt: true,
            prompt: "Create a compelling product description for a new release. The product name is VR.oculus, designed to enhance spiritual experiences. Consider your audience—women and aliens. Craft a narrative that captures the transformative potential of this innovative device, detailing how it transports users to otherworldly realms. Highlight its features and benefits, emphasizing its unique ability to connect users with the spiritual world seamlessly. Your description should evoke curiosity and excitement, painting a vivid picture of the VR.oculus as a must-have for seekers of transcendent experiences"
          }
        ],

      }
    },
    event_execute: "processLLM"
  },
  // { id: 2, description: "Generate text using Anthropic's Claude models", title: "Anthropic Claude", category: "Text", icon: "/dummy/providers/claude.svg" },
  // {
  //   id: 3,
  //   description: "Click to chat with an AI about your image(s), ask it anything.",
  //   title: "Chat with AI about your Image(s)",
  //   category: "Image",
  //   icon: "/dummy/providers/chat.svg",
  // },
  // { id: 4, description: "Generate text from audio", title: "Generate Text from Audio", category: "Audio", icon: "/dummy/providers/chat.svg" },
  // { id: 5, description: "Generate text from audio", title: "Research Agent", category: "Text", icon: "/dummy/providers/research.svg" },
  // { id: 6, description: "Upscale your images to higher resolutions", title: "Upscale Images", category: "Image", icon: "/dummy/providers/research.svg" },
  // { id: 7, description: "Generate faces that look real", title: "Fast Face Generation", category: "Image", icon: "/dummy/providers/face.svg" },
  // { id: 8, description: "Train custom SDXL model", title: "Train custom SDXL model", category: "Image", icon: "/dummy/providers/face.svg" },
  // {
  //   id: 9,
  //   description: "Generate Image from an SDXL Custom Model",
  //   title: "Generate Image from an SDXL Custom Model",
  //   category: "Image",
  //   icon: "/dummy/providers/face.svg",
  // },
  // {
  //   id: 10,
  //   description: "Generate images with Stable Diffusion XL",
  //   title: "Generate images with Stable Diffusion XL",
  //   category: "Image",
  //   icon: "/dummy/providers/research.svg",
  // },
  // { id: 11, description: "Train custom SD1.5 model", title: "Train custom SD1.5 model", category: "Image", icon: "/dummy/providers/face.svg" },
  // {
  //   id: 12,
  //   description: "Generate Image from an SD1.5 Custom Model",
  //   title: "Generate Image from an SD1.5 Custom Model",
  //   category: "Image",
  //   icon: "/dummy/providers/face.svg",
  // },
  // { id: 13, description: "Generate images in no time", title: "Fast Image Generation", category: "Image", icon: "/dummy/providers/image.svg" },
  // {
  //   id: 14,
  //   description: "Generate images with Realistic Vision 4.0",
  //   title: "Generate images with Realistic Vision 4.0",
  //   category: "Image",
  //   icon: "/dummy/providers/research.svg",
  // },
  // {
  //   id: 15,
  //   description: "Generate images with Stable Diffusion 1.5",
  //   title: "Generate images with Stable Diffusion 1.5",
  //   category: "Image",
  //   icon: "/dummy/providers/research.svg",
  // },
  // {
  //   id: 16,
  //   description: "Generate images with Stable Diffusion 2.1",
  //   title: "Generate images with Stable Diffusion 2.1",
  //   category: "Image",
  //   icon: "/dummy/providers/research.svg",
  // },
  // { id: 17, description: "Generate music", title: "Generate Music", category: "Audio", icon: "/dummy/providers/research.svg" },
  // { id: 18, description: "Generate audio from text", title: "Generate Audio from Text", category: "Audio", icon: "/dummy/providers/chat.svg" },
  // { id: 19, description: "Convert an image or video to video", title: "Audio/Image to Video", category: "Video", icon: "/dummy/providers/chat.svg" },
  // { id: 20, description: "Add captions to video", title: "Add Captions to Video", category: "Video", icon: "/dummy/providers/chat.svg" },
  // { id: 21, description: "Resize video with blur background", title: "Resize Video with Blur", category: "Video", icon: "/dummy/providers/chat.svg" },
  // { id: 22, description: "Upsync video", title: "Upsync Video", category: "Video", icon: "/dummy/providers/video.svg" },
  // { id: 23, description: "Merge video and audio", title: "Merge Video and Audio", category: "Video", icon: "/dummy/providers/research.svg" },
  // { id: 24, description: "Google search", title: "Google Search", category: "Utils", icon: "/dummy/providers/google.svg" },
  // { id: 25, description: "Get user's tweets", title: "Get User's Tweets", category: "Social Media", icon: "/dummy/providers/x.svg" },
  // { id: 26, description: "Get LinkedIn profile", title: "Get LinkedIn Profile", category: "Social Media", icon: "/dummy/providers/linkedin.svg" },
  // { id: 27, description: "Get LinkedIn profile posts", title: "Get LinkedIn Profile Posts", category: "Social Media", icon: "/dummy/providers/linkedin.svg" },
  // {
  //   id: 28,
  //   description: "Get LinkedIn company by domain",
  //   title: "Get LinkedIn Company by Domain",
  //   category: "Social Media",
  //   icon: "/dummy/providers/linkedin.svg",
  // },
  // { id: 29, description: "Search LinkedIn employees", title: "Search LinkedIn Employees", category: "Social Media", icon: "/dummy/providers/linkedin.svg" },
  // { id: 30, description: "Get YouTube metadata", title: "Get YouTube Metadata", category: "Social Media", icon: "/dummy/providers/youtube.svg" },
  // { id: 31, description: "Scrape a website", title: "Scrape a Website", category: "Utils", icon: "/dummy/providers/scrape.svg" },
  // { id: 32, description: "Make HTTP request", title: "Make HTTP Request", category: "Utils", icon: "/dummy/providers/scrape.svg" },
  // { id: 33, description: "Format as JSON", title: "Format as JSON", category: "Utils", icon: "/dummy/providers/scrape.svg" },
  // {
  //   id: 34,
  //   description: "Hubspot as customer relationship management (CRM) platform",
  //   title: "Hubspot",
  //   category: "Integration",
  //   icon: "/dummy/providers/hubspot.svg",
  // },
  // { id: 35, description: "Find email", title: "Find Email", category: "Utils", icon: "/dummy/providers/email.svg" },
  // { id: 36, description: "Verify email", title: "Verify Email", category: "Utils", icon: "/dummy/providers/email.svg" },
  // { id: 37, description: "Generate images using SDXL.", title: "SDXL", category: "Image", icon: "/dummy/providers/sdxl.svg" },
  // { id: 37, description: "Draw an image using Fireworks SDXL", title: "Fireworks SDXL", category: "Image", icon: "/dummy/providers/fireworks-sdxl.svg" },
  // {
  //   id: 38,
  //   description: "Convert text to speech using ElevenLabs",
  //   title: "ElevenLabs Text-to-Speech",
  //   category: "Audio",
  //   icon: "/dummy/providers/eleven-labs.svg",
  // },
];