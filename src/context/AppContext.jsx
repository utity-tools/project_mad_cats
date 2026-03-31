import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Aquí es donde Claude meterá la lógica luego
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ data, setData, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);