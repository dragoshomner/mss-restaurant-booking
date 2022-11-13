import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { RestaurantSort, RestaurantList, RestaurantFilterSidebar } from '../sections/@dashboard/restaurants';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function RestaurantsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Restaurants </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Restaurants
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <RestaurantFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <RestaurantSort />
          </Stack>
        </Stack>

        <RestaurantList restaurants={PRODUCTS} />
      </Container>
    </>
  );
}
