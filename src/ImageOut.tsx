import React, { useState } from "react";
import domtoimage from "dom-to-image";
import { createPortal } from "react-dom";
import { DataType, GridItems } from "./Main";

interface propsItems {
  Data: DataType;
}

export default function MakeImage(props: propsItems) {
  const [toggleShow, setToggle] = useState(false);

  return (
    <>
      <button
        className="group relative"
        onClick={(e) => {
          setToggle(true);
        }}
      >
        <span className=" absolute bottom-[-60px] -right-[4px] whitespace-nowrap invisible group-hover:visible p-2 w-max  bg-gray-100 rounded-md">
          出力
        </span>
        <img
          height={40}
          width={40}
          loading="eager"
          decoding="async"
          src="/printer.svg"
          placeholder="Printer"
          alt="Printer"
        />
      </button>
      {toggleShow
        ? createPortal(
            <PreviewPage Data={props.Data} setToggle={setToggle} />,
            document.body
          )
        : ""}
    </>
  );
}

interface propsItem {
  Data: DataType;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreviewPage = (props: propsItem) => {
  const printOut = async () => {
    console.log(document.getElementById("imageWrapper"));
    await domtoimage
      .toJpeg(document.getElementById("imageWrapper") as HTMLElement)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "席.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .then(() => props.setToggle(false));
  };
  const gridCol = (() => {
    let str = "1fr ";
    for (let i = 1; i < props.Data.col; i++) {
      if (i % 2 === 0) {
        str += "1fr ";
      } else {
        str += "1.2fr ";
      }
    }
    if (str.endsWith("1.2fr ")) {
      str = str.slice(0, -6) + "1fr";
    }
    return str;
  })();

  console.log(gridCol);
  return (
    <section
      className="imageSection"
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        props.setToggle(false);
      }}
    >
      <div id="imageWrapper">
        <h1 className="imgFront">前</h1>
        <div className="imgContent">
          <div className="imgVertical rounded-r-md bg-gray-600 text-gray-200">
            <h5>廊下側</h5>
          </div>
          <div className="imgGrid" style={{ gridTemplateColumns: gridCol }}>
            {props.Data.items.map((item, index) => {
              return (
                <PreviewCell
                  key={`prevcel${index}`}
                  id={item.id}
                  mode={item.mode}
                  name={item.name}
                />
              );
            })}
          </div>
          <div className="imgVertical rounded-l-md bg-white text-gray-600">
            <h5>窓側</h5>
          </div>
        </div>
      </div>
      <div className="imgButtonDiv">
        <button className="imgConfirmButton" onClick={() => printOut()}>
          出力
        </button>
        <button
          className="imgCancelButton"
          onClick={() => props.setToggle(false)}
        >
          キャンセル
        </button>
      </div>
    </section>
  );
};

const PreviewCell = (props: GridItems) => {
  return (
    <div
      className={
        props.mode === 2 ? "privCell bg-gray-500" : "privCell bg-gray-300"
      }
    >
      <p className={props.mode === 2 ? "invisible" : ""}>{props.name}</p>
    </div>
  );
};
