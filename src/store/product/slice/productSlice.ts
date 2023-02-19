import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProducts } from '../../../models/models';

const LS_FAV_KEY = 'Enkeym';

interface ProductState<IProducts> {
  favorites: IProducts;
}

const initialState: ProductState<IProducts[]> = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IProducts>) {
      state.favorites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
    removeFavorite(state, action: PayloadAction<IProducts>) {
      state.favorites = state.favorites.filter(
        (f) => f.id !== action.payload.id
      );
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
