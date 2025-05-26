import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        username: null,
        token: null,
        categories: [],
        favoriteArticles: [],
        followedUsers: [],
        isPublic: false,
    },
};

export const userSlice = createSlice({
    name: "user",

    initialState,
    reducers: {
        addUser: (state, action) => {
            state.value.username = action.payload.username;
            state.value.token = action.payload.token;
            state.value.categories = action.payload.categories;
            state.value.favoriteArticles = action.payload.favoriteArticles;
            state.value.followedUsers = action.payload.followedUsers;
            state.value.isPublic = action.payload.isPublic;
        },
        logout: (state, action) => {
            state.value.username = null;
            state.value.token = null;
            state.value.categories = [];
            state.value.favoriteArticles = [];
            state.value.followedUsers = [];
            state.value.isPublic = false;
        },
    },
});

export const { addUser, logout } = userSlice.actions;
export default userSlice.reducer;
