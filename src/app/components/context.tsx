"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

export interface AppContextProps {
    state: string;
    setState: (state: string) => void;
}

const AppStateContext = createContext<AppContextProps | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState("");
    return (
      <AppStateContext.Provider value={{ state, setState }}>
        {children}
      </AppStateContext.Provider>
    );
}

export const useSharedState = () => {
    const context = useContext(AppStateContext);
    
    if (!context) {
        throw new Error("useSharedState debe ser usado dentro de un SharedStateProvider");
    }
    return context;
  };