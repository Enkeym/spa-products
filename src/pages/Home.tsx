import { useGetProductQuery } from '../store/product/productApi';
import Product from './../components/Product';
import Modal from './../components/Modal';
import CreateProduct from '../components/CreateProduct';
import { useContext, useEffect, useState } from 'react';
import { IProducts } from '../models/models';
import { ModalContext } from './../context/ModalContext';
import { IoAddCircleOutline } from 'react-icons/io5';

const Home = () => {
  const { modal, open, close } = useContext(ModalContext);
  const createHandler = (product: IProducts) => {
    close();
  };

  const [page, setPage] = useState(1);
  const { data: products, isLoading, isError, isFetching } = useGetProductQuery(page);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  

  return (
    <div className='container mx-auto max-w-lg py-10'>
      {isLoading && (
        <p className='pt-2 text-green-600 text-center'>...Loading</p>
      )}
      {isError && <p className='pt-2 text-red-600 text-center'>Error!!!</p>}
      {products?.map((items) => (
        <Product key={items.id} prop={items} />
      ))}
      {modal && (
        <Modal onClose={close} title='Create new product'>
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}
      <button onClick={open} className='fixed bottom-5 right-5'>
        <IoAddCircleOutline className='text-gray-400 text-6xl' />
      </button>
    </div>
  );
};

export default Home;
