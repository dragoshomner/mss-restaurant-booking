import { getAuthToken } from "./utils";

export const getAllRestaurants = async () => {
    return await (await fetch(process.env.REACT_APP_SERVER_URL + "/restaurants", {
      headers: {
        'Content-Type': 'application/json',

      }
    })).json();
}

export const getRestaurantProducts = async (restaurantId) => {
  return await (await fetch(process.env.REACT_APP_SERVER_URL + "/product/" + restaurantId, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  })).json();
}

