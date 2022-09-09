import React from "react";
import { createPortal } from "react-dom";
import tutorial from "./tutorial.mp4";
import star from "./star.png";
import wstar from "./wstar.png";
import xicon from "./xicon.png";
export default class App extends React.Component {
  render() {
    return (
      <>
        {createPortal(
          <div className="z-20 tutorial-portal">
            <div
              className="h-screen w-full absolute top-0 left-0 z-[1] bg-slate-800 opacity-70"
              onClick={(e) => {
                e.target.parentNode.remove();
              }}
            ></div>
            <div className="absolute z-[2] h-[800px] w-[700px] top-0 bottom-0 m-auto left-0 right-0 p-20 bg-gradient-to-tr from-indigo-700 to-violet-600 rounded-lg">
              <img
                className="absolute left-[0px] bottom-0 w-[700px] h-[750px] opacity-25 rounded-lg star rotate-180"
                src={star}
              />
              <img
                onClick={(e) => {
                  localStorage.setItem("tutorial", "done");
                  document
                    .getElementsByClassName("tutorial-portal")[0]
                    .remove();
                }}
                className="absolute w-7 opacity-60 top-4 right-4 hover:opacity-80 cursor-pointer"
                src={xicon}
              />
              <div className="flex text-center whitespace-nowrap items-center justify-center">
                <img className="w-[70px]" src={wstar} />
                <div>
                  <h1 className="font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-400 ">
                    &emsp;新しい機能!&emsp;
                  </h1>
                  <p className="text-center mt-4 text-2xl text-slate-200">
                    Drag & Drop機能を追加しました!
                  </p>
                </div>
                <img className="w-[70px]" src={wstar} />
              </div>

              <ul className="relative left-[-48px] top-[50px] ml-10 mt-4 text-slate-200 text-lg whitespace-nowrap">
                <ul>
                  <p className="text-2xl mt-14">特徴</p>
                  <div className="leading-7">
                    <li>
                      &emsp;・ シャッフル後、Drag &
                      Dropを行っても結果に反映されます。
                    </li>
                    <li>
                      &emsp;・ Drag & Drop後のデータも自動的に保存されます。
                    </li>
                    <li>
                      &emsp;・
                      関連のパッケージを使用し、スムーズな動きを実現しました。
                    </li>
                    <li>
                      &emsp;・
                      専用のハンドルを追加し、ハンドルを使用した時のみ、動きます。
                    </li>
                  </div>
                </ul>
                <p className="mt-20">ご使用してくださり、ありがとうございます！</p>
              </ul>

              <div className="relative top-[110px] w-[600px] left-[-30px] right-0">
                <video
                  autoPlay
                  className="rounded-lg"
                  w="600px"
                  loop
                  muted
                  playsInline
                >
                  <source src={tutorial} />
                </video>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }
}
