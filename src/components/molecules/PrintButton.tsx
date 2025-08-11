import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PreviewModal from '../organisms/PreviewModal';
import Button from '../atoms/Button';

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
      <Button onClick={handleOpenModal} variant="secondary">
        プレビューと出力
      </Button>
      {showModal && createPortal(
        <PreviewModal onClose={handleCloseModal} />,
        document.body
      )}
    </>
  );
};

export default PrintButton;
