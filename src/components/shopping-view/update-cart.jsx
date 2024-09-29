import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UpdateCartQuantity({cartItem}) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { cartItems } = useSelector((state) => state.shopCart);
    const { productList } = useSelector((state) => state.shopProducts);

    function handleUpdateQuantity(getCartItem, typeOfAction) {
        if (typeOfAction == "plus") {
          let getCartItems = cartItems.items || [];
    
          if (getCartItems.length) {
            const indexOfCurrentCartItem = getCartItems.findIndex(
              (item) => item.productId === getCartItem?.productId
            );
    
            const getCurrentProductIndex = productList.findIndex(
              (product) => product._id === getCartItem?.productId
            );
            const getTotalStock = productList[getCurrentProductIndex].totalStock;
    
            console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");
    
            if (indexOfCurrentCartItem > -1) {
              const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
              if (getQuantity + 1 > getTotalStock) {
                toast({
                  title: `Only ${getQuantity} quantity can be added for this item`,
                  variant: "destructive",
                });
    
                return;
              }
            }
          }
        }
    
        dispatch(
          updateCartQuantity({
            userId: user?.id,
            productId: getCartItem?.productId,
            quantity:
              typeOfAction === "plus"
                ? getCartItem?.quantity + 1
                : getCartItem?.quantity - 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: "Cart item is updated successfully",
            });
          }
        });
      }

    function handleCartItemDelete(getCartItem) {
    dispatch(
        deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
        if (data?.payload?.success) {
        toast({
            title: "Cart item is deleted successfully",
        });
        }
    });
    }

    return (
        <div className="flex items-center space-x-4 w-full xl:justify-around">
            <div className="flex-1">
                <div className="flex items-center gap-2 mt-1">
                    <Button
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    size="icon"
                    disabled={cartItem?.quantity === 1}
                    onClick={() => handleUpdateQuantity(cartItem, "minus")}
                    >
                    <Minus className="w-4 h-4" />
                    <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    size="icon"
                    onClick={() => handleUpdateQuantity(cartItem, "plus")}
                    >
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Decrease</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end pe-2">
            <Trash
            onClick={() => handleCartItemDelete(cartItem)}
            className="cursor-pointer mt-1"
            size={20}
            />
        </div>
        </div>
    )
}

export default UpdateCartQuantity
