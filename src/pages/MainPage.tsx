import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import ChangeInputForm from '../components/molecules/ChangeInputForm';
import PrintButton from '../components/molecules/PrintButton';
import SeatingGrid from '../components/organisms/SeatingGrid';
import Button from '../components/atoms/Button';
import ConfirmModal from '../components/molecules/ConfirmModal';
import styles from './MainPage.module.css';

const MainPage: React.FC = () => {
  const { shuffleItems, clearData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = () => {
    clearData();
    window.location.reload();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <ChangeInputForm />
          <div className={styles.infoBox}>
            <ul>
              <li>※ 赤の座席は使用しない席を、白は前に座らせたい人のことを示します。</li>
              <li>※ 座席を席をダブルクリックすることで色を変更できます</li>
              <li>※ 列は偶数に変換されます。</li>
            </ul>
          </div>
          <SeatingGrid />
          <div className={styles.buttonContainer}>
            <PrintButton />
            <Button
              onClick={shuffleItems}
              className={styles.shuffleButton}
              variant="primary"
            >
              シャッフル
            </Button>
            <Button
              onDoubleClick={handleClear}
              className={styles.clearButton}
              variant="danger"
            >
              データ削除 (Double Click)
            </Button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmClear}
        message="Are you sure you want to delete all data? This cannot be undone."
      />
    </>
  );
};

export default MainPage;
