import { useGetProductQuery } from '../store/product/productApi';
import Product from './../components/Product';
import Modal from './../components/Modal';
import CreateProduct from '../components/CreateProduct';
import { useContext } from 'react';
import { IProducts } from '../models/models';
import { ModalContext } from './../context/ModalContext';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams<{ id: any }>();

  const { data: products, isLoading, isError } = useGetProductQuery(id);


  const { modal, open, close } = useContext(ModalContext);

  const createHandler = (product: IProducts) => {
    close();
  };

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
