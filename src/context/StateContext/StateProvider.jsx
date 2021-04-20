import { createContext, useContext, useReducer } from "react";

import { stateReducer } from "./state-reducer";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const initialState = {
    products: [],
    itemsInCart: [],
    itemsInWishlist: [],
    sortBy: "",
    dataFilter: {
      includeOutOfStock: true,
      filterByCategories: [],
      filterByBrands: []
    }
  };
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
