import { getAuthToken, getUserId } from "./utils";

export const getFavoriteRestaurants = async () => {
    return await (await fetch(`${process.env.REACT_APP_SERVER_URL}/favourites/${getUserId()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    })).json();
}

export const toggleRestaurantToFavorites = async (restaurantId, operation) => {
    return await (await fetch(`${process.env.REACT_APP_SERVER_URL}/favourites/${getUserId()}/${restaurantId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      method: operation
    }));
}