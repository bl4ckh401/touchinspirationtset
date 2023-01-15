// toasterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toaster: 'Toaster Should Display',
    toasterVisible: true,
};

const toasterSlice = createSlice({
    name: 'toaster',
    initialState,
    reducers: {
        setToaster: (state, action) => {
            state.toaster = action.payload;
        },
        setToasterVisibility: (state, action) => {
            state.toasterVisible = action.payload;
        },
    },
});

export const { setToaster, setToasterVisibility } = toasterSlice.actions;

export default toasterSlice.reducer;
