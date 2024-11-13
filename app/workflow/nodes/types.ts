import { ImageProps } from "@/types/workflows";
import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type ChatGptNodeProps = Node<
  { label: string; image: ImageProps },
  "chat-gpt"
>;
export type AppNode = BuiltInNode | PositionLoggerNode | ChatGptNodeProps;
