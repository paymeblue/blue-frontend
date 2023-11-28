"use client";
import { ReactNode, createContext, useContext, useReducer } from "react";

type State = {
  phone: string | null;
  sender: string | null;
  amount: string | null;
};

type UpdateStoreAction = {
  type: "UPDATE_STORE";
  payload: Partial<State>; // Make payload properties optional
};

type StoreContextType = {
  state: State;
  updateStore: (data: State) => void; // Make updateStore parameters optional
};

const initialState: State = { phone: null, sender: null, amount: null };

const reducer = (state: State, action: UpdateStoreAction): State => {
  switch (action.type) {
    case "UPDATE_STORE":
      const { phone, amount, sender } = action.payload;
      return {
        ...state,
        phone: phone || state.phone,
        sender: sender || state.sender,
        amount: amount || state.amount,
      };
    default:
      return state;
  }
};

const StoreContext = createContext<StoreContextType>({
  state: initialState,
  updateStore: () => {},
});

export const useCtx = () => {
  return useContext(StoreContext);
};

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateStore = (data: Partial<State>) =>
    dispatch({ type: "UPDATE_STORE", payload: data });

  const value: StoreContextType = { state, updateStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
