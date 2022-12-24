import * as React from 'react';
// mui
import { TextField, Grid, Typography, Rating, Button, Snackbar, Alert } from "@mui/material";
import { Stack } from '@mui/system';
import { useMutation, useQueryClient } from 'react-query';
import { addRestaurantReview } from 'src/requests';

const defaultFormState = {
    rating: 5,
    reviewText: ""
};

export default function ReviewAddForm({ restaurantId, ...other }) {
    const queryClient = useQueryClient();
    const [formBody, setFormBody] = React.useState(defaultFormState);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const formMutation = useMutation({
        mutationFn: () => addRestaurantReview(restaurantId, formBody),
        onSuccess: () => {
            queryClient.invalidateQueries(['get-restaurant-reviews', restaurantId])
        }
    });

    const onReviewSubmit = () => {
        formMutation.mutate();
        setFormBody(defaultFormState);
        setSnackBarOpen(true);
    }

    const handleSnackBoxClose = () => setSnackBarOpen(false);

    return (
        <Grid container mt={3} {...other}>
            <Typography variant="h5" mb={2}>Share your opinion</Typography>
            <Grid container mb={2}>
                <Rating
                    name="simple-controlled"
                    value={formBody.rating}
                    onChange={(_, newValue) => {
                        setFormBody({...formBody, rating: newValue});
                    }}
                />
            </Grid>
            <TextField 
                id="add-review-input" 
                label="Review text" 
                variant="outlined" 
                value={formBody.reviewText}
                onChange={(e) => setFormBody({...formBody, reviewText: e.target.value})}
                fullWidth
            />
            <Stack direction="row" mt={2}>
                <Button 
                    variant="contained" 
                    disabled={formMutation.isLoading}
                    onClick={onReviewSubmit}
                >
                    Submit
                </Button>
            </Stack>
            <Snackbar open={snackBarOpen} autoHideDuration={1500} onClose={handleSnackBoxClose}>
                <Alert severity="success" sx={{ width: '100%' }} onClose={handleSnackBoxClose}>
                    Your review was successfully added!
                </Alert>
            </Snackbar>
        </Grid>
    );
}