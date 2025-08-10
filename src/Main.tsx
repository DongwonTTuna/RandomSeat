import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import PrintOut from "./ImageOut";
import ChangeInput from "./ChangeInput";

export interface GridItems {
  id: number;
  mode: number;
  name: string;
}

export interface DataType {
  num: number;
  col: number;
  items: Array<GridItems>;
}

const initialValue: DataType = {
  num: 8,
  col: 4,
  items: [
    // ID start from the 1 because 0 doesn't work as expected
    { id: 1, mode: 0, name: "" },
    { id: 2, mode: 0, name: "" },
    { id: 3, mode: 0, name: "" },
    { id: 4, mode: 0, name: "" },
    { id: 5, mode: 0, name: "" },
    { id: 6, mode: 0, name: "" },
    { id: 7, mode: 0, name: "" },
    { id: 8, mode: 0, name: "" },
  ],
};


export default function App() {
  // Get Data from the local storage.
  const LSData = localStorage.getItem("data");
  let FormattedData: DataType;
  FormattedData = initialValue;

  // If the localstorage isn't the empty, replace FormattedData with the JSON Object.
  if (LSData) {
    FormattedData = JSON.parse(LSData);
  }

  // declare the Data
  const [Data, setData] = useState<DataType>(FormattedData);

  // Set the useEffect if the data is changed.
  useEffect(() => {
    if (Data.items.length === Data.num) {
      const jsonData = JSON.stringify(Data);
      localStorage.setItem("data", jsonData);
    }
  }, [Data]);

  // Shuffle Grid items Function.
  const Shuffle = () => {
    const shuffleArray = (inputArray: Array<any>) => {
      inputArray.sort(() => Math.random() - 0.5);
    };

    let priority_seat: Array<GridItems> = [];
    let student_seat: Array<GridItems> = [];

    Data.items.forEach((item) => {
      if (item.mode === 0) student_seat.push(item);
      if (item.mode === 1) priority_seat.push(item);
    });

    shuffleArray(priority_seat);
    shuffleArray(student_seat);

    const Tempdata: Array<GridItems> = [];

    Data.items.forEach((item, index) => {
      if (item.mode === 2) return Tempdata.push(item);
      if (priority_seat.length > 0) {
        Tempdata.push(priority_seat[0]);
        priority_seat.shift();
      } else {
        Tempdata.push(student_seat[0]);
        student_seat.shift();
      }
    });

    const lastRow : number = Data.num / Data.col


    setData({ ...Data, items: Tempdata });
  };

  // Clear all of data in the local Storage.
  const ClearLocal = () => {
    localStorage.clear();
    localStorage.setItem("data", JSON.stringify(initialValue));
    window.location.reload();
  };

  return (
    <div className="wrapper">
      <div className="content">
        <ChangeInput Data={Data} setData={setData} />
        <div className="print-icon">
          <PrintOut Data={Data} key={Math.random()} />
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
        <Grid setData={setData} Data={Data} />
        <div className="button-container">
          <button
            type="button"
            onClick={() => Shuffle()}
            className="shuffle-button"
          >
            シャッフル
          </button>
          <button
            type="button"
            onDoubleClick={() => ClearLocal()}
            className="clear-button"
          >
            データ削除
          </button>
        </div>
      </div>
    </div>
  );
}
