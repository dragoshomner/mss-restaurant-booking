import { Helmet } from "react-helmet-async";
// @mui
import { Stack, Button, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
import PageableTable from "src/components/table/PageableTable";
// requests
import { getMyProducts } from "src/requests";
import { useQuery } from "react-query";
// modals
import {
  MODAL_TYPES,
  useGlobalModalContext,
} from "src/components/dialogs/DialogProvider";
import { PRODUCT_DIALOG_OPERATION } from "src/components/dialogs/AddOrEditProductDialog";

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
      name: item.productName,
      price: item.price + " RON",
      quantity: item.quantity + " pcs",
    };
  });

export default function UserPage() {
  const { showModal } = useGlobalModalContext();
  const { data: products, isLoading: isLoadingProducts } = useQuery(
    ["get-my-products"],
    () => getMyProducts()
  );

  const handleNewProductClick = () => {
    showModal(MODAL_TYPES.ADD_OR_EDIT_PRODUCT_MODAL, {
      operation: PRODUCT_DIALOG_OPERATION.ADD,
    });
  };

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
          />
        )}
      </Container>
    </>
  );
}
