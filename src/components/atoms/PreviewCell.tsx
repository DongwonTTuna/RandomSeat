import React from 'react';
import { GridItems } from '../../contexts/DataContext';

const PreviewCell: React.FC<GridItems> = ({ mode, name }) => {
  return (
    <div className={`preview-cell ${mode === 2 ? 'empty' : 'filled'}`}>
      <p className={mode === 2 ? 'hidden' : ''}>{name}</p>
    </div>
  );
};

export default PreviewCell;
