import React from 'react';
import Button from '../atoms/Button';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <p>{message}</p>
        <div className={styles.actions}>
          <Button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </Button>
          <Button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
