import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { RestaurantList } from '../sections/@dashboard/restaurants';
// requests
import { getAllRestaurants, getFavoriteRestaurants } from 'src/requests';
import { useQuery } from 'react-query';
// utils
import { mapFavoriteRestaurantsToRestaurants } from 'src/sections/@dashboard/restaurants/utils';

// ----------------------------------------------------------------------

export default function RestaurantsPage() {
  const { data: restaurants, isLoading: isLoadingRestaurants } = useQuery("get-restaurants", getAllRestaurants);
  const { data: favoriteRestaurants, isLoading: isLoadingFavorites} = 
    useQuery('get-favorite-restaurants', getFavoriteRestaurants);
  const favoriteRestaurantsMapped = mapFavoriteRestaurantsToRestaurants(favoriteRestaurants);
  const favoriteRestaurantIds = favoriteRestaurantsMapped?.map(item => item.id);

  return (
    <>
      <Helmet>
        <title> Restaurants </title>
      </Helmet>

      <Container>
        {
          !isLoadingFavorites && favoriteRestaurants?.length > 0 && (
            <>
              <Typography variant="h4" sx={{ mb: 5 }}>
                Your favorites
              </Typography>
      
              <RestaurantList 
                favoriteRestaurantIds={favoriteRestaurantIds}
                restaurants={favoriteRestaurantsMapped} 
                mb={3} 
              />
            </>
          )
        }
        {
          !isLoadingRestaurants && (
            <>
              <Typography variant="h4" sx={{ mb: 5 }}>
                All restaurants
              </Typography>

              <RestaurantList 
                favoriteRestaurantIds={favoriteRestaurantIds}
                restaurants={restaurants} 
              />
            </>
          )
        }
      </Container>
    </>
  );
}
