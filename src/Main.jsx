import React, { useState} from "react";
import Grid from "./Grid";
import Image from "./function/Image";
import Data from "./Data";
export default function App() {
  let data = Data();
  let num = Data((state) => state.num);
  let col = Data((state) => state.col);
  const [update, forceUpdate] = useState(false)
  
  const Shuffle = () => {
    const shuffleArray = (inputArray) => {
      inputArray.sort(() => Math.random() - 0.5);
    };
    let priority_seat = [];
    let student_seat = [];
    for (let i = 0; i < num; i++) {
      const mod = data.items[i]
      if (mod.mode === 0) {
        student_seat.push(mod);
      } else if (mod.mode === 2) {
        priority_seat.push(mod);
      }
    }
    shuffleArray(priority_seat);
    shuffleArray(student_seat);
    for (let i = 0; i < num; i++) {
      // iが使わない席だったらスキップする
      if (data.items[i].mode === 1) continue;
      //　優先席があるのであれば
      if (priority_seat.length > 0) {
        // iが2行目であり、１行前の席が優先席ではない場合、Student席で割り当てる
        if (i >= col && data.items[(i-10)].mode !== 2) {
          data.items[i] = student_seat[0]
          student_seat.shift();
          continue;
        }
        //i番目の座席に優先席を指定する
        data.items[i] = priority_seat[0]
        priority_seat.shift();
      } else {
        data.items[i] = student_seat[0]
        student_seat.shift();
      }
    }
    localStorage.setItem("data", JSON.stringify(data))
    forceUpdate(!update)
  };
  const ClearLocal = () => {
    localStorage.clear();
    alert("全てが削除されました");
    data = {
      num: 4,
      col: 4,
      items: [
        { id: 1, mode: 0, name: "" },
        { id: 2, mode: 0, name: "" },
        { id: 3, mode: 0, name: "" },
        { id: 4, mode: 0, name: "" },
      ],
    }
    localStorage.setItem("data", JSON.stringify(data));
    forceUpdate(!update)
  };


  const ModifyNumber = (e) => {
    let value = parseInt(e.target.value);
    if (data.num === value) return
    if (e.target.value === "") value = 4;
    data.num= value;
    if (value < data.items.length) {
      data.items.splice(value)
    }
    else{
      let k = value-data.items.length
      for (let i = 1; i <= k; i++) {
        data.items.push({ id: i, mode: 0, name: "" });
      }
      for(let i = 1; i<= value; i++){
        data.items[(i-1)].id = i
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    forceUpdate(!update)
  };


  const Upcol = (e) => {
    let value = e.target.value;
    if (e.target.value === "") value = 10;
    data.col = parseInt(value);
    localStorage.setItem("data", JSON.stringify(data));
    forceUpdate(!update)
  };

  if (localStorage.getItem("data") === null) {
    localStorage.setItem(
      "data",
      JSON.stringify({
        num: 4,
        col: 4,
        items: [
          { id: 1, mode: 0, name: "" },
          { id: 2, mode: 0, name: "" },
          { id: 3, mode: 0, name: "" },
          { id: 4, mode: 0, name: "" },
        ],
      })
    );
  }
  return (
    <div className="App">
      <form className="text-center">
        <div className="students relative  shadow-xl w-max m-auto mt-16 shadow-fuchsia-900 bg-gradient-to-br to-purple-800 from-indigo-600 rounded-xl px-6 py-6">
          <div className="inline-block py-4 w-72 rounded-lg bg-gradient-to-br from-blue-400 shadow-violet-800 to-violet-600 shadow-md">
            <div className="mb-2">
              席数 :
              <input
                onChange={(e) => ModifyNumber(e)}
                className=" bg-gray-800 rounded-md w-8 text-center"
                defaultValue={num}
              />
            </div>
            <div>
              列 :
              <input
                onChange={(e) => Upcol(e)}
                className="bg-gray-800 rounded-md w-8 text-center"
                defaultValue={col}
              />
            </div>
          </div>
          <div className="absolute right-20">
            <Image key={Math.random()} />
          </div>
          <Grid key={Math.random()} />
          <div className="inline-block mt-16">
            <button
              type="button"
              onClick={() => Shuffle()}
              className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-blue-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-blue-600 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-blue-600 from-blue-500"></span>
              <span className="relative">シャッフル</span>
            </button>
            <button
              type="button"
              onDoubleClick={() => ClearLocal()}
              className="ml-20 px-5 py-2.5 relative rounded group font-medium text-white inline-block bg-gradient-to-br from-red-600 to-red-500"
            >
              <span className="z-10 absolute top-[-100%] left-1 text-sm text-smwhitespace-nowrap bg-slate-800 p-1 rounded-md invisible group-hover:visible">
                ダブルクリック!
              </span>
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-red-600 to-red-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-600 to-red-500"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-red-500 from-red-600"></span>
              <span className="relative">データ削除</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
