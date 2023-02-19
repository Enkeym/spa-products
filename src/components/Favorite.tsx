import React from "react";
import { useAppSelector } from "./../hooks/redux";
import Product from "./Product";

export default function Favorite() {
  const { favorites } = useAppSelector(state => state.product);

  if(favorites.length === 0) return <p className="pt-2 text-center text-green-500" >No favorites!</p>
  

  return (
    <div className="container mx-auto max-w-lg py-10">
        {favorites.map(prop => (
          <Product key={prop.id}  prop={prop} />
        ))}
    </div>
  );
}
