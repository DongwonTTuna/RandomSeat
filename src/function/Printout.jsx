import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const ShowItem = (props) => {
  let col = props.data.col;
  let num = props.data.num;
  let row = parseInt(num / col) < 1 ? 1 : parseInt(num / col);
  let item = [];

  for (let i = 0; i < row; i++) {
    let itm = [];
    for (let j = 1; j <= col; j++) {
      if (
        props.mode["mode" + (i * col + j)] === 1 ||
        props.tdinput["tdinput" + (i * col + j)] === ""
      ) {
        itm.push(
          <td
            key={i * col + j}
            className="h-28 w-28 bg-gray-200 rounded-md"
          ></td>
        );
      } else {
        itm.push(
          <td
            key={i * col + j}
            className="whitespace-nowrap h-28 w-28 bg-gray-300 rounded-md"
          >
            {props.tdinput["tdinput" + (i * col + j)]}
          </td>
        );
      }
      if (j % 2 === 0) {
        itm.push(<td key={Math.random()} className="w-8"></td>);
      }
    }
    item.push(<tr key={Math.random()}>{itm}</tr>);
  }
  console.log(item);
  return item;
};

export default function Printout(props) {
  return (
    <>
      <h1 className="xl:hidden lg:block  md:block sm:block">
        画面を拡大してください。
      </h1>
      <section className="relative min-h-full h-max min-w-full w-max text-center bg-gray-100 rounded-md invisible xl:visible lg:invisible md:invisible sm:invisible">
        <h1 className="absolute font-bold bg-gray-400 w-full m-auto mb-16 rounded-b-md">
          前
        </h1>
        <div className="absolute top-24 ml-[80%] bg-gray-800 text-neutral-100 w-36 py-10 rounded-md">
          教卓
        </div>
        <div className="flex justify-between w-full items-stretch ">
          <div className="rounded-r-md min-h-[860px] mt-12 mb-4 w-12 flex items-center justify-center bg-gray-600 text-gray-200 pt-5">
            <h5>
              廊<br />
              <br />
              <br />
              <br />
              <br />下<br />
              <br />
              <br />
              <br />
              <br />側
            </h5>
          </div>
          <div>
            <table className=" mx-6 pl-10 pt-60 table-fixed w-[85vw] border-separate text-black border-spacing-x-2 border-spacing-y-10">
              <tbody>{ShowItem(props)}</tbody>
            </table>
          </div>
          <div className=" rounded-l-md min-h-[860px] mt-12 mb-4 flex items-center text-black justify-center w-12 float-right bg-gray-50 pt-5">
            <h5>
              窓<br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />側
            </h5>
          </div>
        </div>
      </section>
    </>
  );
}

export function ForA4(props) {
  return renderToStaticMarkup(
    <section
      id="ForA4"
      className="relative min-h-[1092px] h-max min-w-full w-max text-md bg-gray-100 rounded-md text-center"
    >
      <h1 className="absolute font-bold bg-gray-400 w-full m-auto mb-16 rounded-b-md">
        前
      </h1>
      <div className="absolute top-28 ml-[80%] bg-gray-800 text-neutral-100 w-36 py-10 rounded-md">
        教卓
      </div>
      <div className="flex justify-between h-max items-stretch">
        <div className="mt-10 rounded-r-md min-h-[1020px] w-12 flex items-center justify-center bg-gray-600 text-gray-200 pt-5">
          <h5>
            廊<br />
            <br />
            <br />
            <br />
            <br />下<br />
            <br />
            <br />
            <br />
            <br />側
          </h5>
        </div>
        <div>
          <table className="pl-10 mt-60 table-fixed w-max text-black border-separate border-spacing-x-2 border-spacing-y-16 text-center">
            <tbody>{ShowItem(props)}</tbody>
          </table>
        </div>
        <div className="mt-10 rounded-l-md min-h-[1020px] mb-2 flex items-center justify-center w-12 text-black bg-gray-50 pt-5">
          <h5>
            窓<br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />側
          </h5>
        </div>
      </div>
    </section>
  );
}
