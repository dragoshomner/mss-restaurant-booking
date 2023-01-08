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

export const editProduct = async (id, product) => {
  const response = await fetch(process.env.REACT_APP_SERVER_URL + "/product/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: "PUT",
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    return Promise.reject();
  }

  return Promise.resolve();
};

export const deleteProduct = async (id) => {
  const response = await fetch(process.env.REACT_APP_SERVER_URL + "/product/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: "DELETE"
  });

  if (!response.ok) {
    return Promise.reject();
  }

  return Promise.resolve();
};