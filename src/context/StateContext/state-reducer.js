import { isAlreadyAdded, addNewItem } from "../../utils";

export const stateReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_PRODUCTS":
      return { ...state, products: payload };

    case "SET_WISHLIST":
      return { ...state, itemsInWishlist: payload };

    case "SET_CART":
      return { ...state, itemsInCart: payload };

    case "SORT": {
      if (payload === "HIGH_TO_LOW_PRICE") {
        return { ...state, sortBy: "HIGH_TO_LOW_PRICE" };
      }
      if (payload === "LOW_TO_HIGH_PRICE")
        return { ...state, sortBy: "LOW_TO_HIGH_PRICE" };
      return { ...state, sortBy: "" };
    }

    case "INCLUDE_OUT_OF_STOCK": {
      return {
        ...state,
        dataFilter: { ...state.dataFilter, includeOutOfStock: payload }
      };
    }

    case "FILTER_BY_CATEGORIES": {
      return state.dataFilter.filterByCategories.includes(payload)
        ? {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByCategories: state.dataFilter.filterByCategories.filter(
                (item) => item !== payload
              )
            }
          }
        : {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByCategories: state.dataFilter.filterByCategories.concat(
                payload
              )
            }
          };
    }
    case "FILTER_BY_BRANDS": {
      return state.dataFilter.filterByBrands.includes(payload)
        ? {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByBrands: state.dataFilter.filterByBrands.filter(
                (item) => item !== payload
              )
            }
          }
        : {
            ...state,
            dataFilter: {
              ...state.dataFilter,
              filterByBrands: state.dataFilter.filterByBrands.concat(payload)
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

    case "APPLY_SEARCH": {
      return {
        ...state,
        applySearch: payload
      };
    }
    case "CLEAR_SEARCH": {
      return {
        ...state,
        applySearch: ""
      };
    }

    default:
      return state;
  }
};
