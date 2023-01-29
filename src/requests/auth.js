export const register = async (credentials) => {
    const requestBody = JSON.stringify({
        ...credentials,
        firstName : "User",
        lastName : "Test",
        address : "Str. t, Nr. 1"
    });

    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/register", {
        method: "POST",
        body: requestBody,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        return {
            success: true,
            message: "Your account was successfully created!"
        };
    }

    const responseData = await response.json();

    return {
        success: false,
        message: responseData[0]
    }
};