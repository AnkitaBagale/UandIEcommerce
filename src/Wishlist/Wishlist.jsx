import { useStateContext } from "../context";
import { WishlistItemCard } from "./WishlistItem-card";
import { filterDataOnStatus } from "../Product-listing";
export const Wishlist = () => {
  const { state } = useStateContext();
  const dataToMap = filterDataOnStatus(state.itemsInWishlist);
  return (
    <>
      <h1 className="text-center h6 page-title">
        My Wishlist{" "}
        <span className="text-light-weight">{dataToMap.length}items</span>
      </h1>
      <div className="grid-4-column-layout">
        {dataToMap.map((product) => (
          <WishlistItemCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
