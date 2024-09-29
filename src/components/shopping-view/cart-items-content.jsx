import UpdateCartQuantity from "./update-cart";

function UserCartItemsContent({ cartItem }) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between pb-1">
          <h3 className="font-extrabold">{cartItem?.title}</h3>        
          <p className="font-semibold">
            $
            {(
                (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
                cartItem?.quantity
            ).toFixed(2)}
          </p>
        </div>
        <UpdateCartQuantity cartItem={cartItem} />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
