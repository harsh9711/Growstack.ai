import { ImageProps } from "@/types/workflows";
import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type ChatGptNodeProps = Node<
  { label: string; image: ImageProps },
  "chat-gpt"
>;
export type ShortTexttNodeProps = Node<
  { label: string; image: ImageProps },
  "short-text"
>;

export type LongTexttNodeProps = Node<
  { label: string; image: ImageProps },
  "long-text"
>;

export type BooleanNodeProps = Node<
  { label: string; image: ImageProps },
  "boolean"
>;
export type NumberNodeProps = Node<
  { label: string; image: ImageProps },
  "number"
>;
export type FileUploadNodeProps = Node<
  { label: string; image: ImageProps },
  "fileUpload"
>;
export type AppNode =
  | BuiltInNode
  | ChatGptNodeProps
  | ShortTexttNodeProps
  | LongTexttNodeProps
  | BooleanNodeProps
  | NumberNodeProps
  | FileUploadNodeProps;
