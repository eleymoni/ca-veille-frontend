import { useSelector } from "react-redux";

export const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzM0ZjlmMTYxOTAzZWE2YzNkNjBjYyIsImlhdCI6MTc0ODE5MzE4MywiZXhwIjoxNzQ5NDAyNzgzfQ.nrSCG4zYyy_D5tPs7E7D-QFbOvYdEzgKnE7RgOF18kA";

export const GetHomeCategories = async (user) => {
    const newArray = user.categories.join(",");
    const response = await fetch(
        `${backendUrl}/categories/home?ids=${newArray}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return await response.json();
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
    return await response.json();
};

export const getPopulars = async (url) => {
    const response = await fetch(`${backendUrl}/categories/populars`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return await response.json();
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
    return await response.json();
};

export const createCategory = async (name, color) => {
    const response = await fetch(`${backendUrl}/categories/newCategory`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            color: color,
        }),
    });
    return await response.json();
};

export const createFeed = async (url, categoryId) => {
    const response = await fetch(`${backendUrl}/feeds/create`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: url,
            categoryId: categoryId,
        }),
    });
    return await response.json();
};

export const toggleFavoriteArticle = async (url, articleyId, token) => {
    const response = await fetch(`${backendUrl}/favorites/${articleyId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //     url: url,
        //     categoryId: categoryId,
        // }),
    });
    return await response.json();
};
