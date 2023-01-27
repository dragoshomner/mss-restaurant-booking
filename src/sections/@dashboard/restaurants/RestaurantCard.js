import PropTypes from 'prop-types';
// @mui
import { Card, Link, Typography, Stack, IconButton, CardHeader } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
// requests
import { useMutation, useQueryClient } from 'react-query';
import { toggleRestaurantToFavorites } from 'src/requests';
import { useAuth } from 'src/sections/auth/utils/useAuth';
import { ROLE_USER } from 'src/sections/auth/login/constants';

// ----------------------------------------------------------------------

RestaurantCard.propTypes = {
  product: PropTypes.object,
  isFavorite: PropTypes.bool
};

export default function RestaurantCard({ restaurant, isFavorite }) {
  const queryClient = useQueryClient();
  const { authUser } = useAuth();

  const { id, name, address, managerName } = restaurant;
  const favoriteIcon = isFavorite ? "material-symbols:star-rounded" : "material-symbols:star-outline-rounded";

  const favoriteMutation = useMutation({
    mutationFn: () => toggleRestaurantToFavorites(id, isFavorite ? 'DELETE' : 'POST'),
    onSuccess: () => {
        queryClient.invalidateQueries(['get-favorite-restaurants'])
    }
  });

  const handleAddToFavorites = () => {
    favoriteMutation.mutate();
  }

  const getCardHeaderActionButton = () => {
    if (authUser.role === ROLE_USER) {
      return (
          <IconButton aria-label="settings" onClick={handleAddToFavorites}>
            <Iconify icon={favoriteIcon} />
          </IconButton>
      );
    }
    return null;
  }

  return (
    <Card>
      <CardHeader
        action={getCardHeaderActionButton()}
        title={<Link href={`/dashboard/restaurants/${id}`} color="inherit" underline="hover"> {name} </Link>}
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <Stack spacing={2} sx={{ p: 3 }}>
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
