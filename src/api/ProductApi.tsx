import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allProducts } from "../type/product";

export const ProductAPI = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['products'],
    endpoints: (builder) => (
        {
            getProducts: builder.query<allProducts, void>(
                {
                    query: () => '/products',
                    providesTags: ['products']
                }
            )
        }
    )

})
export const { useGetProductsQuery } = ProductAPI;