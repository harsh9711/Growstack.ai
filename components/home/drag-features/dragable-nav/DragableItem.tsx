"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useDragableFeatures } from "../store";
interface Props {
  title: string;
  icon: {
    path: string;
    alt: string;
  };
  color: {
    from: string;
    to: string;
  };
  provided?: any;
  snapshot?: any;
  className?: string;
}

export default function DragableItem({
  title,
  icon: { path, alt },
  color,
  provided,
  snapshot,
  className,
}: Props) {
  const { isDraggingOverDropZone } = useDragableFeatures();

  const isDraggingOver = isDraggingOverDropZone && snapshot.isDragging;

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={cn(
        "inline-flex    items-center space-x-2.5 cursor-pointer",
        className
      )}
    >
      {isDraggingOver ? (
        <>
          <div className="min-w-16  min-h-[67px] lg:w-16 lg:h-[67px] xl:w-[150px] xl:h-[150px] mx-auto">
            <Image src={path} width={150} height={150} alt={alt ? alt : title} />
          </div>
          <span className="inline-block">{title}</span>
        </>
      ) : (
        <>
          <div
            className={cn(
              ` size-8 xl:size-20   rounded-lg inline-flex items-center justify-center `
            )}
          >
            <Image src={path} width={150} height={150} alt={alt ? alt : title} className="" />
          </div>
          <span className={`whitespace-nowrap text-sm lg:text-base`}>
            {title}
          </span>
        </>
      )}
    </div>
  );
}
