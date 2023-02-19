import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { useToggle } from '../hooks/toggle';
import { IProducts } from '../models/models';

export default function Like({ prop }: { prop: IProducts }) {
  const { isFav, addToFavorite, removeFromFavorite } = useToggle({ prop });

  return (
    <>
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
    </>
  );
}
