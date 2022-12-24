export const getAuthUser = () => {
    const authUser = window.localStorage.getItem("auth-user");
    if (authUser) {
        return JSON.parse(authUser);
    }
    return {};
}

export const getAuthToken = () => getAuthUser()?.token ?? "";

export const getUserId = () => getAuthUser().userId ?? "";