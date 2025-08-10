import React, { createContext, useState, useEffect, ReactNode } from "react";

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

interface DataContextType {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  shuffleItems: () => void;
  clearData: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const getInitialData = (): DataType => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialValue;
  };

  const [data, setData] = useState<DataType>(getInitialData());

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const shuffleItems = () => {
    const shuffleArray = (inputArray: Array<any>) => {
      inputArray.sort(() => Math.random() - 0.5);
    };

    let priority_seat: Array<GridItems> = [];
    let student_seat: Array<GridItems> = [];

    data.items.forEach((item) => {
      if (item.mode === 0) student_seat.push(item);
      if (item.mode === 1) priority_seat.push(item);
    });

    shuffleArray(priority_seat);
    shuffleArray(student_seat);

    const Tempdata: Array<GridItems> = [];
    const fixed_items = data.items.filter(item => item.mode === 2);
    const shuffled_items = [...priority_seat, ...student_seat];

    let shuffled_idx = 0;
    data.items.forEach((item) => {
        if(item.mode === 2) {
            Tempdata.push(item);
        } else {
            if(shuffled_idx < shuffled_items.length) {
                Tempdata.push(shuffled_items[shuffled_idx]);
                shuffled_idx++;
            }
        }
    });


    setData({ ...data, items: Tempdata });
  };

  const clearData = () => {
    localStorage.removeItem("data");
    setData(initialValue);
    // window.location.reload(); // This might be better handled in the component that calls it
  };

  return (
    <DataContext.Provider value={{ data, setData, shuffleItems, clearData }}>
      {children}
    </DataContext.Provider>
  );
};
