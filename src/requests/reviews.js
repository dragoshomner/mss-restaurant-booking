import { getAuthToken, getUserId } from "./utils";

export const getRestaurantReview = async (restaurantId) => {
    return await (await fetch(process.env.REACT_APP_SERVER_URL + "/review/rest/" + restaurantId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    })).json();
}

export const addRestaurantReview = async (restaurantId, body) => {
    return await (await fetch(`${process.env.REACT_APP_SERVER_URL}/review/${getUserId()}/${restaurantId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      method: 'POST',
      body: JSON.stringify(body)
    })).json();
}