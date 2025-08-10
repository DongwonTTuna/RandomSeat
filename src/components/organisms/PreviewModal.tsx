import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { useData } from '../../hooks/useData';
import PreviewCell from '../atoms/PreviewCell';
import Button from '../atoms/Button';

interface PreviewModalProps {
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ onClose }) => {
  const { data } = useData();
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const printOut = async () => {
    if (imageWrapperRef.current) {
      try {
        const dataUrl = await domtoimage.toJpeg(imageWrapperRef.current);
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
      className="image-preview-section"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          onClose();
        }
      }}
    >
      <div id="imageWrapper" ref={imageWrapperRef}>
        <h1 className="image-header">前</h1>
        <div className="image-content">
          <div className="image-vertical-text">
            <h5>廊下側</h5>
          </div>
          <div className="image-grid" style={{ gridTemplateColumns: gridCol }}>
            {data.items.map((item) => (
              <PreviewCell key={`prevcel-${item.id}`} {...item} />
            ))}
          </div>
          <div className="image-vertical-text">
            <h5>窓側</h5>
          </div>
        </div>
      </div>
      <div className="image-button-container">
        <Button onClick={printOut} className="image-confirm-button">
          出力
        </Button>
        <Button onClick={onClose} className="image-cancel-button">
          キャンセル
        </Button>
      </div>
    </section>
  );
};

export default PreviewModal;
