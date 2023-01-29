import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productApi } from './product/productApi';
import { productReducer } from './product/productSlice';



export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    favorite: productReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>