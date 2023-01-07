import { getAuthToken } from "./utils";

export const getMyProducts = async (restaurantId) => {
    return await (await fetch(process.env.REACT_APP_SERVER_URL + "/product/my", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    })).json();
  }