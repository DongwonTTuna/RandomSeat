import React, { useRef } from "react";
import { DataType, GridItems } from "./Main";

interface PropsItems {
  Data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

export default function ChangeInput(props: PropsItems) {
  // declare the useRef to get the values from the input tags.
  const totalNum = useRef<HTMLInputElement>(null);
  const rowNum = useRef<HTMLInputElement>(null);

  const checkValidity = () => {
    // check the value is valid before updating the data
    if (totalNum.current === null || rowNum.current === null) return;
    if (totalNum.current.value === ("" || "0")) totalNum.current.value = "8";
    if (rowNum.current.value === ("" || "0")) rowNum.current.value = "2";
  };

  const setValue = () => {
    if (totalNum.current === null || rowNum.current === null) return;
    let value: Array<GridItems> = [];
    // if we need to reduce the number of item size
    if (props.Data.items.length > parseInt(totalNum.current.value)) {
      //slice the item to size
      value = props.Data.items.slice(0, parseInt(totalNum.current.value));
    } // if we need to make more items to data.items
    else {
      // declare the array for additional items.
      value = [
        ...props.Data.items,
        ...(() => {
          let maxID = Math.max(...props.Data.items.map((o) => o.id));
          const tempArray: Array<GridItems> = [];
          for (
            let i = 0;
            i < parseInt(totalNum.current.value) - props.Data.items.length;
            i++
          ) {
            maxID++;
            tempArray.push({ id: maxID, mode: 0, name: "" });
          }
          return tempArray;
        })(),
      ];
    }
    // insert the items and update
    props.setData({
      num: parseInt(totalNum.current.value),
      col: parseInt(rowNum.current.value),
      items: [...value],
    });
  };

  return (
    <div className="value-input-section">
      <div className="value-input-box">
        <div>
          席数 :
          <input type="number" defaultValue={props.Data.num} ref={totalNum} placeholder="8" />
        </div>
        <div>
          列 :
          <input type="number" defaultValue={props.Data.col} ref={rowNum} placeholder="4" />
        </div>
      </div>

      <div>
        <button
          className="confirm-button"
          onClick={(e) => {
            e.preventDefault();
            checkValidity();
            setValue();
          }}
        >
          確認
        </button>
      </div>
    </div>
  );
}
