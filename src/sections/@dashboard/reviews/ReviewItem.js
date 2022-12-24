import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function ReviewItem({ review }) {
    const { rating, reviewText, userName } = review;

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={userName} src="/" />
            </ListItemAvatar>
            <ListItemText
                primary={`${rating} / 5`}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {userName}
                        </Typography>
                        {` — ${reviewText}`}
                    </React.Fragment>
            }
            />
        </ListItem>
    );
}