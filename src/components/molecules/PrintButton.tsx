import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PreviewModal from '../organisms/PreviewModal';
import styles from './PrintButton.module.css';

const PrintButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className={styles.group} onClick={handleOpenModal}>
        <span className={styles.tooltip}>出力</span>
        <img
          height={40}
          width={40}
          loading="eager"
          decoding="async"
          src="/printer.svg"
          alt="Printer"
        />
      </button>
      {showModal && createPortal(
        <PreviewModal onClose={handleCloseModal} />,
        document.body
      )}
    </>
  );
};

export default PrintButton;
