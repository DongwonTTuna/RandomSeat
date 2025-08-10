import React from 'react';
import { useData } from '../hooks/useData';
import ChangeInputForm from '../components/molecules/ChangeInputForm';
import PrintButton from '../components/molecules/PrintButton';
import SeatingGrid from '../components/organisms/SeatingGrid';
import Button from '../components/atoms/Button';

const MainPage: React.FC = () => {
  const { shuffleItems, clearData } = useData();

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
        clearData();
        window.location.reload();
    }
  }

  return (
    <div className="wrapper">
      <div className="content">
        <ChangeInputForm />
        <div className="print-icon">
          <PrintButton />
        </div>
        <div className="info-box">
          <ul>
            <li>
              <h5>
                ※&emsp;赤の座席は使用しない席を、白は前に座らせたい人のことを示します。
              </h5>
            </li>
            <li>
              <h5>※&emsp;座席を席をダブルクリックすることで色を変更できます</h5>
            </li>
            <li>
              <h5>※&emsp;列は偶数に変換されます。</h5>
            </li>
          </ul>
        </div>
        <SeatingGrid />
        <div className="button-container">
          <Button
            onClick={shuffleItems}
            className="shuffle-button"
          >
            シャッフル
          </Button>
          <Button
            onDoubleClick={handleClear}
            className="clear-button"
          >
            データ削除 (Double Click)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
