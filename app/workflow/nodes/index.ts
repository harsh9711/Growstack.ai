import type { NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PostitionLoggerNode";
import { AppNode } from "./types";
import ChatGptNode from "./ChatGptNode";
import ShortText from "./ShortText";
import LongText from "./LongText";
import Boolean from "./Boolean";
import Number from "./Number";

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
  // "position-logger": PositionLoggerNode,
  "chat-gpt": ChatGptNode,
  "short-text": ShortText,
  "long-text": LongText,
  boolean: Boolean,
  number: Number,
} satisfies NodeTypes;
