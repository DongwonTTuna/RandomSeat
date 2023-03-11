import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Printout, { ForA4 } from "./Printout";
import domtoimage from "dom-to-image";
const MySwal = withReactContent(Swal);
export default function MakePdf() {
  let data = {};
  let num;
  let tdinputz = {};
  let mode = {};
  const DoPrintout = (e: any) => {
    e.preventDefault();
    data = JSON.parse(localStorage.getItem("data"));
    num = data.num;
    for (let i = 1; i <= num; i++) {
      const mod = document.getElementsByClassName("mode")[i - 1];
      if (mod.classList.contains("student")) {
        mode["mode" + i] = 0;
      } else if (mod.classList.contains("useless")) {
        mode["mode" + i] = 1;
      } else if (mod.classList.contains("priority")) {
        mode["mode" + i] = 2;
      }
      if (
        document.getElementsByClassName("tdinput")[i - 1].value !== "undefined"
      ) {
        const tdinput = document.getElementsByClassName("tdinput")[i - 1];
        tdinputz["tdinput" + i] = tdinput.value;
      }
    }
    MySwal.fire({
      width: "max-content",
      heightAuto: false,
      customClass: {
        denyButton: "w-32 h-[45px] p-0 whitespace-nowrap mr-96",
        confirmButton: "w-32 h-[45px] whitespace-nowrap",
        htmlContainer: "overflow-scroll max-h-[1000px]",
      },
      showDenyButton: true,
      confirmButtonText: "ダウンロード",
      denyButtonText: "キャンセル",
      reverseButtons: true,
      html: <Printout data={data} tdinput={tdinputz} mode={mode} />,
    }).then((result) => {
      if (result.isConfirmed) {
        const output = document.createElement("div")
        output.innerHTML = ForA4({ data: data, tdinput: tdinputz, mode: mode })
        document.getElementById("foroutput").appendChild(output)
        domtoimage.toJpeg(document.getElementById("ForA4")).then((dataUrl)=>{
          const link = document.createElement("a");
          link.download = "席.jpeg";
          link.href = dataUrl;
          link.click();
        document.getElementById("foroutput").innerHTML = ""
      })}
    })
  };

  return (
    <>
      <button className="group relative" onClick={(e) => DoPrintout(e)}>
        <span className=" absolute top-[-45px] right-[-28px] whitespace-nowrap invisible group-hover:visible p-2 w-max bg-slate-800 rounded-md">
          出力
        </span>
        <svg
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 45 45"
          className="h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M42.5,19.408H40V1.843c0-0.69-0.561-1.25-1.25-1.25H6.25C5.56,0.593,5,1.153,5,1.843v17.563H2.5 c-1.381,0-2.5,1.119-2.5,2.5v20c0,1.381,1.119,2.5,2.5,2.5h40c1.381,0,2.5-1.119,2.5-2.5v-20C45,20.525,43.881,19.408,42.5,19.408z M32.531,38.094H12.468v-5h20.063V38.094z M37.5,19.408H35c-1.381,0-2.5,1.119-2.5,2.5v5h-20v-5c0-1.381-1.119-2.5-2.5-2.5H7.5 V3.093h30V19.408z M32.5,8.792h-20c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25h20c0.689,0,1.25,0.56,1.25,1.25 S33.189,8.792,32.5,8.792z M32.5,13.792h-20c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25h20c0.689,0,1.25,0.56,1.25,1.25 S33.189,13.792,32.5,13.792z M32.5,18.792h-20c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25h20c0.689,0,1.25,0.56,1.25,1.25 S33.189,18.792,32.5,18.792z"
          />
        </svg>
      </button>
    </>
  );
}
