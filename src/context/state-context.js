import { createContext, useContext, useReducer } from "react";

import { stateReducer } from "./state-reducer";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
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
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useStateContext = () => useContext(CartContext);
