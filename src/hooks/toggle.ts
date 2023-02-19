import { useState } from 'react';
import { IProducts } from '../models/models';
import { useActions } from './actions';
import { useAppSelector } from './redux';

export const useToggle = ({ prop }: { prop: IProducts }) => {
  const { favorites } = useAppSelector((state) => state.product);
  const [isFav, setIsFav] = useState(favorites.includes(prop));
  const { addFavorite, removeFavorite } = useActions();
  

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    addFavorite(prop);
    setIsFav(true);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    removeFavorite(prop);
    setIsFav(false);
  };



  return {
    isFav,
    addFavorite,
    addToFavorite,
    removeFavorite,
    removeFromFavorite,
    favorites,
  };
};
