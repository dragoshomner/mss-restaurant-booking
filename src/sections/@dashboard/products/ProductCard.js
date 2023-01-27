import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Stack, CardHeader, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { useCart } from 'src/layouts/dashboard/header/cart/CartProvider';
import { useAuth } from 'src/sections/auth/utils/useAuth';
import { ROLE_USER } from 'src/sections/auth/login/constants';

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
  restaurantId: PropTypes.number
};

export default function ProductCard({ product, restaurantId }) {
  const { productName, price } = product;
  const { changeProductQuantity } = useCart();
  const { authUser } = useAuth();

  const handleAddToCart = () => {
    changeProductQuantity({...product, restaurantId});
  }

  const getCardHeaderActionButton = () => {
    if (authUser.role === ROLE_USER) {
      return (
        <IconButton aria-label="settings" onClick={handleAddToCart}>
          <Iconify icon="ic:round-add-shopping-cart" />
        </IconButton>
      );
    }
    return null;
  }

  return (
    <Card>
      <CardHeader
        action={getCardHeaderActionButton()}
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
