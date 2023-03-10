import { Athlete } from "@/lib/types";
import { Unit } from "@/lib/utils";
import * as React from "react";

type AuthedHeaderContextValue = {
  nDays: number;
  unit: Unit;
  athlete: Athlete;
  accessToken: string;
};

const AuthedHeaderContext = React.createContext<
  AuthedHeaderContextValue | undefined
>(undefined);

export const useAuthedHeaderContext = () => {
  const value = React.useContext(AuthedHeaderContext);
  if (!value) {
    throw new Error(
      "useAuthedHeaderContext must be used within a AuthedHeaderContextProvider"
    );
  }
  return value;
};

export const AuthedHeaderContextProvider: React.FC<
  React.PropsWithChildren<AuthedHeaderContextValue>
> = ({ children, ...value }) => {
  return (
    <AuthedHeaderContext.Provider value={value}>
      {children}
    </AuthedHeaderContext.Provider>
  );
};
