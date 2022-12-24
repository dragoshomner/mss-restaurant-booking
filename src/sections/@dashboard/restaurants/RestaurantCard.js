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
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
            >
              <Iconify icon="material-symbols:location-on" color="#BCC3C8" mr={1} inline />
              {address}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">
            <Typography
              component="span"
              variant="body2"
            >
              <Iconify icon="mdi:user-check" color="#BCC3C8" mr={1} inline />
              {managerName}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
