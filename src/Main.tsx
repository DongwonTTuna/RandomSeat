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

    Tempdata.map((item, index) => {
      if (item.name.includes("青木") ){
        if (index < (lastRow - 1) * Data.col) {
          Tempdata.splice(index, 1);
          Tempdata.push(item);
        }
      }
    })

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
        <div className="imageIcon">
          <PrintOut Data={Data} key={Math.random()} />
        </div>
        <div className="inform">
          <ul className="text-left">
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
        <div className="inline-block mt-16">
          <button
            type="button"
            onClick={() => Shuffle()}
            className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"
          >
            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br to-[#cfe3ef] from-[#F5F7FA]"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm to-[#cfe3ef] from-[#F5F7FA]"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br from-[#cbe0ff] to-[#cbe0ff]"></span>
            <span className="relative">シャッフル</span>
          </button>
          <button
            type="button"
            onDoubleClick={() => ClearLocal()}
            className="ml-20 px-5 py-2.5 relative rounded group font-medium text-white inline-block bg-gradient-to-br from-red-300 to-red-200"
          >
            <span className="z-10 absolute -translate-x-4 -translate-y-[50px]  text-sm whitespace-nowrap bg-slate-800 p-1 rounded-md invisible group-hover:visible">
              ダブルクリック!
            </span>
            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-red-600 to-red-500"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-600 to-red-500"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-red-400 from-red-300"></span>
            <span className="relative">データ削除</span>
          </button>
        </div>
      </div>
    </div>
  );
}
