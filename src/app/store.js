import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

// Configure Redux store
export const store = configureStore({
    // Combine reducers with the apiSlice reducer
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // Add middleware for handling API requests
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    // Disable Redux DevTools extension
    devTools: false
})

// Setup listeners for automatic query lifecycle management
setupListeners(store.dispatch);