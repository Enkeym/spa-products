import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProducts } from "../../models/models";


type PostsResponse = IProducts[];

export const productApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['product'],
  endpoints: (build) => ({
    getProduct: build.query<PostsResponse, number>({
      query: () => 'products',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'product', id } as const)),
              { type: 'product', id: 'LIST' },
            ]
          : [{ type: 'product', id: 'LIST' }],
    }),
    addProducts: build.mutation<IProducts, Partial<IProducts>>({
      query(body) {
        return {
          url: `products`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'product', id: 'LIST' }],
    }),
    getProducts: build.query<IProducts, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'product', id }],
    }),
    updateProducts: build.mutation<IProducts, Partial<IProducts>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `products/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'product', id }],
    }),
    deleteProducts: build.mutation<IProducts, any>({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'product', id }],
    }),
  }),
});

export const {useGetProductQuery, useGetProductsQuery, useAddProductsMutation, useDeleteProductsMutation } = productApi;