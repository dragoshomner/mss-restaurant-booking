export const getAuthToken = () => {
    const authUser = window.localStorage.getItem("auth-user");
    if (authUser) {
        return JSON.parse(authUser).token;
    }
    return "";
}

export const getUserId = () => {
    const authUser = window.localStorage.getItem("auth-user");
    if (authUser) {
        return JSON.parse(authUser).userId;
    }
    return "";
}