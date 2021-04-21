import { useStateContext } from "../../context";
import { WishlistItemCard } from "./WishlistItemCard";

export const Wishlist = () => {
  const { state } = useStateContext();

  return (
    <>
      <h1 className="text-center h6 page-title">
        My Wishlist{" "}
        <span className="text-light-weight">
          {state.itemsInWishlist.length}items
        </span>
      </h1>
      <div className="grid-4-column-layout padding-around-1rem">
        {state.itemsInWishlist.map(({ productId: product }) => (
          <WishlistItemCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};
