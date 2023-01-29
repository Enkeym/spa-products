import React, { useState } from 'react';
import { IProducts } from '../models/models';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useActions } from './../hooks/actions';
import { useAppSelector } from './../hooks/redux';
import { useDeleteProductsMutation } from '../store/product/productApi';

export default function Product({ prop }: { prop: IProducts }) {
  const { favorites } = useAppSelector((state) => state.favorite);
  const [deleteProducts] = useDeleteProductsMutation();

  const [details, setDetails] = useState(false);
  const { addFavorite, removeFavorite } = useActions();
  const [isFav, setIsFav] = useState(favorites.includes(prop));

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    addFavorite(prop);
    setIsFav(true);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    removeFavorite(prop);
    setIsFav(false);
  };

  const deleteItems = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteProducts(prop.id).unwrap()
  };
  

  return (
    <div className='relative flex flex-col text-center items-center mb-2 py-2 px-2 border-2 border-gray-300 shadow-md'>
      <h1 className='font-bold'>{prop.title}</h1>
      <p className='font-medium'>{prop.category}</p>
      <span className='font-medium text-green-500 py-2'>{prop.price}$</span>
      <img className='w-1/2' src={prop.image} alt={prop.title} />
      <button
        className='border my-4 px-2 py-2 bg-blue-400'
        onClick={() => setDetails((prev) => !prev)}
      >
        {details ? 'Hide Detail' : 'Show Detail'}
      </button>
      {details && (
        <div className='text-left w-3/4'>
          <p>{prop.description}</p>
          <p>
            Rate: <span className='font-semibold'>{prop.rating.rate}</span>
          </p>
        </div>
      )}

      {!isFav && (
        <button
          onClick={addToFavorite}
          className='absolute bottom-5 right-5 text-5xl'
        >
          <FcLikePlaceholder />
        </button>
      )}

      {isFav && (
        <button
          onClick={removeFromFavorite}
          className='absolute bottom-5 right-5 text-5xl'
        >
          <FcLike />
        </button>
      )}

      <button onClick={deleteItems} className='absolute bottom-5 left-5'>
        <RiDeleteBinLine className='text-4xl text-gray-400' />
      </button>
    </div>
  );
}
