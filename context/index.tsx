import { appInitState, appReducer } from "@/reducer";
import { createContext, useContext, useReducer } from "react";

const AppContext = createContext({
  appState: appInitState,
  dispatch: (a: any) => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(appReducer, appInitState);
  return (
    <AppContext.Provider value={{ appState: state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
