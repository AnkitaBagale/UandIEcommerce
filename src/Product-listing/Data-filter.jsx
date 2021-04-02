import { useStateContext } from "../context";
import { useState } from "react";
import { categories, brands } from "../database";

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
  if (!state.includeOutOfStock) {
    newData = newData.filter((product) => product.inStock);
  }
  if (state.filterByCategories.length !== 0)
    newData = newData.filter((product) =>
      state.filterByCategories.includes(product.category)
    );
  if (state.filterByBrands.length !== 0)
    newData = newData.filter((product) =>
      state.filterByBrands.includes(product.brand)
    );
  return newData;
};

export const filterDataOnStatus = (state) => {
  return state.filter((item) => item.status.exists);
};

export const Filter = () => {
  const { state, dispatch } = useStateContext();
  const [openFilter, setFilter] = useState(false);
  return (
    <div
      className={
        openFilter
          ? "padding-around-filter position-fixed filter-open"
          : "padding-around-filter position-fixed"
      }
    >
      <div className="title_of_filters">
        <button
          onClick={() => setFilter((openFilter) => !openFilter)}
          className="p link-no-style pointer-event-none-L text-regular-weight"
        >
          {openFilter ? "APPLY" : "FILTERS"}
        </button>
        <button
          onClick={() => {
            dispatch({ type: "CLEAR_ALL_FILTERS" });
          }}
          className="link-text p link-no-style link-text-primary text-regular-weight"
        >
          CLEAR ALL
        </button>
      </div>

      <ul className="list-style-none filter-section">
        <hr className="filter-divider-line" />
        <li className="text-regular-weight filter-section-title">Sort by</li>
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
            Price High to low
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
            Price Low to High
          </label>
        </li>
        <hr className="filter-divider-line" />
        <li className="text-regular-weight filter-section-title">Categories</li>

        {categories.map((category) => {
          return (
            <li key={category}>
              <label className="form-label">
                <input
                  className="form-checkbox-field"
                  type="checkbox"
                  checked={state.filterByCategories.includes(category)}
                  onChange={() => {
                    dispatch({
                      type: "FILTER_BY_CATEGORIES",
                      payload: category
                    });
                  }}
                />
                {category}
              </label>
            </li>
          );
        })}

        <hr className="filter-divider-line" />
        <li className="text-regular-weight filter-section-title">Brands</li>

        {brands.map((brand) => {
          return (
            <li key={brand}>
              <label className="form-label">
                <input
                  className="form-checkbox-field"
                  type="checkbox"
                  checked={state.filterByBrands.includes(brand)}
                  onChange={() => {
                    dispatch({
                      type: "FILTER_BY_BRANDS",
                      payload: brand
                    });
                  }}
                />
                {brand}
              </label>
            </li>
          );
        })}

        <hr className="filter-divider-line" />
        <li className="text-regular-weight filter-section-title">Other</li>
        <li>
          <label className="form-label">
            <input
              className="form-checkbox-field"
              type="checkbox"
              checked={state.includeOutOfStock}
              onChange={() => {
                dispatch({
                  type: "INCLUDE_OUT_OF_STOCK",
                  payload: !state.includeOutOfStock
                });
              }}
            />
            Include out of stock
          </label>
        </li>
      </ul>
    </div>
  );
};
