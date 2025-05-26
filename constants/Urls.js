import { useSelector } from "react-redux";

export const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiZDExNzg2MTIyOTdiOTU4N2NlNSIsImlhdCI6MTc0NzgyODMxMCwiZXhwIjoxNzQ5MDM3OTEwfQ.rUCpWVNV5uttkBRmwcIqzmgCGG8zQY9CEm-aBVASnZ8";

export const GetHomeCategories = async (array) => {
    const newArray = array.join(",");
    const response = await fetch(
        `${backendUrl}/categories/home?ids=${newArray}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();

    return data;
};

export const getCategories = async (array) => {
    const newArray = array.join(",");
    const response = await fetch(
        `${backendUrl}/categories/categoriesId?ids=${newArray}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();

    return data;
};

export const getPopulars = async (url) => {
    const response = await fetch(`${backendUrl}/categories/populars`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    return data;
};

export const getFavoritesArticles = async (array) => {
    const newArray = array.join(",");
    const response = await fetch(
        `${backendUrl}/articles/favoritesArticlesId?ids=${newArray}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();

    return data;
};
