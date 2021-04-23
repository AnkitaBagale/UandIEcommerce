import { Link, useLocation } from "react-router-dom";
import { useStateContext } from "../../context";
import { ProductCard } from "./ProductCard";

export const SearchResultPage = () => {
  const query = new URLSearchParams(useLocation().search);

  const searchTerm = query.get("searchTerm");

  const {
    state: { products }
  } = useStateContext();
  const filterdData = products.filter(
    ({ name, category, brand }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm.toLowerCase().includes(name.toLowerCase()) ||
      searchTerm.toLowerCase().includes(brand.toLowerCase()) ||
      searchTerm.toLowerCase().includes(category.toLowerCase())
  );
  const numberOfItems = filterdData.length;
  return (
    <>
      {numberOfItems !== 0 ? (
        <>
          {/* valid keyword search reslt page */}
          <h1 className="text-center h6 page-title">
            Search results for "{searchTerm}"
            <span className="text-light-weight"> - {numberOfItems} items</span>
          </h1>
          <div className="grid-4-column-layout grid-right-of-filter padding-around-1rem">
            {filterdData.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </>
      ) : (
        <>
          {/* Invalid keyword search reslt page */}
          <div className="text-center">
            <h1 className="h6 page-title">
              Oh! No search results for "{searchTerm}"
            </h1>
            <p>Check out other products</p>
            <Link to="/shop" className="btn btn-solid-primary">
              Go to Shop
            </Link>
          </div>
        </>
      )}
    </>
  );
};
