import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GridItems } from '../../contexts/DataContext';

interface GridCellProps {
  item: GridItems;
  onDoubleClick: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
}

const cssStyles = {
  "0": { pclass: "grid-cell student", cchild: "drag-handle student" },
  "1": { pclass: "grid-cell priority", cchild: "drag-handle priority" },
  "2": { pclass: "grid-cell useless", cchild: "hidden" },
};

const GridCell: React.FC<GridCellProps> = ({ item, onDoubleClick, onNameChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDoubleClick = () => {
    onDoubleClick(item.id);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(item.id, e.target.value);
  };

  const styleClasses = cssStyles[item.mode as keyof typeof cssStyles] || cssStyles[0];

  return (
    <div
      ref={setNodeRef}
      style={style}
      onDoubleClick={handleDoubleClick}
      className={styleClasses.pclass}
    >
      <div className={item.mode === 2 ? "grid-item-container hidden" : "grid-item-container"}>
        <p>学生</p>
        <div {...listeners} {...attributes} className={styleClasses.cchild} tabIndex={-1}>
          ⣿
        </div>
        <input
          onChange={handleNameChange}
          className="seat-name-input"
          type="text"
          placeholder="お名前"
          defaultValue={item.name}
        />
      </div>
    </div>
  );
};

export default GridCell;
