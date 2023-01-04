import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  restaurantId: PropTypes.number
};

export default function ProductList({ products, restaurantId, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products && products.map((product, index) => (
        <Grid key={`product-item-${index}`} item xs={12} sm={6} md={3}>
          <ProductCard product={product} restaurantId={restaurantId} />
        </Grid>
      ))}
    </Grid>
  );
}
