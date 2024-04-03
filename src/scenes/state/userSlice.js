import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        role: localStorage.getItem('role') ? localStorage.getItem('role') : 'Public'
    },
    reducers: {
        'setCurrent': (state, action) => {
            state.current = action.payload;
        },
        'setToken': (state, action) => {
            state.token = action.payload;
        },
        'setRole': (state, action) => {
            state.role = action.payload;
        }
    }
})

export const { setCurrent, setToken, setRole } = userSlice.actions;
export default userSlice.reducer;