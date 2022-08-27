import create from "zustand";

const useStore = create(set => ({
    num: (localStorage.getItem("data") !== null ) ? JSON.parse(localStorage.getItem("data")).num : 4 ,
    col: (localStorage.getItem("data") !== null ) ? JSON.parse(localStorage.getItem("data")).col : 4 ,
    items: (localStorage.getItem("data") !== null ) ? JSON.parse(localStorage.getItem("data")).items : [{id:1, mode:0, name: ""},{id:2, mode:0, name: ""},{id:3, mode:0, name: ""},{id:4, mode:0, name: ""}] ,
    setItems: (input) => set({ items: input }),
  }));

export default useStore