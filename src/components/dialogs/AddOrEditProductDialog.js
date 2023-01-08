import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useGlobalModalContext } from "./DialogProvider";
import { useQueryClient, useMutation } from "react-query";
import { addProduct, editProduct } from "src/requests";

export const PRODUCT_DIALOG_OPERATION = {
  ADD: "ADD",
  EDIT: "EDIT",
};

const DEFAULT_PRODUCT_STATE = {
  name: "",
  price: 0,
  quantity: 0,
};

export default function AddOrEditProductDialog() {
  const queryClient = useQueryClient();
  const [product, setProduct] = React.useState(DEFAULT_PRODUCT_STATE);

  const { hideModal, store } = useGlobalModalContext();
  const { modalProps } = store || {};
  const { operation, handleSaveClicked, inputProduct } = modalProps || {};

  React.useEffect(() => {
    setProduct(
      inputProduct
        ? {
            ...inputProduct,
            name: inputProduct.productName,
          }
        : DEFAULT_PRODUCT_STATE
    );
  }, [inputProduct]);

  const handleClose = () => hideModal();

  const handleSave = () => {
    formMutation.mutate();
  };

  const formMutation = useMutation({
    mutationFn: () =>
      operation === PRODUCT_DIALOG_OPERATION.ADD
        ? addProduct(product)
        : editProduct(product.productId, product),
    onSuccess: () => {
      queryClient.invalidateQueries(["get-my-products"]);
      handleSaveClicked({
        message: "Product was successfully saved!",
      });
      handleClose();
    },
    onError: (error) => {
      handleSaveClicked({
        type: "error",
        message: error ? error[0] : "There was an error. Please try later.",
      });
    },
  });

  const isSaveButtonDisabled = Object.values(product).some((item) =>
    typeof item === "string" ? item.length === 0 : item === 0
  );

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {operation === PRODUCT_DIALOG_OPERATION.ADD
          ? "Add new product"
          : "Edit product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          sx={{ mt: 2 }}
          fullWidth
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <TextField
          label="Price"
          fullWidth
          sx={{ mt: 2 }}
          InputProps={{
            type: "number",
            endAdornment: <InputAdornment position="start">RON</InputAdornment>,
          }}
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <TextField
          label="Quantity"
          fullWidth
          sx={{ mt: 2 }}
          InputProps={{
            type: "number",
            endAdornment: <InputAdornment position="start">PCS</InputAdornment>,
          }}
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaveButtonDisabled}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
