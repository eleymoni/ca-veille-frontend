export const backendUrl = "http://192.168.0.75:3000";

export const getCategories = async (url, array) => {
    const token =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiZDExNzg2MTIyOTdiOTU4N2NlNSIsImlhdCI6MTc0NzgyODMxMCwiZXhwIjoxNzQ5MDM3OTEwfQ.rUCpWVNV5uttkBRmwcIqzmgCGG8zQY9CEm-aBVASnZ8";
    const newArray = array.join(",");
    const response = await fetch(
        `${backendUrl}/categories/${url}?ids=${newArray}`,
        {
            method: "GET",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();

    return data;
};
