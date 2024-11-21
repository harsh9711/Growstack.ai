import { ImageProps, NodeDataState } from "@/types/workflows";
import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type ChatGptNodeProps = Node<
  { label: string; image: ImageProps },
  "chat-gpt"
>;
export type ShortTextNodeProps = Node<NodeDataState, "short-text">;

export type LongTextNodeProps = Node<NodeDataState, "long-text">;

export type InputNodeProps = Node<NodeDataState, "input-type">;

export type BooleanNodeProps = Node<NodeDataState, "boolean">;

export type NumberNodeProps = Node<NodeDataState, "number">;

export type FileUploadNodeProps = Node<NodeDataState, "fileUpload">;
export type ChecklistNodeProps = Node<
  { label: string; image: ImageProps },
  "checklist"
>;
export type AppNode =
  | BuiltInNode
  | ChatGptNodeProps
  | ShortTextNodeProps
  | LongTextNodeProps
  | BooleanNodeProps
  | NumberNodeProps
  | FileUploadNodeProps
  | ChecklistNodeProps
  | InputNodeProps;
