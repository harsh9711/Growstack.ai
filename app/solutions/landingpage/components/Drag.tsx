import React from "react";

interface IDraggableButton {
  it: any;
  snapshot: any;
  provided: any;
  animate: boolean;
}

export default function DraggableButton({
  it,
  snapshot,
  provided,
  animate,
}: IDraggableButton) {
  return (
    <div
      ref={provided.innerRef} // Apply the provided ref here
      {...provided.draggableProps} // Spread draggable props here
      {...provided.dragHandleProps} // Spread drag handle props here
      className={`absolute duration-1000 z-[10] ${
        animate ? "" : "-translate-x-28"
      }`}
      style={{
        left: animate ? `${it.left}px` : "50%",
        top: animate ? `${it.top}px` : "83%",
        opacity: animate ? "100%" : "0%",
      }}
    >
      <div className="group">
        <button
          className={` ${
            snapshot.draggingOver ||
            snapshot.isDragging ||
            snapshot.isDropAnimating
              ? "visible"
              : "invisible"
          } group-hover:visible border border-red-400 bg-red-100 rounded-full text-xs px-1.5 py-0.5`}
        >
          Drag me
        </button>
        <img
          src={`/dragicons/${it.icon}`}
          alt="svg icon"
          style={{
            filter: snapshot.isDragging
              ? `drop-shadow(0px 5px 10px lightblue)`
              : "none",
          }}
        />
      </div>
    </div>
  );
}
