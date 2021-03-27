import { useStateContext } from "../context";
import { getSortedData, getFilteredData, Filter } from "./Data-filter";
import "./filter-section.css";
import { ProductCard } from "./Product-card";

export const ProductListing = () => {
  const { state } = useStateContext();
  const sortedData = getSortedData(state, state.products);
  const filterdData = getFilteredData(state, sortedData);
  return (
    <>
      <h1 className="text-center h6 page-title">
        Accessories for Sketching{" "}
        <span className="text-light-weight">
          {" "}
          - {state.products.length} items
        </span>
      </h1>
      <div className="display-flex padding-around-1rem">
        <div className="grid-left-filter">
          <Filter />
        </div>
        <div className="grid-4-column-layout grid-right-of-filter">
          {filterdData.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};
