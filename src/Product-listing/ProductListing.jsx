import { useStateContext } from "../context";
import { getSortedData, getFilteredData, Filter } from "./DataFilter";
import "./styles.css";
import { ProductCard } from "./ProductCard";

export const ProductListing = () => {
  const { state } = useStateContext();
  const sortedData = getSortedData(state, state.products);
  const filterdData = getFilteredData(state, sortedData);

  return (
    <>
      <h1 className="text-center h6 page-title">
        Accessories for Sketching{" "}
        <span className="text-light-weight"> - {filterdData.length} items</span>
      </h1>
      <div className="display-flex-filter">
        <div className="grid-left-filter">
          <Filter />
        </div>
        <div className="grid-4-column-layout grid-right-of-filter padding-around-1rem">
          {filterdData.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};
