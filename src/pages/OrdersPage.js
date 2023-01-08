import { Helmet } from "react-helmet-async";
// @mui
import { Stack, Button, Container, Typography } from "@mui/material";
// components
import PageableTable from "src/components/table/PageableTable";
// requests
import { deleteProduct, getMyOrders } from "src/requests";
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
  { id: "name", label: "Products", alignRight: false },
  { id: "totalPrice", label: "Total Price", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "restaurantName", label: "Restaurant Name", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
];

const mapTableContent = (tableContent) =>
  tableContent.map((item) => {
    return {
      ...item,
      id: item.orderId,
      name: item.productList.join('<br/>'),
      totalPrice: item.totalPrice + " RON",
      quantity: item.quantity + " pcs",
    };
  });

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const { showModal } = useGlobalModalContext();
  const { showSnackbar } = useSnackbarContext();
  const { data: products, isLoading: isLoadingProducts } = useQuery(
    ["get-my-orders"],
    () => getMyOrders()
  );

  const deleteProductMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["get-my-orders"]);
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
        <title> My orders </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            My orders
          </Typography>
        </Stack>

        {!isLoadingProducts && (
          <PageableTable
            tableHead={TABLE_HEAD}
            tableContent={mapTableContent(products)}
            onEditButtonClicked={handleEditButtonClicked}
            onDeleteButtonClicked={handleDeleteButtonClicked}
            searchPlaceholder="Search orders..."
          />
        )}
      </Container>
    </>
  );
}
