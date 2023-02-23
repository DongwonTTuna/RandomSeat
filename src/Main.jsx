import React, { useState } from "react";
import Grid from "./Grid";
import Image from "./function/Image";
import Data from "./Data";
import Tutorial from "./Tutorial"
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

const tutorial = localStorage.getItem("tutorial")
//localStorage.setItem("tutorial","done")

class Function {
  constructor(data, setData, update, forceUpdate, col, num) {
    this.data = data;
    this.setData = setData;
    this.update = update;
    this.forceUpdate = forceUpdate;
    this.col = col;
    this.num = num;
  }
  Shuffle = () => {
    const shuffleArray = (inputArray) => {
      inputArray.sort(() => Math.random() - 0.5);
    };
    let priority_seat = [];
    let student_seat = [];
    for (let i = 0; i < this.num; i++) {
      const mod = this.data.items[i];
      if (mod.mode === 0) {
        student_seat.push(mod);
      } else if (mod.mode === 2) {
        priority_seat.push(mod);
      }
    }
    shuffleArray(priority_seat);
    shuffleArray(student_seat);
    for (let i = 0; i < this.num; i++) {
      // iが使わない席だったらスキップする
      if (this.data.items[i].mode === 1) continue;
      //　優先席があるのであれば
      if (priority_seat.length > 0) {
        // iが2行目であり、１行前の席が優先席ではない場合、Student席で割り当てる
        if (i >= this.col && this.data.items[i - 10].mode !== 2) {
          this.data.items[i] = student_seat[0];
          student_seat.shift();
          continue;
        }
        //i番目の座席に優先席を指定する
        this.data.items[i] = priority_seat[0];
        priority_seat.shift();
      } else {
        this.data.items[i] = student_seat[0];
        student_seat.shift();
      }
    }
    localStorage.setItem("data", JSON.stringify(this.data));
    this.forceUpdate(!this.update);
  };
  ClearLocal = () => {
    localStorage.clear();
    alert("全てが削除されました");
    this.data = {
      num: 4,
      col: 4,
      items: [
        { id: 1, mode: 0, name: "" },
        { id: 2, mode: 0, name: "" },
        { id: 3, mode: 0, name: "" },
        { id: 4, mode: 0, name: "" },
      ],
    };
    localStorage.setItem("data", JSON.stringify(this.data));
    this.setData(4, 4, this.data.items);
    document.getElementById("maincol").value = 4;
    document.getElementById("mainnum").value = 4;
    this.forceUpdate(!this.update);
  };
  ConfirmNumbers = (e) => {
    e.preventDefault();
    let tempcol = document.getElementById("maincol").value;
    let tempnum = document.getElementById("mainnum").value;
    if (this.num === tempnum && this.data.col === tempnum) return;
    if (tempcol === "" && tempnum === "")
      return alert("席数と列を入力してください");
    if (tempcol === "") alert("列を入力してください");
    if (tempnum === "") alert("席数を入力してください");
    this.data.col = parseInt(tempcol);
    this.data.num = parseInt(tempnum);
    if (tempnum < this.data.items.length) {
      this.data.items.splice(tempnum);
    } else {
      let k = tempnum - this.data.items.length;
      for (let i = 1; i <= k; i++) {
        this.data.items.push({ id: i, mode: 0, name: "" });
      }
      for (let i = 1; i <= tempnum; i++) {
        this.data.items[i - 1].id = i;
      }
    }
    localStorage.setItem("data", JSON.stringify(this.data));
    this.forceUpdate(!this.update);
  };
}

export default function App() {
  let data = Data();
  let num = Data((state) => state.num);
  let col = Data((state) => state.col);
  const setData = Data((state) => state.setData);
  const [update, forceUpdate] = useState(false);
  const F = new Function(data, setData, update, forceUpdate, col, num);
  console.log(tutorial)
  return (
    <div className="App">
      <form className="text-center">
        {tutorial === null ? <Tutorial/> : "" }
        <div className="students relative  shadow-xl w-max m-auto mt-16 shadow-[#B8C6DB] bg-gradient-to-br from-[#cfe3ef] to-[#F5F7FA] rounded-xl px-6 py-6">
          <div className="inline-block py-4 w-56 rounded-lg bg-gradient-to-br shadow-[#B8C6DB] to-[#cfe3ef] from-[#F5F7FA] shadow-md whitespace-nowrap">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="mb-2">
                  席数 :
                  <input
                    id="mainnum"
                    className="ml-2 bg-white rounded-md w-8 text-center"
                    defaultValue={num}
                  />
                </div>
                <div>
                  列 :
                  <input
                    id="maincol"
                    className="ml-2 bg-white rounded-md w-8 text-center"
                    defaultValue={col}
                  />
                </div>
              </div>
              <div>
                <button
                  className="p-3 bg-[#cbe0ff] shadow-md hover:shadow-inner ml-14 rounded-md"
                  onClick={(e) => {
                    F.ConfirmNumbers(e);
                  }}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
          <div className="absolute right-20">
            <Image key={Math.random()} />
          </div>
          <Grid key={Math.random()} />
          <div className="inline-block mt-16">
            <button
              type="button"
              onClick={() => F.Shuffle()}
              className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br to-[#cfe3ef] from-[#F5F7FA]"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm to-[#cfe3ef] from-[#F5F7FA]"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br from-[#cbe0ff] to-[#cbe0ff]"></span>
              <span className="relative">シャッフル</span>
            </button>
            <button
              type="button"
              onDoubleClick={() => F.ClearLocal()}
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
      </form>
    </div>
  );
}
