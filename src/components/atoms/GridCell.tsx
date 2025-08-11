import React from 'react';
import { GridItems } from '../../contexts/DataContext';
import styles from './GridCell.module.css';

interface GridCellProps {
  item: GridItems;
  onDoubleClick: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const modeToClass = {
  0: styles.student,
  1: styles.priority,
  2: styles.useless,
};

const GridCell: React.FC<GridCellProps> = ({ item, onDoubleClick, onNameChange, onDragStart, onDragOver }) => {

  const handleDoubleClick = () => {
    onDoubleClick(item.id);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(item.id, e.target.value);
  };

  const cellClassName = `${styles.gridCell} ${modeToClass[item.mode as keyof typeof modeToClass] || styles.student}`;
  const containerClassName = `${styles.itemContainer} ${item.mode === 2 ? styles.hidden : ''}`;

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cellClassName}
      draggable={item.mode !== 2}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <div className={containerClassName}>
        <p>学生</p>
        <div className={styles.dragHandle} tabIndex={-1}>
          ⣿
        </div>
        <input
          onChange={handleNameChange}
          className={styles.nameInput}
          type="text"
          placeholder="お名前"
          defaultValue={item.name}
        />
      </div>
    </div>
  );
};

export default GridCell;
