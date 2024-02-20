export enum AppActionType {
  SET_EASY_MODE = "SET_EASY_MODE",
}

export const appInitState = {
  easyMode: true,
};

type AppState = {
  easyMode: boolean;
};

export const appReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case AppActionType.SET_EASY_MODE:
      return {
        ...state,
        easyMode: action.payload,
      };
    default:
      return state;
  }
};
