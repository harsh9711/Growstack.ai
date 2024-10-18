import { useEffect } from "react";
import { childItems, featureItems } from "./data";
import DragingContainer from "./DragingContainer";
import FeatureItem from "./FeatureItem";

export async function getServerSideProps(context: any) {
  resetServerContext();
  return {
    props: {},
  };
}

import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import BrandRow from "./brand/BrandRow";
import DragableItemsNav from "./dragable-nav/DragableItemsNav";
import DropZone from "./DropZone";
import { useDragableFeatures } from "./store";

export default function DragingBoard() {
  const {
    setSelectedItems,
    selectedItems,
    setDraggedItem,
    setStep,
    step,
    navItems,
    draggedItem,
    animate,
    setAnimate,
  } = useDragableFeatures();

  useEffect(() => {
    const animateTimerId = setTimeout(
      () => {
        setAnimate(true);
      },
      !step ? 200 : 900
    );

    return () => {
      setAnimate(false);
      clearTimeout(animateTimerId);
    };
  }, [selectedItems]);

  const handleDragEnd = (results: any) => {
    const { destination, source, draggableId } = results;
    // console.log(results);

    if (!destination) return;

    // console.log(destination.droppableId, source.droppableId);
    if (destination.droppableId === source.droppableId) return;

    const draggedItem = featureItems.find(
      item => item.id === Number(draggableId)
    );
    const currentItems = childItems.get(Number(draggableId));
    // const removedDragedItem = selectedItems.filter(item => item.id !== draggedItem?.id);
    // setSelectedItems(removedDragedItem);
    console.log(draggedItem);

    if (draggedItem) {
      setDraggedItem(draggedItem);
    }

    if (!currentItems || !currentItems?.length) return;
    setStep(1);
    setSelectedItems(currentItems);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <DragingContainer>
          {/* Feature sub nav */}
          {!!step && (
            <Droppable
              droppableId="feature_nav"
              key="feature_nav"
              type="features_items"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <DragableItemsNav
                  provided={provided}
                  snapshot={snapshot}
                  items={navItems.filter(
                    (item: { id: any }) => item.id !== draggedItem?.id
                  )}
                />
              )}
            </Droppable>
          )}

          {/* Brand logos */}
          <BrandRow className={!step && "pt-4 pb-20"} />

          {/* Drop zone */}
          <Droppable
            droppableId="drop_zone"
            type="features_items"
            key="drop_zone"
          >
            {(provided, snapshot) => (
              <DropZone provided={provided} snapshot={snapshot} />
            )}
          </Droppable>

          {/* Dragabble feature items */}
          <Droppable
            droppableId="view_feature_area"
            type="features_items"
            key="root"
          >
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="text-center mt-6 lg:mt-0 flex gap-4 justify-center flex-wrap"
              >
                {selectedItems?.map((item: any, index: number) => {
                  return (
                    <>
                      {!step ? (
                        <Draggable
                          draggableId={item.id.toString()}
                          key={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <FeatureItem
                              {...item}
                              provided={provided}
                              className={`md:absolute before:content-['Drag_me'] before:whitespace-nowrap before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-5 before:border before:border-red-400 before:bg-red-100 before:rounded-full before:text-xs before:px-1.5 before:py-0.5 ${
                                snapshot.draggingOver ||
                                snapshot.isDragging ||
                                snapshot.isDropAnimating
                                  ? "before:visible"
                                  : "before:invisible"
                              } hover:before:visible duration-1000 text-sm xl:text-xl ${animate ? item.cordinate + " opacity-100" : "md:left-[50%] md:top-[73.87%] md:-translate-x-1/2 opacity-0"}`}
                            />
                          )}
                        </Draggable>
                      ) : (
                        <FeatureItem
                          {...item}
                          className={`lg:absolute z-10 duration-1000 text-sm ${animate ? item.cordinate + " opacity-100" : "lg:left-[50%] lg:top-[73.87%] lg:-translate-x-1/2 opacity-0"}`}
                        />
                      )}
                    </>
                  );
                })}
                <div className="absolute">{provided.placeholder}</div>
              </div>
            )}
          </Droppable>
        </DragingContainer>
      </DragDropContext>
    </>
  );
}
