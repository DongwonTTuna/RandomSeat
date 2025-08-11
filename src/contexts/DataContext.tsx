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
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse data from localStorage", e);
        return initialValue;
      }
    }
    return initialValue;
  };

  const [data, setData] = useState<DataType>(getInitialData());

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const shuffleItems = () => {
    const itemsToShuffle = data.items.filter(item => item.mode !== 2);

    // Fisher-Yates shuffle algorithm for better shuffling
    for (let i = itemsToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itemsToShuffle[i], itemsToShuffle[j]] = [itemsToShuffle[j], itemsToShuffle[i]];
    }

    // Separate priority and student seats after shuffling
    const prioritySeats = itemsToShuffle.filter(item => item.mode === 1);
    const studentSeats = itemsToShuffle.filter(item => item.mode === 0);

    const shuffledItems = [...prioritySeats, ...studentSeats];

    let shuffledIndex = 0;
    const newItems = data.items.map(item => {
      if (item.mode === 2) {
        return item;
      }
      return shuffledItems[shuffledIndex++];
    });

    setData({ ...data, items: newItems });
  };

  const clearData = () => {
    localStorage.removeItem("data");
    setData(initialValue);
  };

  return (
    <DataContext.Provider value={{ data, setData, shuffleItems, clearData }}>
      {children}
    </DataContext.Provider>
  );
};
