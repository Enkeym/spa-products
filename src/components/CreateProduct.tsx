import { useState } from 'react';
import { IProducts } from '../models/models';
import { useAddProductsMutation } from '../store/product/productApi';

interface CreateProductProps {
  onCreate: (product: IProducts) => void;
}

export default function CreateProduct({ onCreate }: CreateProductProps) {
  const [text, setText] = useState('');
  const [addProduct] = useAddProductsMutation();

  const productData: IProducts = {
    title: text,
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
      rate: 42,
      count: 10,
    },
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await addProduct(productData).unwrap();
    setText('');
    onCreate(response);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        className='border py-2 px-4 mb-2 w-full outline-none focus:placeholder-gray-500'
        placeholder='Enter product title...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button type='submit' className='py-2 px-4 border bg-yellow-400'>
        Create
      </button>
    </form>
  );
}
