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
import { createPortal } from "react-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { DataType, GridItems } from "./Main";

interface PropItems {
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  Data: DataType;
}

export default function Grid(props: PropItems) {
  const [activeId, setActiveId] = useState(null);
  const sensors = [useSensor(PointerSensor)];

  const gridCol = (() => {
    const str = Array.from({ length: props.Data.col }, (_, i) =>
      i % 2 === 0 ? "1fr" : "1.2fr"
    ).join(" ");
    return str.endsWith("1.2fr") ? str.slice(0, -5) + "1fr" : str;
  })();

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
                  gridTemplateColumns: gridCol,
                  gridGap: 8,
                  padding: 10,
                  margin: "0 auto",
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
                    <HoverCell Data={props.Data} index={activeId} />
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

interface cssStyleType {
  [key: number]: { pclass: string; cchild: string };
}

const cssStyles: cssStyleType = {
  "0": {
    pclass: "mode div-style student student-pstyle",
    cchild: "cchild student-handle",
  },
  "2": {
    pclass: "mode div-style useless useless-pstyle",
    cchild: "hidden",
  },
  "1": {
    pclass: "mode div-style priority priority-pstyle",
    cchild: "cchild priority-handle",
  },
};
interface propItems {
  key: number;
  Data: GridItems;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  AllData: DataType;
}

const GridCell = (props: propItems) => {
  // Double Click Event, need to save the value to localStorage.setItem('data, JSON.stringfy(dta))
  const onDoubleClicked = () => {
    let tempData: Array<GridItems> = props.AllData.items;
    const index = tempData.findIndex((item) => item.id === props.Data.id);

    tempData[index] = {
      ...tempData[index],
      mode: props.Data.mode === 0 ? 1 : props.Data.mode === 1 ? 2 : 0,
    };
    props.setData({ ...props.AllData, items: tempData });
  };

  // Input changed Event, need to udpate the name data of the Grid Items.
  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempData: Array<GridItems> = props.AllData.items;
    const index = tempData.findIndex((item) => item.id === props.Data.id);

    tempData[index] = { ...tempData[index], name: e.target.value };
    props.setData({ ...props.AllData, items: tempData });
  };

  // declare the variables from the @DND-KIT
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.Data.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onDoubleClick={() => onDoubleClicked()}
      className={cssStyles[props.Data.mode].pclass}
    >
      <div
        className={props.Data.mode === 2 ? "griditem invisible" : "griditem"}
      >
        <p>学生</p>
        <div
          {...listeners}
          {...attributes}
          className={cssStyles[props.Data.mode].cchild}
          tabIndex={-1}
        >
          ⣿
        </div>
        <input
          onChange={(e) => onInputChanged(e)}
          className="inputclass"
          type="text"
          placeholder="お名前"
          defaultValue={props.Data.name}
        />
      </div>
    </div>
  );
};

interface propItems2 {
  index: number;
  Data: DataType;
}

const HoverCell = (props: propItems2) => {
  if (props.index === null) return <></>;
  const GridItem = props.Data.items.findIndex(
    (item) => item.id === props.index + 1
  );
  return (
    <div
      className={`${
        cssStyles[props.Data.items[GridItem].mode].pclass
      } hue-rotate-15 hover:shadow-none`}
    >
      <p className="inline-block w-full text-center mb-2">学生</p>
      <div className={cssStyles[props.Data.items[GridItem].mode].cchild}>⣿</div>
      <br />
      <input
        className="inputclass"
        type="text"
        placeholder="お名前"
        defaultValue={props.Data.items[GridItem].name}
      />
    </div>
  );
};
