import { X } from "lucide-react";
import React from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

interface SubtitleListProps {
  subtitles: string[];
  onReorder: (subtitles: string[]) => void;
  onRemove: (index: number) => void;
}

const SubtitleList: React.FC<SubtitleListProps> = ({ subtitles, onReorder, onRemove }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // If dropped outside the list

    const items = Array.from(subtitles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="subtitle-list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="mt-4 space-y-4">
            {subtitles.map((subtitle, index) => (
              <Draggable key={index} draggableId={`subtitle-${index}`} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex items-center gap-4">
                    <div className="cursor-grab active:cursor-grabbing w-full max-w-fit">☰</div>
                    <div className="w-full bg-[#F5F5F5] p-3 rounded-lg">{subtitle}</div>
                    <X size={25} className="text-primary-green cursor-pointer" onClick={() => onRemove(index)} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SubtitleList;
