import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allProducts, product } from "../type/product";

export const ProductAPI = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        getProducts: builder.query<allProducts, void>({
            query: () => '/products',
            providesTags: ['products']

        }),
        addProduct: builder.mutation<product, FormData>({
            query: (formData) => ({
                url: 'products',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['products']
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...product }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: product,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['products']
        }),
    }),
})
export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } = ProductAPI;