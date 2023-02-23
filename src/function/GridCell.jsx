import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Data from "../Data";

export function GridCell(props) {
  const items = Data((state) => state.items);
  const setItems = Data((state) => state.setItems);
  const dta = Data();
  const InputOnChange = (e) => {
    items[
      items.findIndex(
        (item) => item.id === parseInt(e.target.closest(".mode").id)
      )
    ].name = e.target.value;
    dta.items = items;
    localStorage.setItem("data", JSON.stringify(dta));
  };

  const Dbcl = (e) => {
    if (e.currentTarget.classList.contains("student")) {
      e.currentTarget.classList.remove("student-pstyle", "student");
      e.currentTarget.classList.add("priority-pstyle", "priority");
      e.currentTarget.querySelector("#btn").classList.remove("bg-indigo-400");
      e.currentTarget.querySelector("#btn").classList.add("bg-blue-400");
      items[
        items.findIndex((item) => item.id === parseInt(e.currentTarget.id))
      ].mode = 2;
    } else if (e.currentTarget.classList.contains("priority")) {
      e.currentTarget.classList.remove("priority-pstyle", "priority");
      e.currentTarget.classList.add("useless-pstyle", "useless");
      e.currentTarget.querySelector("#inv").classList.add("invisible");
      e.currentTarget.querySelector("#btn").classList.remove("bg-blue-400");
      e.currentTarget.querySelector("#btn").classList.add("bg-indigo-400");
      items[
        items.findIndex((item) => item.id === parseInt(e.currentTarget.id))
      ].mode = 1;
    } else {
      e.currentTarget.querySelector("#inv").classList.remove("invisible");
      e.currentTarget.classList.remove("useless-pstyle", "useless");
      e.currentTarget.classList.add("student-pstyle", "student");
      items[
        items.findIndex((item) => item.id === parseInt(e.currentTarget.id))
      ].mode = 0;
    }
    setItems(items);
    localStorage.setItem("data", JSON.stringify(dta));
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.val.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  let pclass = "mode div-style";
  let cchild = "cchild";
  let inputclass = "tdinput inputclass";
  let invi = "";
  if (props.val.mode === 0) {
    pclass += " student student-pstyle";
    cchild += " bg-[#a5c9ff] hover:bg-[#96bffd]";
  } else if (props.val.mode === 1) {
    pclass += " useless useless-pstyle";
    invi = "invisible";
  } else if (props.val.mode === 2) {
    pclass += " priority priority-pstyle";
    cchild += " bg-[#fffc67] border-[1px] border-[#d3d000] hover:bg-blue-500";
  }
  return (
    <div
      id={props.val.id}
      ref={setNodeRef}
      style={style}
      onDoubleClick={(e) => Dbcl(e)}
      className={pclass}
    >
      <div id="inv" className={invi}>
        <p className="inline-block mb-2 ">学生</p>
        <div id="btn" {...listeners} {...attributes} className={cchild}>
          ⣿
        </div>
        <br />
        <input
          onChange={(e) => InputOnChange(e)}
          id={"input" + props.val.id}
          className={inputclass}
          type="text"
          placeholder="お名前"
          defaultValue={props.val.name}
        />
      </div>
    </div>
  );
}

export function OnlyCell(props) {
  let cparent = "div-style";
  let cchild = "cchild";
  cparent += document.getElementById(props.val).classList.contains("student")
    ? " hue-rotate-15 student-pstyle hover:shadow-none"
    : " priority-pstyle ";
  cchild += document.getElementById(props.val).classList.contains("student")
    ? " bg-indigo-500 "
    : " bg-blue-500 ";
  let lcol = document.getElementById("input" + props.val).value;
  return (
    <div className={cparent}>
      <p className="inline-block w-full text-center mb-2">学生</p>
      <div className={cchild}>⣿</div>
      <br />
      <input
        className="w-28 shadow-md bg-gray-800 text-gray-50 rounded-lg text-center focus-within:placeholder-shown:placeholder-gray-800 "
        type="text"
        placeholder="お名前"
        defaultValue={lcol}
      />
    </div>
  );
}
