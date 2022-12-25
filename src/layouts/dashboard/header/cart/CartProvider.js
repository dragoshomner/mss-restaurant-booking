import * as React from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { useGlobalModalContext } from 'src/components/dialogs/DialogProvider';
import { MODAL_TYPES } from 'src/components/dialogs/DialogProvider';

const defaultCart = {
    restaurant: undefined,
    products: []
};

const CartContext = React.createContext(defaultCart);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useLocalStorage("cart", defaultCart);
    const { showModal } = useGlobalModalContext();
  
    const handleChangeProductQuantity = (product, quantity = 1) => {
        const changeCart = prevState => {
            let productExisted = false;
            let newProductsState = prevState.products.map(obj => {
                if (obj.productName === product.productName) {
                    productExisted = true;
                    return {...obj, quantity: (obj.quantity ?? 0) + quantity};
                }
                return obj;
            }).filter(obj => obj.quantity > 0);

            if (!productExisted) {
                newProductsState.push({
                    ...product,
                    quantity
                });
            }

            return {
                ...prevState,
                restaurant: prevState.restaurant || product.restaurant,
                products: newProductsState
            };
        };

        const initializeCart = () => {
            setCart({
                ...cart, 
                restaurant: product.restaurant,
                products: [{...product, quantity}]
            })
        }
        
        if (cart.restaurant && cart.restaurant !== product.restaurant) {
            showModal(MODAL_TYPES.CONFIRM_MODAL, {
                title: "Are you sure you want to clear the cart?",
                description: "By adding a product from another restaurant, you will lose the current cart.",
                confirmCallback: initializeCart
            });
        } else {
            setCart(changeCart(cart));
        }
    }

    const handleClearCart = () => {
        setCart(defaultCart);
    }

    const value = React.useMemo(() =>  ({
      cart,
      changeProductQuantity: handleChangeProductQuantity,
      clearCart: handleClearCart
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [cart]);
  
    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
};

export const useCart = () => React.useContext(CartContext);