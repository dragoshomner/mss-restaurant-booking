import PropTypes from 'prop-types';
// @mui
import { Card, Link, Typography, Stack } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

RestaurantCard.propTypes = {
  product: PropTypes.object,
};

export default function RestaurantCard({ restaurant }) {
  const { id, name, address, managerName } = restaurant;

  return (
    <Card>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" href={`/dashboard/restaurants/${id}`}>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2">
              <Iconify icon="material-symbols:location-on" color="#BCC3C8" mr={0.5} pt={0.5} inline />
              {address}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ marginTop: 3 }}>
          <Typography variant="body2">
            <Iconify icon="mdi:user-check" color="#BCC3C8" mr={0.5} pt={0.5} inline />
            {managerName}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
