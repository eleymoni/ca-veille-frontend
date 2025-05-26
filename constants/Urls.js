export const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

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

export const getCategories = async (user) => {
    const newArray = user.categories.join(",");
    const response = await fetch(
        `${backendUrl}/categories/categoriesId?ids=${newArray}`,
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

export const getPopulars = async (token) => {
    const response = await fetch(`${backendUrl}/categories/populars`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return await response.json();
};

export const getFavoritesArticles = async (user) => {
    const newArray = user.articles.join(",");
    const response = await fetch(
        `${backendUrl}/articles/favoritesArticlesId?ids=${newArray}`,
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

export const createCategory = async (name, color, token) => {
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

export const createFeed = async (url, categoryId, token) => {
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
