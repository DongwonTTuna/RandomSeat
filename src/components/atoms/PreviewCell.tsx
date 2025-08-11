import React from 'react';
import { GridItems } from '../../contexts/DataContext';
import styles from './PreviewCell.module.css';
import globalStyles from '../../index.module.css';

const PreviewCell: React.FC<GridItems> = ({ mode, name }) => {
  const cellClassName = `${styles.cell} ${mode === 2 ? styles.empty : styles.filled}`;
  const textClassName = mode === 2 ? globalStyles.hidden : '';

  return (
    <div className={cellClassName}>
      <p className={textClassName}>{name}</p>
    </div>
  );
};

export default PreviewCell;
