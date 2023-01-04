import { getAuthToken, getUserId } from "./utils";

export const placeOrder = async (address, restaurantId, body) => {
    const url = new URL(`${process.env.REACT_APP_SERVER_URL}/order/add`);
    url.search = new URLSearchParams({ 
        location: address, 
        userId: getUserId(),
        restaurantId
    }).toString();

    const response = await fetch(url.href, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      method: 'POST',
      body: JSON.stringify(body)
    });
    const responseData = await response.json();

    if (!response.ok) {
        return Promise.reject(responseData);
    }
    
    return responseData;
}