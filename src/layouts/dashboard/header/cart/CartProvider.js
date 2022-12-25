import * as React from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

const defaultCart = {
    restaurantId: undefined,
    products: []
};

const CartContext = React.createContext(defaultCart);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useLocalStorage("cart", defaultCart);
  
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
                products: newProductsState
            };
        };
        setCart(changeCart(cart));
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