import React from 'react';
import { DataProvider } from './contexts/DataContext';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <DataProvider>
      <MainPage />
    </DataProvider>
  );
};

export default App;
