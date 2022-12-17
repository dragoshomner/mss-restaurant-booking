import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function RestaurantProfilePage() {
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title> Restaurant { id } </title>
            </Helmet>
            Name: { id }
        </>
    )
}