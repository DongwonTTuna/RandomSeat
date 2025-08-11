import React, { useState, useRef } from 'react';
import { useData } from '../../hooks/useData';
import GridCell from '../atoms/GridCell';
import styles from './SeatingGrid.module.css';

const SeatingGrid: React.FC = () => {
  const { data, setData } = useData();
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const dragOverItemId = useRef<number | null>(null);

  const gridCol = (() => {
    const str = Array.from({ length: data.col }, (_, i) =>
      i % 2 === 0 ? '1fr' : '1.2fr'
    ).join(' ');
    return str.endsWith('1.2fr') ? str.slice(0, -5) + '1fr' : str;
  })();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    if (id !== dragOverItemId.current) {
      dragOverItemId.current = id;
    }
  };

  const handleDrop = () => {
    if (draggedItemId === null || dragOverItemId.current === null) return;

    const items = [...data.items];
    const draggedIndex = items.findIndex(item => item.id === draggedItemId);
    const targetIndex = items.findIndex(item => item.id === dragOverItemId.current);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Simple swap
      [items[draggedIndex], items[targetIndex]] = [items[targetIndex], items[draggedIndex]];
      setData({ ...data, items });
    }

    setDraggedItemId(null);
    dragOverItemId.current = null;
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

  return (
    <div className={styles.wrapper}>
      <div className="info-header">前</div>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: gridCol }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()} // Necessary for drop to work
      >
        {data.items.map((item) => (
          <GridCell
            key={item.id}
            item={item}
            onDoubleClick={handleDoubleClick}
            onNameChange={handleNameChange}
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatingGrid;
