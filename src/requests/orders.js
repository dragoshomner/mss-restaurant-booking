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

export const getMyOrders = async () => {
  return await (
    await fetch(process.env.REACT_APP_SERVER_URL + "/order/allUser/" + getUserId(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
  ).json();
};

export const getAllOrders = async () => {
  return await (
    await fetch(process.env.REACT_APP_SERVER_URL + "/order/allOrders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
  ).json();
};

export const getAllOrdersForRestaurant = async () => {
  return await (
    await fetch(process.env.REACT_APP_SERVER_URL + "/order/allRest/" + getUserId(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
  ).json();
};

export const getOrdersForDelivery = async () => {
  return await (
    await fetch(process.env.REACT_APP_SERVER_URL + "/order/forDelivery", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
  ).json();
};

export const changeOrderStatus = async (orderId) => {
  const response = await fetch(process.env.REACT_APP_SERVER_URL + "/order/edit/" + orderId + "/" + getUserId(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: "PUT",
  });

  const responseData = await response.json();

  if (!response.ok) {
    return Promise.reject(responseData);
  }

  return responseData;
};