import React from 'react';
import { GridItems } from '../../contexts/DataContext';

interface HoverCellProps {
  item: GridItems;
}

const cssStyles = {
  "0": { pclass: "grid-cell student", cchild: "drag-handle student" },
  "1": { pclass: "grid-cell priority", cchild: "drag-handle priority" },
  "2": { pclass: "grid-cell useless", cchild: "hidden" },
};

const HoverCell: React.FC<HoverCellProps> = ({ item }) => {
  const styleClasses = cssStyles[item.mode as keyof typeof cssStyles] || cssStyles[0];

  return (
    <div className={styleClasses.pclass}>
      <div className={item.mode === 2 ? "grid-item-container hidden" : "grid-item-container"}>
        <p>学生</p>
        <div className={styleClasses.cchild}>⣿</div>
        <br />
        <input
          className="seat-name-input"
          type="text"
          placeholder="お名前"
          defaultValue={item.name}
          readOnly
        />
      </div>
    </div>
  );
};

export default HoverCell;
