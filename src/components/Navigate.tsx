import { Link } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';

export default function Navigate() {
  return (
    <nav className='bg-gray-400 shadow-md flex justify-between items-center h-[50px]'>
      <Link to='/'>
        <h3 className='pl-5 text-2xl font-bold text-white uppercase'>Spa</h3>
      </Link>
      <div>
        <Link to='/favorites'>
          <button className='pr-5'>
            <MdFavorite className='text-3xl text-white' />
          </button>
        </Link>
      </div>
    </nav>
  );
}
