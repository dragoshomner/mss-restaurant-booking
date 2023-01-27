import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
import Iconify from 'src/components/iconify/Iconify';
// requests
import { getRestaurantProducts, getRestaurantReview } from "src/requests";
import { useQuery } from 'react-query';
import { ReviewList } from 'src/sections/@dashboard/reviews';
import ReviewAddForm from 'src/sections/@dashboard/reviews/ReviewAddForm';
import { useAuth } from 'src/sections/auth/utils/useAuth';
import { ROLE_USER } from 'src/sections/auth/login/constants';

export default function RestaurantProfilePage() {
    const navigate = useNavigate();
    const { id: restaurantId } = useParams();
    const { authUser } = useAuth();
    
    const { data: products, isLoading: isLoadingProducts } = useQuery(
        ["get-restaurant-products", restaurantId], 
        () => getRestaurantProducts(restaurantId)
    );
    const { data: reviewData, isLoading: isLoadingReviews } = useQuery(
        ["get-restaurant-reviews", restaurantId],
        () => getRestaurantReview(restaurantId)
    )

    const showReviewForm = authUser.role === ROLE_USER;

    return (
        <>
            <Helmet>
                <title> { products ? products[0].restaurant : "" } </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="start" sx={{ mb: 5 }}>
                    <Iconify icon="material-symbols:arrow-back" mr={1} inline onClick={() => navigate('/dashboard/restaurants')} />
                    <Typography variant="h4">
                        { products && products[0].restaurant }   
                    </Typography>
                </Stack>

                { !isLoadingProducts && <ProductList products={products} restaurantId={restaurantId} /> }

                { !isLoadingReviews && reviewData?.reviewList?.length > 0 && <ReviewList reviewData={reviewData} /> }

                { showReviewForm && <ReviewAddForm restaurantId={restaurantId} mt={2} /> }

            </Container>
        </>
    );
}