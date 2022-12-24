import PropTypes from 'prop-types';
// @mui
import { Grid, Typography, List, Divider, Chip } from '@mui/material';
// components
import ReviewItem from './ReviewItem';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

ReviewList.propTypes = {
    reviewData: PropTypes.object.isRequired,
};

export default function ReviewList({ reviewData, ...other }) {
    const reviews = reviewData?.reviewList;

    return reviews && (
        <Grid container mt={3} {...other}>
            <Typography variant='h5' mb={2} mr={2}> Reviews </Typography>
            <Chip icon={<Iconify icon="material-symbols:star-rounded" pb='3px' inline />} label={reviewData.totalRating} />
            <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
                {reviews.map((review, index) => (
                    <div key={`review-item-${index}`}>
                        <ReviewItem review={review} />
                        { index < reviews.length  - 1 && <Divider variant="inset" component="li" /> }
                    </div>
                ))}
            </List>
        </Grid>    
    );
}
