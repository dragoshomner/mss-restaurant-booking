import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Stack, CardHeader, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { useCart } from 'src/layouts/dashboard/header/cart/CartProvider';

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ product }) {
  const { productName, price } = product;
  const { changeProductQuantity } = useCart();

  const handleAddToCart = () => {
    changeProductQuantity(product);
  }

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleAddToCart}>
            <Iconify icon="ic:round-add-shopping-cart" />
          </IconButton>
        }
        title={productName}
        titleTypographyProps={{ variant: 'subtitle2' }}
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="start">
            <Iconify icon="mdi:cash" color="#BCC3C8" mr={1} inline />
            <Typography variant="subtitle1">
                <Typography
                    component="span"
                    variant="body1"
                >
                    {price} RON
                </Typography>
            </Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
