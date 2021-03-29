import { useStateContext } from "../context";

export const getSortedData = (state, data) => {
  if (state.sortBy === "HIGH_TO_LOW_PRICE") {
    return [...data].sort((product1, product2) => {
      return Number(product2.price) - Number(product1.price);
    });
  }
  if (state.sortBy === "LOW_TO_HIGH_PRICE") {
    return [...data].sort((product1, product2) => {
      return Number(product1.price) - Number(product2.price);
    });
  }
  return data;
};

export const getFilteredData = (state, data) => {
  let newData = [...data];
  if (state.removeOutOfStock) {
    newData = newData.filter((product) => product.inStock);
  }
  if (state.removeWithoutFastDeliery) {
    newData = newData.filter((product) => product.fastDelivery);
  }
  return newData;
};

export const filterDataOnStatus = (state) => {
  return state.filter((item) => item.status.exists);
};

export const Filter = () => {
  const { state, dispatch } = useStateContext();
  return (
    <ul className="styled-list list-style-none">
      <li className="title_of_filters">
        <h6 className="p">Filters</h6>
        <button
          onClick={() => {
            dispatch({ type: "CLEAR_ALL_FILTERS" });
          }}
          className="link-text link-no-style link-text-primary"
        >
          Clear All
        </button>
      </li>
      <li>Sort by:</li>
      <li>
        <label className="form-label">
          <input
            className="form-checkbox-field"
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT", payload: "HIGH_TO_LOW_PRICE" })
            }
            checked={"HIGH_TO_LOW_PRICE" === state.sortBy}
          />
          High to low
        </label>
      </li>
      <li>
        <label className="form-label">
          <input
            className="form-checkbox-field"
            type="radio"
            name="sort"
            checked={"LOW_TO_HIGH_PRICE" === state.sortBy}
            onChange={() =>
              dispatch({ type: "SORT", payload: "LOW_TO_HIGH_PRICE" })
            }
          />
          Low to High
        </label>
      </li>
      <li> Filter:</li>
      <li>
        <label className="form-label">
          <input
            className="form-checkbox-field"
            type="checkbox"
            checked={state.removeOutOfStock}
            onChange={() => {
              dispatch({
                type: "FILTER_OUT_OF_STOCK",
                payload: !state.removeOutOfStock
              });
            }}
          />
          filter out of stock products
        </label>
      </li>
      <li>
        <label className="form-label">
          <input
            className="form-checkbox-field"
            type="checkbox"
            checked={state.removeWithoutFastDeliery}
            onChange={() => {
              dispatch({
                type: "FILTER_WITHOUT_FAST_DELIVERY",
                payload: !state.removeWithoutFastDeliery
              });
            }}
          />
          filter out products without fast delivery
        </label>
      </li>
    </ul>
  );
};
