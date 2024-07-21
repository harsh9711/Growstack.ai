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
    "id": 58,
    "description": "Use it for engaging conversations, gain insights, automate tasks",
    "name": "OpenAI GPT",
    "category": "Text",
    "icon": "/dummy/providers/chat.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": ["gpt-4", "gpt-3.5-turbo", "gpt-4o"]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "instruction",
            "input_default_value": "Tell me a joke about AI",
            "input_values": ""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 1,
    "description": "Summarize any text in a short and easy to understand concise way",
    "name": "Summarize text",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_1.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What would you like to summarize?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text , and you need to give summary of text.",
            "is_prompt": true,
            "prompt": "You will be given text , and you need to give summary of text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 2,
    "description": "Write the description about your product and why it worth it",
    "name": "Product description",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_2.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some Product name , and your task is to provide a description of the product.\"",
            "is_prompt": true,
            "prompt": "\"You will receive some Product name , and your task is to provide a description of the product.\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 3,
    "description": "Generate cool, creative, and catchy names for your startup in seconds",
    "name": "Startup name generator",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_3.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Startup Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Seed words (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some Startup description , and your task is to provide a some professional startup names.\"",
            "is_prompt": true,
            "prompt": "\"You will receive some Startup description , and your task is to provide a some professional startup names.\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 4,
    "description": "Take a piece of content and rewrite it to make it more interesting, creative, and engaging",
    "name": "Content rewriter",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_4.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What would you like to rewrite?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text, and your task is to rewrite the text.",
            "is_prompt": true,
            "prompt": "You will receive some text, and your task is to rewrite the text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 5,
    "description": "Write short, simple and informative points for the subheadings of your article",
    "name": "Talking points",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_5.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Paragraph Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Focus Keywords (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Article Title",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some Paragraph Description, Focus Keywords (comma seperated)\nand Article Title, and your task is to Write short, simple and informative points for the subheadings of your article.",
            "is_prompt": true,
            "prompt": "You will receive some Paragraph Description, Focus Keywords (comma seperated)\nand Article Title, and your task is to Write short, simple and informative points for the subheadings of your article."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 6,
    "description": "Allow AI to generate creative stories for you based on input text",
    "name": "Creative stories",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_6.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is your story is about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text, and your task is to generate creative stories for you based on input text.\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text, and your task is to generate creative stories for you based on input text.\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 7,
    "description": "Make sure that there are no errors in your product component and article",
    "name": "Grammar checker",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_7.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Include your text here to check",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text, and your task is to remove the errors in the text\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text, and your task is to remove the errors in the text\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 8,
    "description": "Nobody wants to read boring blog titles, generate catchy blog titles with this tool",
    "name": "Blog Titles",
    "category": "Blogs Posts",
    "icon": "/svgs/workflow_actions/icon_8.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is your blog post is about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text, and your task is to generate a catchy blog titles\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text, and your task is to generate a catchy blog titles\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 9,
    "description": "The perfect tool to start writing great articles. Generate creative ideas for your next post",
    "name": "Blog Ideas",
    "category": "Blogs Posts",
    "icon": "/svgs/workflow_actions/icon_9.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Title of your blog article",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Subheadings",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is your blog post is about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to the Title of blog article and some subheadings and a brief descriptions about blog, and your task is to generate a creative blog ideas\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to the Title of blog article and some subheadings and a brief descriptions about blog, and your task is to generate a creative blog ideas\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 10,
    "description": "Create welcome emails for your customers",
    "name": "Welcome Email",
    "category": "Emails",
    "icon": "/svgs/workflow_actions/icon_10.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Your Company/Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Describe your Product or Company",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to the company/product name and audience and a descriptions about company or product, and your task is to generate a welcome email \"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to the company/product name and audience and a descriptions about company or product, and your task is to generate a welcome email \""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 11,
    "description": "Create a creative clickbait titles foryour products",
    "name": "Clickbait titles",
    "category": "Marketing",
    "icon": "/svgs/workflow_actions/icon_11.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text, and your task is to generate a creative clickbait titles from the text \"",
            "is_prompt": true,
            "prompt": "\"You will receive some text, and your task is to generate a creative clickbait titles from the text \""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 12,
    "description": "Write a company press release with the help of AI",
    "name": "Company press release",
    "category": "Marketing",
    "icon": "/svgs/workflow_actions/icon_12.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Company Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Company Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is the press release is about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to company name and company description and What is the press release is about, and your task is to generate a creative Company press release \"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to company name and company description and What is the press release is about, and your task is to generate a creative Company press release \""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 13,
    "description": "Write a brand or prodcut press release with the help of AI",
    "name": "Brand/product press release",
    "category": "Marketing",
    "icon": "/svgs/workflow_actions/icon_13.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is the press release is about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to company name and company description and What is the press release is about, and your task is to generate a creative brand/product press release \"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to company name and company description and What is the press release is about, and your task is to generate a creative brand/product press release \""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 14,
    "description": "Generate unique brand names withthe help of AI",
    "name": "Brand names",
    "category": "Marketing",
    "icon": "/svgs/workflow_actions/icon_14.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some tex, and your task is to generate a creative brand names from the text \"",
            "is_prompt": true,
            "prompt": "\"You will receive some tex, and your task is to generate a creative brand names from the text \""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 15,
    "description": "Write an attention grabbing ad headlines",
    "name": "Ad Headlines ",
    "category": "Marketing",
    "icon": "/svgs/workflow_actions/icon_15.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to product name and audience and Product Description, and your task is to generate an attention grabbing ad headlines\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to product name and audience and Product Description, and your task is to generate an attention grabbing ad headlines\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 16,
    "description": "Create professional cold emails with the help of AI",
    "name": "Cold Email",
    "category": "Emails",
    "icon": "/svgs/workflow_actions/icon_16.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Your Company/Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Context to include in the email (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Describe your Product or Company",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to Company/Product Name and some Context to include in the email (comma seperated) and Product/company Description, and your task is to generate an Create professional cold emails",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to Company/Product Name and some Context to include in the email (comma seperated) and Product/company Description, and your task is to generate an Create professional cold emails"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 17,
    "description": "Create professional email follow up with just few clicks",
    "name": "Follow-Up Email",
    "category": "Emails",
    "icon": "/svgs/workflow_actions/icon_17.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Your Company/Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Following up after (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Describe your Product or Company",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to Company/Product Name and some following up after (comma seperated) and Product/company Description, and your task is to generate a professional  email follow up.",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to Company/Product Name and some following up after (comma seperated) and Product/company Description, and your task is to generate a professional  email follow up."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 18,
    "description": "Create professional email suject lines",
    "name": "Email Subject Lines ",
    "category": "Emails",
    "icon": "/svgs/workflow_actions/icon_18.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Describe your email",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text, and your task is to generate a professional email suject lines.",
            "is_prompt": true,
            "prompt": "\"You will receive some text, and your task is to generate a professional email suject lines."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 19,
    "description": "Generate one of most effective copywriting formula for your business",
    "name": "Problem-Agitate-Solution (PAS) Framework",
    "category": "Frameworks",
    "icon": "/svgs/workflow_actions/icon_19.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to product names and audience and product description, and your task is to Generate one of most effective copywriting formula for your business.",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to product names and audience and product description, and your task is to Generate one of most effective copywriting formula for your business."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 20,
    "description": "AIDA model will help you ensure that any kind of writing, is as effective as possible",
    "name": "Attention-Interest-Desire-Action (AIDA) Framework ",
    "category": "Frameworks",
    "icon": "/svgs/workflow_actions/icon_20.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product names and product description, and your task is to Generate a AIDA model will help you ensure that any kind of writing, is as effective as possible.",
            "is_prompt": true,
            "prompt": "You will receive some text related to product names and product description, and your task is to Generate a AIDA model will help you ensure that any kind of writing, is as effective as possible."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 21,
    "description": "Generate paragraphs about any topic including a keyword and in a specific tone of voice",
    "name": "Paragraph generator",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_21.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Paragraph description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Focus Keywords (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product description and Focus Keywords (comma seperated), and your task is to Generate paragraphs about any topic including a keyword and in a specific tone of voice from text",
            "is_prompt": true,
            "prompt": "You will receive some text related to product description and Focus Keywords (comma seperated), and your task is to Generate paragraphs about any topic including a keyword and in a specific tone of voice from text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 22,
    "description": "Write the pros and cons of a product, service or website for your blog article",
    "name": "Pros & Cons",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_22.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product descriptions",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product name and product description, and your task is to Write the pros and cons of a product, service or website from the text",
            "is_prompt": true,
            "prompt": "You will receive some text related to product name and product description, and your task is to Write the pros and cons of a product, service or website from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 23,
    "description": "Develop a privacy policy information for your organization",
    "name": "Privacy policy",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_23.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Platform Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Platform Descriptions",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to generate  a privacy policy information for your organization from the text",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to generate  a privacy policy information for your organization from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 24,
    "description": "Develop a terms and conditions information for your organization",
    "name": "Terms and conditions",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_24.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Platform name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Full Platform Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to generate  a  Terms and conditions information for your organization from the text",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to generate  a  Terms and conditions information for your organization from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 25,
    "description": "Use a dictionary to find all details of your word",
    "name": "Dictionary ",
    "category": "Articles And Contents",
    "icon": "/svgs/workflow_actions/icon_25.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Word",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to find all the details of the text like dictionary do it finds the details of all the word",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to find all the details of the text like dictionary do it finds the details of all the word"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 26,
    "description": "Write a full blog section (few paragraphs) about a subheading of your article",
    "name": "Blog section",
    "category": "Blogs Posts",
    "icon": "/svgs/workflow_actions/icon_26.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Title of your blog article",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Subheadings",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to title of blg article and some subheadings , and your task is to generate  a blog section from text.",
            "is_prompt": true,
            "prompt": "You will receive some text related to title of blg article and some subheadings , and your task is to generate  a blog section from text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 27,
    "description": "Write an intro that will entice your visitors to read more about your article",
    "name": "Blog intros",
    "category": "Blogs Posts",
    "icon": "/svgs/workflow_actions/icon_27.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Blog Post Title",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is your blog post is about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to blog title , and your task is to generate  a creative blog intros  from the text. ",
            "is_prompt": true,
            "prompt": "You will receive some text related to blog title , and your task is to generate  a creative blog intros  from the text. "
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 28,
    "description": "End your blog articles with an engaging conclusion paragraph",
    "name": "Blog conclusion",
    "category": "Blogs Posts",
    "icon": "/svgs/workflow_actions/icon_28.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Blog Post Title",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is your blog post is about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to generate  a creative blog conclusion from the text.",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to generate  a creative blog conclusion from the text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 29,
    "description": "Create a comprehensive comparison of two products between each other",
    "name": "Product Comparisons",
    "category": "Ecommerce",
    "icon": "/svgs/workflow_actions/icon_29.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Products to Compare",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to Create a comprehensive comparison of two products between each other from the text",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to Create a comprehensive comparison of two products between each other from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 30,
    "description": "Create attention grabbing amazon product description",
    "name": "Amazon Product Description ",
    "category": "Ecommerce",
    "icon": "/svgs/workflow_actions/icon_30.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Focus Keywords (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product name , and your task is to Create attention grabbing amazon product description from the text",
            "is_prompt": true,
            "prompt": "You will receive some text related to product name , and your task is to Create attention grabbing amazon product description from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 31,
    "description": "List out product benefits via help of  AI solution",
    "name": "Product benefits",
    "category": "Ecommerce",
    "icon": "/svgs/workflow_actions/icon_31.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product name , and your task is to create a List out product benefits  from the text",
            "is_prompt": true,
            "prompt": "You will receive some text related to product name , and your task is to create a List out product benefits  from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 32,
    "description": "Find out selling product titles for your product description",
    "name": "Selling product titles",
    "category": "Ecommerce",
    "icon": "/svgs/workflow_actions/icon_32.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product name , and your task is to generate  out selling product title from the text.",
            "is_prompt": true,
            "prompt": "You will receive some text related to product name , and your task is to generate  out selling product title from the text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 33,
    "description": "Write a full prodcut characteristics",
    "name": "Product Characteristics ",
    "category": "Ecommerce",
    "icon": "/svgs/workflow_actions/icon_33.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Focus Keywords (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product name, and your task is to generate  a Product characteristics from the text",
            "is_prompt": true,
            "prompt": "You will receive some text related to product name, and your task is to generate  a Product characteristics from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 34,
    "description": "Advantages and features of your products that will make them irresistable for shoppers",
    "name": "Amazon product features",
    "category": "Ecommerce",
    "icon": "/svgs/workflow_actions/icon_34.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text related to product name and audience and product descriptions, and your task is to generate Advantages and features of your products that will make them irresistable for shoppers from text.",
            "is_prompt": true,
            "prompt": "You will receive some text related to product name and audience and product descriptions, and your task is to generate Advantages and features of your products that will make them irresistable for shoppers from text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 35,
    "description": "Conversion-oriented formula designed to make a particular offer more appealing",
    "name": "Before–after–bridge (BAB) framework",
    "category": "Frameworks",
    "icon": "/svgs/workflow_actions/icon_35.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to generate  a  Conversion-oriented formula designed to make a particular offer more appealing from the text",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to generate  a  Conversion-oriented formula designed to make a particular offer more appealing from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 36,
    "description": "Use 4P formula to craft persuasive content that moves readers to action",
    "name": "Promise–picture–proof–push (PPPP) framework",
    "category": "Frameworks",
    "icon": "/svgs/workflow_actions/icon_36.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to generate and use Use 4P formula to craft persuasive content that moves readers to action from the text",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to generate and use Use 4P formula to craft persuasive content that moves readers to action from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 37,
    "description": "Write a social media post for yourself to be published on any platform",
    "name": "Social Media Post (Personal)",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_37.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is this post about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to generate  a social media post content from the text",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to generate  a social media post content from the text"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 38,
    "description": "Write Facebook ads that engage your audience and deliver a high conversion rate",
    "name": "Facebook Ads",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_38.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to product name and audience and product description, and your task is to generate a creative facebook ads\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to product name and audience and product description, and your task is to generate a creative facebook ads\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 39,
    "description": "Write compelling YouTube descriptions to get people interested in your video",
    "name": "Video Descriptions ",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_39.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is the title of your video?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to the title of video, and your task is to generate a compelling YouTube descriptions \"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to the title of video, and your task is to generate a compelling YouTube descriptions \""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 40,
    "description": "Write a compelling YouTube video title to catch everyones attention",
    "name": "Video titles",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_40.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is your video about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text, and your task is to generate a compelling YouTube video title to catch everyone's attention\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text, and your task is to generate a compelling YouTube video title to catch everyone's attention\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 41,
    "description": "Grab attention with catchy captions for your Instagram posts",
    "name": "Instagram captions",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_41.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is your instagram post about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text, and your task is to generate creative catchy captions for your Instagram posts.",
            "is_prompt": true,
            "prompt": "\"You will receive some text, and your task is to generate creative catchy captions for your Instagram posts."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 42,
    "description": "Find the best hashtags to use for your Instagram posts",
    "name": "Instagram Hashtags Generator",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_42.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Enter a Keyword",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to keyword, and your task is to find the best hashtags for the Instagram post\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to keyword, and your task is to find the best hashtags for the Instagram post\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 43,
    "description": "Generate SEO-optimized YouTube tags / keywords for your video",
    "name": "Youtube tags generator",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_43.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Enter your video title with keywords",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will receive some text , and your task is to generate SEO-optimized YouTube tags / keywords for the video.",
            "is_prompt": true,
            "prompt": "You will receive some text , and your task is to generate SEO-optimized YouTube tags / keywords for the video."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 44,
    "description": "Write a post for your business to be published on any social media platform",
    "name": "Social Media Post (Business)",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_44.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Company Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Company Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is this post about?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text , and your task is to generate a post for the business to be published on any social media platform\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text , and your task is to generate a post for the business to be published on any social media platform\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 45,
    "description": "Write catchy and convincing headlines to make your Facebook Ads stand out",
    "name": "Facebook headlines",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_45.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to product name and audience and product description, and your task is to generate catchy and convincing headlines to make the Facebook Ads stand out \"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to product name and audience and product description, and your task is to generate catchy and convincing headlines to make the Facebook Ads stand out \""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 46,
    "description": "Write catchy 30-character headlines to promote your product with Google Ads",
    "name": "Google ads headlines",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_46.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "\"You will receive some text related to product name and audience and product description, and your task is to generate a catchy 30-character headlines to promote your product with Google Ads\"",
            "is_prompt": true,
            "prompt": "\"You will receive some text related to product name and audience and product description, and your task is to generate a catchy 30-character headlines to promote your product with Google Ads\""
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 47,
    "description": "Write a Google Ads description that makes your ad stand out and generates leads",
    "name": "Google ads description",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_47.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given a text related to product name and audience and description of product  , and you need to Write a Google Ads description that makes your ad stand out and generates leads.",
            "is_prompt": true,
            "prompt": "You will be given a text related to product name and audience and description of product  , and you need to Write a Google Ads description that makes your ad stand out and generates leads."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 48,
    "description": "Professional and eye-catching ad descriptions that will make your product shine",
    "name": "LinkedIn ad descriptions",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_48.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Audience",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given a text related to product name and audience and description of product, and you need to give a professional and eye-catching ad descriptions that will make your product shine.\n",
            "is_prompt": true,
            "prompt": "You will be given a text related to product name and audience and description of product, and you need to give a professional and eye-catching ad descriptions that will make your product shine.\n"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 49,
    "description": "Create an interesting linkedin post with the help of AI",
    "name": "LinkedIn posts",
    "category": "Social Media",
    "icon": "/svgs/workflow_actions/icon_49.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Describe your post",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Focus Keywords (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text related to the description of post, and you need to Create an interesting linkedin post.\n",
            "is_prompt": true,
            "prompt": "You will be given text related to the description of post, and you need to Create an interesting linkedin post.\n"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 50,
    "description": "Write SEO-optimized meta description based on a description",
    "name": "Meta Description",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_50.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Website Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Website Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text related to website name and website description , and you need to Write SEO-optimized meta description based on given text..",
            "is_prompt": true,
            "prompt": "You will be given text related to website name and website description , and you need to Write SEO-optimized meta description based on given text.."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 51,
    "description": "Generate frequently asked questions based on your product description",
    "name": "FAQs",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_51.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text related to product name and product description , and you need to Generate frequently asked questions based on the product text.\n",
            "is_prompt": true,
            "prompt": "You will be given text related to product name and product description , and you need to Generate frequently asked questions based on the product text.\n"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 52,
    "description": "Generate creative answers to questions (FAQs) about your business or website",
    "name": "FAQ answers",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_52.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "What is the question you are generating answers for?",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text , and you need to Generate creative answers to questions (FAQs) about your business or website.\n",
            "is_prompt": true,
            "prompt": "You will be given text , and you need to Generate creative answers to questions (FAQs) about your business or website.\n"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 53,
    "description": "Add social proof to your website by generating user testimonials",
    "name": "Testimonials / Reviews ",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_53.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Product Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text related to product name and description, and you need to add social proof to the website by generating user testimonial.\n",
            "is_prompt": true,
            "prompt": "You will be given text related to product name and description, and you need to add social proof to the website by generating user testimonial.\n"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 54,
    "description": "Generate a song lyrics based on your description and keywords",
    "name": "Song Lyrics ",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_54.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Song description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Focus Keywords (comma seperated)",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text related to the description of song , and you need to Generate a song lyrics based on given description.\n",
            "is_prompt": true,
            "prompt": "You will be given text related to the description of song , and you need to Generate a song lyrics based on given description.\n"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 55,
    "description": "Write a comprehensive company bio based on your inputs",
    "name": "Company bio",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_55.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Company Name",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Company Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text related to the company name and description, and you need to generate a comprehensive company bio based on the text.",
            "is_prompt": true,
            "prompt": "You will be given text related to the company name and description, and you need to generate a comprehensive company bio based on the text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 56,
    "description": "Notification messages for your apps, websites and mobile devices that grabs users attention",
    "name": "App and SMS Notifications ",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_56.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Notification Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text , and you need to generate a notification message for the apps, website and mobile from the text .\n\n",
            "is_prompt": true,
            "prompt": "You will be given text , and you need to generate a notification message for the apps, website and mobile from the text .\n\n"
          }
        ]
      }
    },
    "event_execute": "processLLM"
  },
  {
    "id": 57,
    "description": "Generate a newsletter based on the provided information",
    "name": "Newsletter Generator ",
    "category": "Websites",
    "icon": "/svgs/workflow_actions/icon_57.svg",
    "provider": "Openai",
    "subtype": "gpt",
    "preset_json": {
      "body": {
        "inputs": [
          {
            "input_type": "DROPDOWN",
            "input_label": "model",
            "input_default_value": "gpt-4o",
            "input_values": [
              "gpt-4",
              "gpt-3.5-turbo",
              "gpt-4o",
              "gemini-1.5-pro",
              "gemini-1.5-flash",
              "claude-3-opus-20240229",
              "claude-3-sonnet-20240229",
              "claude-3-haiku-20240307",
              "claude-3-5-sonnet-20240620"
            ]
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "Newsletter Description",
            "input_default_value": "",
            "input_values": ""
          },
          {
            "input_type": "TEXT_AREA",
            "input_label": "prompt",
            "input_default_value": "",
            "input_values": "You will be given text related to newsletter description , and you need to generate a newsletter based on the text.",
            "is_prompt": true,
            "prompt": "You will be given text related to newsletter description , and you need to generate a newsletter based on the text."
          }
        ]
      }
    },
    "event_execute": "processLLM"
  }
]
