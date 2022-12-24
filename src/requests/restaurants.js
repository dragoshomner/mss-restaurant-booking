export const getAllRestaurants = async () => {
    return await (await fetch(process.env.REACT_APP_SERVER_URL + "/restaurants", {
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();
}