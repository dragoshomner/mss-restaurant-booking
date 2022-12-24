import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { RestaurantList } from '../sections/@dashboard/restaurants';
// requests
import { getAllRestaurants } from 'src/requests';
import { useQuery } from 'react-query';

// ----------------------------------------------------------------------

export default function RestaurantsPage() {
  const { data: restaurants, isLoading } = useQuery("get-restaurants", getAllRestaurants);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Helmet>
        <title> Restaurants </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Restaurants
        </Typography>

        <RestaurantList restaurants={restaurants} />
      </Container>
    </>
  );
}
