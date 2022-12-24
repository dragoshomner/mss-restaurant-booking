import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Stack } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ product }) {
  const { productName, price } = product;

  return (
    <Card>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
            {productName}
        </Typography>

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
