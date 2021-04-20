import { useStateContext } from "../context";
import { WishlistItemCard } from "./WishlistItemCard";
import { filterDataOnStatus } from "../Product-listing";
export const Wishlist = () => {
  const { state } = useStateContext();
  const dataToMap = filterDataOnStatus(state.itemsInWishlist);
  console.log("wishlist", state.itemsInWishlist);
  return (
    <>
      <h1 className="text-center h6 page-title">
        My Wishlist{" "}
        <span className="text-light-weight">{dataToMap.length}items</span>
      </h1>
      <div className="grid-4-column-layout padding-around-1rem">
        {dataToMap.map(({ productId: product }) => (
          <WishlistItemCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};
