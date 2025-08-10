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
        className="group"
        onClick={(e) => {
          setToggle(true);
        }}
      >
        <span className="tooltip">
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
      className="image-preview-section"
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        props.setToggle(false);
      }}
    >
      <div id="imageWrapper">
        <h1 className="image-header">前</h1>
        <div className="image-content">
          <div className="image-vertical-text">
            <h5>廊下側</h5>
          </div>
          <div className="image-grid" style={{ gridTemplateColumns: gridCol }}>
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
          <div className="image-vertical-text">
            <h5>窓側</h5>
          </div>
        </div>
      </div>
      <div className="image-button-container">
        <button className="image-confirm-button" onClick={() => printOut()}>
          出力
        </button>
        <button
          className="image-cancel-button"
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
      className={`preview-cell ${
        props.mode === 2 ? "empty" : "filled"
      }`}
    >
      <p className={props.mode === 2 ? "hidden" : ""}>{props.name}</p>
    </div>
  );
};
