import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProducts } from '../../models/models';

export const productApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['product'],
  endpoints: (build) => ({
    getProduct: build.query<IProducts[], any>({
      query: (page) => `products?_limit=5&_page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, page) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'product' as const, id })),
              { type: 'product', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'product', id: 'PARTIAL-LIST' }],
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

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useAddProductsMutation,
  useDeleteProductsMutation,
} = productApi;
