import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import RestaurantCard from './RestaurantCard';

// ----------------------------------------------------------------------

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired,
};

export default function RestaurantList({ restaurants, ...other }) {
  return restaurants.length > 0 ? (
    <Grid container spacing={3} {...other}>
      {restaurants.map((restaurant) => (
        <Grid key={restaurant.id} item xs={12} sm={6} md={3}>
          <RestaurantCard restaurant={restaurant} />
        </Grid>
      ))}
    </Grid>
  ) : <></>;
}
