import { configureStore } from "@reduxjs/toolkit";
import { ProductAPI } from "./api/ProductApi";

export const store = configureStore({
    reducer: {
        [ProductAPI.reducerPath]: ProductAPI.reducer
    },
    middleware: (getMiddleware) => getMiddleware().concat(ProductAPI.middleware)
})