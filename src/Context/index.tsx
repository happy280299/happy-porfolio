/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, type ReactNode, useEffect } from "react";

interface StoreContextValue {
  setLng: React.Dispatch<React.SetStateAction<string | null>>;
  lng: string | null;
}

interface Props {
  children: ReactNode;
}
export const ContextProviderWrapper = createContext<StoreContextValue | null>(
  null,
);
export const ContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [lng, setLng] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("i18nextLng");
      setLng(storedLang);
    }
  }, []);

  return (
    <ContextProviderWrapper.Provider
      value={{
        setLng,
        lng,
      }}
    >
      {children}
    </ContextProviderWrapper.Provider>
  );
};
