export const makeApiRequest = async (url, method, headers, body) => {
    let response;
    try {
        if (body) {
            response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(body)
            })
        } else {
            response = await fetch(url, {
                method,
                headers,
            });
        }


        if (response.ok || response.status === 204) {
            return await response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};
