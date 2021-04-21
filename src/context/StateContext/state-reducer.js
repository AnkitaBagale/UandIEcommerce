import { isAlreadyAdded, addNewItem } from "../../utils";

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SET_WISHLIST":
      return { ...state, itemsInWishlist: action.payload };

    case "SET_CART":
      return { ...state, itemsInCart: action.payload };

    case "SORT": {
      if (action.payload === "HIGH_TO_LOW_PRICE") {
        return { ...state, sortBy: "HIGH_TO_LOW_PRICE" };
      }
      if (action.payload === "LOW_TO_HIGH_PRICE")
        return { ...state, sortBy: "LOW_TO_HIGH_PRICE" };
      return { ...state, sortBy: "" };
    }

    case "INCLUDE_OUT_OF_STOCK": {
      return {
        ...state,
        dataFilter: { ...state.dataFilter, includeOutOfStock: action.payload }
      };
    }

    case "FILTER_BY_CATEGORIES": {
      return state.dataFilter.filterByCategories.includes(action.payload)
        ? {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByCategories: state.dataFilter.filterByCategories.filter(
                (item) => item !== action.payload
              )
            }
          }
        : {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByCategories: state.dataFilter.filterByCategories.concat(
                action.payload
              )
            }
          };
    }
    case "FILTER_BY_BRANDS": {
      return state.dataFilter.filterByBrands.includes(action.payload)
        ? {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByBrands: state.dataFilter.filterByBrands.filter(
                (item) => item !== action.payload
              )
            }
          }
        : {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByBrands: state.dataFilter.filterByBrands.concat(
                action.payload
              )
            }
          };
    }
    case "CLEAR_ALL_FILTERS": {
      return {
        ...state,
        sortBy: "",
        dataFilter: {
          includeOutOfStock: true,
          filterByCategories: [],
          filterByBrands: []
        }
      };
    }

    default:
      return state;
  }
};
