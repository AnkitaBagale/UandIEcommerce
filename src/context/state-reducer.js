import {
  isAlreadyAdded,
  updateQty,
  addNewItem,
  toggleStatus
} from "../array-update-functions";

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SET_WISHLIST":
      return { ...state, itemsInWishlist: action.payload };

    case "SET_CART":
      return { ...state, itemsInCart: action.payload };

    case "ADD_OR_REMOVE_TO_WISHLIST": {
      return isAlreadyAdded(state.itemsInWishlist, action.payload.id)
        ? {
            ...state,
            itemsInWishlist: toggleStatus(
              state.itemsInWishlist,
              action.payload.id
            )
          }
        : {
            ...state,
            itemsInWishlist: addNewItem(state.itemsInWishlist, {
              ...action.payload,
              status: { exists: true }
            })
          };
    }
    case "ADD_TO_CART": {
      return isAlreadyAdded(state.itemsInCart, action.payload.id)
        ? {
            ...state,
            itemsInCart: toggleStatus(state.itemsInCart, action.payload.id)
          }
        : {
            ...state,
            itemsInCart: addNewItem(state.itemsInCart, {
              ...action.payload,
              status: { exists: true }
            })
          };
    }

    case "INCREMENT_CART_QTY":
      return {
        ...state,
        itemsInCart: updateQty(state.itemsInCart, action.payload.id, true)
      };

    case "DECREMENT_CART_QTY":
      return {
        ...state,
        itemsInCart: updateQty(state.itemsInCart, action.payload.id, false)
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        itemsInCart: toggleStatus(state.itemsInCart, action.payload.id)
      };
    case "ROUTE":
      return {
        ...state,
        route: action.payload
      };

    case "SORT": {
      if (action.payload === "HIGH_TO_LOW_PRICE") {
        return { ...state, sortBy: "HIGH_TO_LOW_PRICE" };
      }
      if (action.payload === "LOW_TO_HIGH_PRICE")
        return { ...state, sortBy: "LOW_TO_HIGH_PRICE" };
      return { ...state, sortBy: "" };
    }

    case "FILTER_OUT_OF_STOCK": {
      return action.payload === true
        ? { ...state, removeOutOfStock: true }
        : { ...state, removeOutOfStock: false };
    }
    case "FILTER_WITHOUT_FAST_DELIVERY": {
      return action.payload === true
        ? { ...state, removeWithoutFastDeliery: true }
        : { ...state, removeWithoutFastDeliery: false };
    }
    case "CLEAR_ALL_FILTERS": {
      return {
        ...state,
        removeWithoutFastDeliery: false,
        removeOutOfStock: false,
        sortBy: ""
      };
    }

    default:
      return state;
  }
};
