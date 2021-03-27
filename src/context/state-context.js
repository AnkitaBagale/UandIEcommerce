import { createContext, useContext, useReducer } from "react";

import { stateReducer } from "./state-reducer";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, {
    products: [],
    itemsInCart: [],
    itemsInWishlist: [],
    route: "PLP",
    sortBy: "",
    removeOutOfStock: false,
    removeWithoutFastDeliery: false
  });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useStateContext = () => useContext(CartContext);
