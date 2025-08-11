import React from 'react';
import { GridItems } from '../../contexts/DataContext';
import styles from './PreviewCell.module.css';

const PreviewCell: React.FC<GridItems> = ({ mode, name }) => {
  const cellClassName = `${styles.cell} ${mode === 1 ? styles.empty : styles.filled}`;
  const textClassName = mode === 1 ? styles.hidden : '';

  return (
    <div className={cellClassName}>
      <p className={textClassName}>{name}</p>
    </div>
  );
};

export default PreviewCell;
