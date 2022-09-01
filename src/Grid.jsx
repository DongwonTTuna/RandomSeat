import React, { useState, useEffect } from "react";
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
import Data from "./Data";
import { GridCell, OnlyCell } from "./function/GridCell";
import { createPortal } from "react-dom";

export default function Grid() {
  const data = Data();
  const [activeId, setActiveId] = useState(null);
  const sensors = [useSensor(PointerSensor)];
  const [items, setItems] = useState(Data((state) => state.items));
  const [update, SetUpdate] = useState(0);
  if (data.col <= 3) data.col = 4;
  if (data.col % 2 === 1) data.col += 1;
  let col = data["col"] / 2;
  let gridcol = "";
  try {
    for (let i = 1; i < col; i++) {
      gridcol += "1fr 1.2fr ";
    }
  } finally {
    gridcol += "1fr 1fr";
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  useEffect(() => {
    if (update === 0) return;
    data.items = items;
    localStorage.setItem("data", JSON.stringify(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      let a = items;
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arraySwap(a, oldIndex, newIndex));
    }
    setActiveId(null);
    SetUpdate(update + 1);
    return;
  }

  function handleDragCancel() {
    setActiveId(null);
  }
  return (
    <>
      <div className="inform" id="inform">
        <div className="w-fit p-2 mt-12 font-bold rounded-lg border-2 border-indigo-800">
          <ul className="text-left">
            <li>
              <h5>
                ※&emsp;赤の座席は使用しない席を、青は前に座らせたい人のことを表しています。
              </h5>
            </li>
            <li>
              <h5>※&emsp;座席をダブルクリックすることで色を変更できます</h5>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-20 mb-20">
        <div className="w-[100%] py-2 rounded-md bg-gradient-to-br from-violet-400 to-violet-500">
          前
        </div>
      </div>
      <div className=" mx-auto hue-rotate-15 ">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={items} strategy={rectSwappingStrategy}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `${gridcol}`,
                gridGap: 8,
                padding: 10,
              }}
              className="gridd"
            >
              {items.map((value) => {
                return <GridCell key={value.id} val={value} />;
              })}
            </div>
          </SortableContext>
          {createPortal(
            <DragOverlay adjustScale={true}>
              <OnlyCell val={activeId} index={activeId} />
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
}
