import React, { useRef } from 'react';
import { toJpeg } from '../../utils/domToImage';
import { useData } from '../../hooks/useData';
import PreviewCell from '../atoms/PreviewCell';
import Button from '../atoms/Button';
import styles from './PreviewModal.module.css';

interface PreviewModalProps {
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ onClose }) => {
  const { data } = useData();
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const printOut = async () => {
    if (imageWrapperRef.current) {
      try {
        const dataUrl = await toJpeg(imageWrapperRef.current);
        const link = document.createElement('a');
        link.download = 'seating-chart.jpeg';
        link.href = dataUrl;
        link.click();
        onClose();
      } catch (error) {
        console.error('oops, something went wrong!', error);
        onClose();
      }
    }
  };

  const gridCol = (() => {
    let str = '1fr ';
    for (let i = 1; i < data.col; i++) {
      if (i % 2 === 0) {
        str += '1fr ';
      } else {
        str += '1.2fr ';
      }
    }
    if (str.endsWith('1.2fr ')) {
      str = str.slice(0, -6) + '1fr';
    }
    return str;
  })();

  return (
    <section
      className={styles.section}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onClose();
        }
      }}
    >
      <div className={styles.wrapper} ref={imageWrapperRef}>
        <h1 className={styles.header}>席替えプレビュー</h1>
        <div className={styles.content}>
          <div className={styles.grid} style={{ gridTemplateColumns: gridCol }}>
            {data.items.map((item) => (
              <PreviewCell key={`prevcel-${item.id}`} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={printOut} className={styles.confirmButton} variant="primary">
          出力
        </Button>
        <Button onClick={onClose} className={styles.cancelButton} variant="secondary">
          キャンセル
        </Button>
      </div>
    </section>
  );
};

export default PreviewModal;
