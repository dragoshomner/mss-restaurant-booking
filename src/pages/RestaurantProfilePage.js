import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

export default function RestaurantProfilePage() {
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title> Restaurant { id } </title>
            </Helmet>
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                Restaurants
                </Typography>

                <ProductList restaurants={PRODUCTS} />
            </Container>
        </>
    )
}