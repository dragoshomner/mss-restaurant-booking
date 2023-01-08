import { Helmet } from "react-helmet-async";
// @mui
import { Stack, Button, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
import PageableTable from "src/components/table/PageableTable";
// requests
import { deleteProduct, getMyProducts } from "src/requests";
import { useQuery, useMutation, useQueryClient } from "react-query";
// modals
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "src/components/dialogs/DialogProvider";
import { PRODUCT_DIALOG_OPERATION } from "src/components/dialogs/AddOrEditProductDialog";
import { useSnackbarContext } from "src/components/snackbar/SnackbarProvider";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "quantity", label: "Quantity", alignRight: false },
  { id: "" },
];

const mapTableContent = (tableContent) =>
  tableContent.map((item) => {
    return {
      ...item,
      id: item.productId,
      name: item.productName,
      price: item.price + " RON",
      quantity: item.quantity + " pcs",
    };
  });

export default function UserPage() {
  const queryClient = useQueryClient();
  const { showModal } = useGlobalModalContext();
  const { showSnackbar } = useSnackbarContext();
  const { data: products, isLoading: isLoadingProducts } = useQuery(
    ["get-my-products"],
    () => getMyProducts()
  );

  const deleteProductMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["get-my-products"]);
      showSnackbar({
        message: "Product was successfully deleted!",
      });
    },
    onError: (error) => {
      showSnackbar({
        type: "error",
        message: error ? error[0] : "There was an error. Please try later.",
      });
    },
  });

  const handleSaveClicked = (snackbarProps) => showSnackbar(snackbarProps);

  const handleNewProductClick = () => {
    showModal(MODAL_TYPES.ADD_OR_EDIT_PRODUCT_MODAL, {
      operation: PRODUCT_DIALOG_OPERATION.ADD,
      handleSaveClicked
    });
  };

  const handleEditButtonClicked = (id) => {
    const product = products.find(product => product.productId === id);
    showModal(MODAL_TYPES.ADD_OR_EDIT_PRODUCT_MODAL, {
      operation: PRODUCT_DIALOG_OPERATION.EDIT,
      handleSaveClicked,
      inputProduct: product
    });
  }

  const handleDeleteButtonClicked = (id) => {
    showModal(MODAL_TYPES.CONFIRM_MODAL, {
      title: "Are you sure you want to delete this product?",
      description: "By deleting this product, you will lose its data.",
      confirmCallback: () => deleteProductMutation.mutate(id)
    });
  }

  return (
    <>
      <Helmet>
        <title> My products </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            My products
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleNewProductClick}
          >
            New Product
          </Button>
        </Stack>

        {!isLoadingProducts && (
          <PageableTable
            tableHead={TABLE_HEAD}
            tableContent={mapTableContent(products)}
            onEditButtonClicked={handleEditButtonClicked}
            onDeleteButtonClicked={handleDeleteButtonClicked}
          />
        )}
      </Container>
    </>
  );
}
