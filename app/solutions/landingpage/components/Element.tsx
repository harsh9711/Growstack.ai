"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DraggableButton from "./Drag";
import { features } from "../utils/features_data";
import { createPortal } from "react-dom";

export const InteractiveElement = () => {
  const [animate, setAnimate] = useState(false);
  const [winReady, setwinReady] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setwinReady(true);
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  const onDragEnd = (result: any) => {
    console.log(result);
    if (
      result.destination &&
      result.destination.droppableId == "view_feature_area"
    ) {
      setModal(true);
    }
  };

  if (!winReady) return null; // Correctly return null if not ready

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="view_feature_area">
          {(provided) => (
            <div>
              {provided.placeholder}
              <div className="absolute top-0 left-0 min-h-[800px] w-full justify-center">
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  id="droppable-area"
                  className="container mt-96 mx-auto 2xl:max-w-xl lg:max-w-lg px-4 py-8 text-center drop-box"
                >
                  <div
                    style={{
                      backgroundImage: "url(/dragicons/ai-icon.png)",
                      backgroundSize: "100%",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="h-16 w-16 rounded-full m-auto animate-spin select-none"
                  />
                  <p className="text-sm font-bold mt-2">
                    Drag features to view details
                  </p>
                </div>
              </div>

              <div className="absolute top-0 h-full w-full flex justify-center">
                <div className="relative z-20 h-full w-full 2xl:max-w-screen-xl">
                  {features.map((it, index) => (
                    <Draggable
                      key={it.id}
                      draggableId={it.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <DraggableButton
                          provided={provided}
                          snapshot={snapshot}
                          animate={animate}
                          it={it}
                          key={index}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {modal && <FeatureModal onClose={() => setModal(false)} />}
    </>
  );
};

const Modal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 p-3 rounded-full w-12 h-12 text-5xl text-white flex pt-1 items-center justify-center font-extralight"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="bg-white p-6 rounded-lg right-4 shadow-lg w-full max-w-[90dvw] top-5 relative">
        <img
          src="/dragimages/demo_image.png"
          className="h-full w-full rounded-xl shadow-[0px_0px_6px_lightgray]"
          alt="demo image"
        />
      </div>
    </div>
  );
};

const FeatureModal = ({ onClose }: { onClose: () => void }) => {
  return createPortal(<Modal onClose={onClose} />, document.body);
};
