import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSwappingStrategy,
  arraySwap,
} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { useData } from '../../hooks/useData';
import GridCell from '../atoms/GridCell';
import HoverCell from '../atoms/HoverCell';

const SeatingGrid: React.FC = () => {
  const { data, setData } = useData();
  const [activeId, setActiveId] = useState<number | null>(null);
  const sensors = [useSensor(PointerSensor)];

  const gridCol = (() => {
    const str = Array.from({ length: data.col }, (_, i) =>
      i % 2 === 0 ? '1fr' : '1.2fr'
    ).join(' ');
    return str.endsWith('1.2fr') ? str.slice(0, -5) + '1fr' : str;
  })();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = data.items.findIndex((item) => item.id === active.id);
      const newIndex = data.items.findIndex((item) => item.id === over.id);
      const newItems = arraySwap(data.items, oldIndex, newIndex);
      setData({ ...data, items: newItems });
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDoubleClick = (id: number) => {
    const newItems = data.items.map((item) => {
      if (item.id === id) {
        return { ...item, mode: (item.mode + 1) % 3 };
      }
      return item;
    });
    setData({ ...data, items: newItems });
  };

  const handleNameChange = (id: number, newName: string) => {
    const newItems = data.items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      return item;
    });
    setData({ ...data, items: newItems });
  };

  const activeItem = activeId ? data.items.find(item => item.id === activeId) : null;

  return (
    <div className="grid-wrapper">
      <div className="info-header">前</div>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={data.items} strategy={rectSwappingStrategy}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: gridCol,
                gridGap: 8,
                padding: 10,
                margin: '0 auto',
                width: 'fit-content',
              }}
            >
              {data.items.map((item) => (
                <GridCell
                  key={item.id}
                  item={item}
                  onDoubleClick={handleDoubleClick}
                  onNameChange={handleNameChange}
                />
              ))}
            </div>
          </SortableContext>
          {createPortal(
            <DragOverlay adjustScale={true}>
              {activeItem ? <HoverCell item={activeItem} /> : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default SeatingGrid;
