import { getAuthToken } from "./utils";

export const getMyProducts = async (restaurantId) => {
  return await (
    await fetch(process.env.REACT_APP_SERVER_URL + "/product/my", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
  ).json();
};

export const addProduct = async (product) => {
  const response = await fetch(process.env.REACT_APP_SERVER_URL + "/product", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: "POST",
    body: JSON.stringify(product),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return Promise.reject(responseData);
  }

  return responseData;
};
