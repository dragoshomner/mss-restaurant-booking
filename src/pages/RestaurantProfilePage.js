import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
import Iconify from 'src/components/iconify/Iconify';
// requests
import { getRestaurantProducts } from "src/requests";
import { useQuery } from 'react-query';

export default function RestaurantProfilePage() {
    const navigate = useNavigate();
    const { id: restaurantId } = useParams();
    const { data: products, isLoading } = useQuery(["get-restaurant-products", restaurantId], () => getRestaurantProducts(restaurantId));

    if (isLoading) {
        return <></>;
    }

    return products.length > 0 ? (
        <>
            <Helmet>
                <title> { products[0].restaurant } </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="start" sx={{ mb: 5 }}>
                    <Iconify icon="material-symbols:arrow-back" mr={1} inline onClick={() => navigate('/dashboard/restaurants')} />
                    <Typography variant="h4">
                        { products[0].restaurant }   
                    </Typography>
                </Stack>

                <ProductList products={products} />
            </Container>
        </>
    ) : <></>
}