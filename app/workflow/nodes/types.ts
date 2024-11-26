import { ImageProps, NodeDataState } from "@/types/workflows";
import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;

export type OpenAiNodeProps = Node< { label: string; image: ImageProps },"open-ai">;

export type AnthropicNodeProps = Node< { label: string; image: ImageProps },"anthropic">;

export type GeminiNodeProps = Node< { label: string; image: ImageProps },"gemini">;

export type PerplexityNodeProps = Node< { label: string; image: ImageProps },"perplexity">;

export type MistralNodeProps = Node< { label: string; image: ImageProps },"mistral">;

export type GenerateImageNodeProps = Node< { label: string; image: ImageProps },"generate-image">;

export type ReadImageNodeProps = Node< { label: string; image: ImageProps },"read-image">;

export type ShortTextNodeProps = Node<NodeDataState, "short-text">;

export type LongTextNodeProps = Node<NodeDataState, "long-text">;

export type InputNodeProps = Node<NodeDataState, "input-type">;

export type BooleanNodeProps = Node<NodeDataState, "boolean">;

export type NumberNodeProps = Node<NodeDataState, "number">;

export type FileUploadNodeProps = Node<NodeDataState, "fileUpload">;

export type ChecklistNodeProps = Node<NodeDataState, "checklist">;

export type PlainTextNodeProps = Node<NodeDataState, "plain-text">;

export type MarkdownNodeProps = Node<NodeDataState, "markdown">;

export type FormNodeProps = Node<NodeDataState, "from">;

export type AppNode =
  | BuiltInNode
  | OpenAiNodeProps
  | ShortTextNodeProps
  | LongTextNodeProps
  | BooleanNodeProps
  | NumberNodeProps
  | FileUploadNodeProps
  | ChecklistNodeProps
  | InputNodeProps
  | AnthropicNodeProps
  | GeminiNodeProps
  | PerplexityNodeProps
  | MistralNodeProps
  | GenerateImageNodeProps
  | ReadImageNodeProps
  | PlainTextNodeProps
  | MarkdownNodeProps
  | FormNodeProps
  ;
