export const mapFavoriteRestaurantsToRestaurants = (favoriteRestaurants) => {
    if (!favoriteRestaurants) {
        return undefined;
    }
    let restaurantsMap = [];
    for (let favoriteRestaurant of favoriteRestaurants) {
        restaurantsMap.push({
            id: favoriteRestaurant.restaurantId,
            name: favoriteRestaurant.restaurantName,
            managerName: favoriteRestaurant.restaurantManager,
            ...favoriteRestaurant
        })
    }
    return restaurantsMap;
}