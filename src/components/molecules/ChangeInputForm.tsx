import React, { useRef } from "react";
import { useData } from "../../hooks/useData";
import { GridItems } from "../../contexts/DataContext";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import styles from './ChangeInputForm.module.css';

const ChangeInputForm: React.FC = () => {
  const { data, setData } = useData();
  const totalNum = useRef<HTMLInputElement>(null);
  const rowNum = useRef<HTMLInputElement>(null);

  const checkValidity = () => {
    if (totalNum.current === null || rowNum.current === null) return;
    if (totalNum.current.value === "" || totalNum.current.value === "0") {
      totalNum.current.value = "8";
    }
    if (rowNum.current.value === "" || rowNum.current.value === "0") {
      rowNum.current.value = "2";
    }
  };

  const setValue = () => {
    if (totalNum.current === null || rowNum.current === null) return;

    const newNum = parseInt(totalNum.current.value, 10);
    const newCol = parseInt(rowNum.current.value, 10);
    let newItems: GridItems[] = [];

    if (data.items.length > newNum) {
      newItems = data.items.slice(0, newNum);
    } else {
      const additionalItems: GridItems[] = [];
      let maxID = Math.max(0, ...data.items.map((o) => o.id));
      for (let i = 0; i < newNum - data.items.length; i++) {
        maxID++;
        additionalItems.push({ id: maxID, mode: 0, name: "" });
      }
      newItems = [...data.items, ...additionalItems];
    }

    setData({
      num: newNum,
      col: newCol,
      items: newItems,
    });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    checkValidity();
    setValue();
  };

  return (
    <div className={styles.section}>
      <div className={styles.box}>
        <div>
          席数 :
          <Input
            type="number"
            defaultValue={data.num}
            ref={totalNum}
            placeholder="8"
          />
        </div>
        <div>
          列 :
          <Input
            type="number"
            defaultValue={data.col}
            ref={rowNum}
            placeholder="4"
          />
        </div>
      </div>

      <div>
        <Button onClick={handleSubmit} className={styles.confirmButton}>
          確認
        </Button>
      </div>
    </div>
  );
};

export default ChangeInputForm;
