import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSwappingStrategy,
  arraySwap,
} from "@dnd-kit/sortable";
import { GridCell, OnlyCell } from "./function/GridCell";
import { createPortal } from "react-dom";
import type { DataType, GridItems } from "./Main";

interface PropItems {
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  Data: DataType;
}


export default function Grid(props: PropItems) {
  const [activeId, setActiveId] = useState(null);
  const sensors = [useSensor(PointerSensor)];


  // if the user started dragging.
  const handleDragStart = (event: any) => {
    if (event.active.id === null) return;
    event.active.id--;
    setActiveId(event.active.id);
  };

  // if the user ended dragging.
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      let a = props.Data.items;
      const oldIndex = props.Data.items.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = props.Data.items.findIndex(
        (item) => item.id === over.id
      );
      const swappedArray: GridItems[] = arraySwap(a, oldIndex, newIndex);
      props.setData({ ...props.Data, items: swappedArray });
    }
    setActiveId(null);
    return;
  };

  // if the user canceled the dragging,
  const handleDragCancel = () => setActiveId(null);

  return (
    <>
      <div className="gridwrapper">
        <div className="informfront">前</div>
        <div className="mx-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={props.Data.items}
              strategy={rectSwappingStrategy}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${props.Data.col}, 1fr)`,
                  gridGap: 8,
                  padding: 10,
                  margin:"0 auto",
                  width: "fit-content",
                }}
              >
                {props.Data.items.map((value) => {
                  return (
                    <GridCell
                      AllData={props.Data}
                      setData={props.setData}
                      key={value.id}
                      Data={value}
                    />
                  );
                })}
              </div>
            </SortableContext>
            {createPortal(
              <>
                {activeId !== null ? (
                  <DragOverlay adjustScale={true}>
                    <OnlyCell Data={props.Data} index={activeId} />
                  </DragOverlay>
                ) : (
                  <></>
                )}
              </>,
              document.body
            )}
          </DndContext>
        </div>
      </div>
    </>
  );
}
