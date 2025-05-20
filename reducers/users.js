import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const usersSlice = createSlice({
    name: "users",

    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.value.push(action.payload);
        },
    },
});

export const { addUsers } = usersSlice.actions;
export default usersSlice.reducer;
