import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useMutation } from "react-query";
import OrderTable from "src/sections/@dashboard/orders/OrderTable";
// mui
import { Container } from "@mui/system";
import { Typography, Stack, TextField, Button } from "@mui/material";
// hooks
import { useCart } from "src/layouts/dashboard/header/cart/CartProvider";
// requests
import { placeOrder } from "src/requests";
import { useSnackbarContext } from "src/components/snackbar/SnackbarProvider";
import { useGlobalModalContext } from "src/components/dialogs/DialogProvider";
import { MODAL_TYPES } from 'src/components/dialogs/DialogProvider';
import { useNavigate } from "react-router-dom";

const convertCartToRequestProducts = (cartProducts) =>
  cartProducts.map((item) => ({
    product: item.productName,
    quantity: item.quantity,
  }));

export default function PlaceOrderPage() {
  const { cart, clearCart } = useCart();
  const { showSnackbar } = useSnackbarContext();
  const { showModal } = useGlobalModalContext();
  const navigate = useNavigate();
  const [address, setAddress] = React.useState("");

  const placeOrderMutation = useMutation({
    mutationFn: () =>
      placeOrder(
        address,
        cart.products[0].restaurantId,
        convertCartToRequestProducts(cart.products)
      ),
    onSuccess: (response) => {
      console.log("Success", response);
      showModal(MODAL_TYPES.CONFIRM_MODAL, {
        title: "Your order was placed!",
        description: "Your favorite restaurant is preparing your meal right now. Bon appetit!",
        confirmCallback: handleOrderPlaced,
        hideCancelButton: true,
    });
    },
    onError: (response) => {
      showSnackbar({
        type: "error",
        message: response.length > 0 ? response[0] : response
      })
      console.log("Error", response);
    },
  });

  const handlePlaceOrder = () => {
    placeOrderMutation.mutate();
  };

  const handleOrderPlaced = () => {
    clearCart();
    navigate('/dashboard/orders', { replace: true });
  }

  return (
    <>
      <Helmet>
        <title> Place order </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Place your order
          </Typography>
        </Stack>
        <OrderTable products={cart.products} />
        <TextField
          id="address-field"
          label="Your address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Stack direction="row" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            sx={{ paddingInline: 4 }}
            disabled={!address.length}
            onClick={handlePlaceOrder}
          >
            Place order
          </Button>
        </Stack>
      </Container>
    </>
  );
}
