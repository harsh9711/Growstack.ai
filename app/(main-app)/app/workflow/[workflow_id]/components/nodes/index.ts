import type { NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PostitionLoggerNode";
import { AppNode } from "./types";
import ShortText from "./ShortText";
import LongText from "./LongText";
import Boolean from "./Boolean";
import Number from "./Number";
import FileUpload from "./FileUpload";
import Checklist from "./Checklist";
import InputNode from "./InputNode";
import OpenAi from "./OpenAi";
import Anthropic from "./Anthropic";
import Gemini from "./Gemini";
import Perplexity from "./Perplexity";
import Mistral from "./Mistral";
import GenerateImage from "./GenerateImage";
import ReadImage from "./ReadImage";
import PlainText from "./PlainText";
import Markdown from "./GeneralJoinerNodes";
import Form from "./Form";
import LlmNodes from "./LlmNodes";
import GeneralInputNodes from "./GeneralInputNodes";
import GeneralJoinerNodes from "./GeneralJoinerNodes";
import ToolsNode from "./ToolsNodes";
import GmailNode from "./integrations/GmailNodes";
import LinkedinNode from "./integrations/LinkedinNode";
import FanOut from "./fanOut";
import ApolloNodes from "./integrations/ApolloNodes";
import AutoBoundNode from "./integrations/AutoBound";
import CreateRecordNode from "./integrations/CreateRecord";
import googleDocsNodes from "./integrations/GoogleDocsNode";
import AiAssistantNode from "./AI-Assistant";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 421, y: 421 },
    data: { label: "wire" },
  },
  { id: "c", position: { x: 330, y: 340 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 150, y: 150 },
    data: { label: "with React Flow" },
  },
];

export const nodeTypes = {
  "open-ai": OpenAi,
  "short-text": ShortText,
  inputType: GeneralInputNodes,
  tools: ToolsNode,
  "long-text": LongText,
  boolean: Boolean,
  number: Number,
  "file-upload": FileUpload,
  checklist: Checklist,
  "input-type": InputNode,
  anthropic: Anthropic,
  gemini: Gemini,
  perplexity: Perplexity,
  mistral: Mistral,
  "generate-image": GenerateImage,
  "read-image": ReadImage,
  "plain-text": PlainText,
  markdown: Markdown,
  joiner: GeneralJoinerNodes,
  form: Form,
  llms: LlmNodes,
  gmail: GmailNode,
  linkedin: LinkedinNode,
  fanout: FanOut,
  apollo: ApolloNodes,
  autobound: AutoBoundNode,
  salesforce: CreateRecordNode,
  googleDocs: googleDocsNodes,
  "ai-assistant": AiAssistantNode,
} satisfies NodeTypes;