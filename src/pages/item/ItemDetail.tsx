import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useCartStore, { ItemSingleState } from "../../zustand/store";

interface ItemDetailProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ItemDetail = () => {
  const { id } = useParams();
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [selected, setSelected] = useState<string>("");
  const { data, isLoading } = useQuery<ItemDetailProps>("singleItem", () =>
    fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json())
  );
  const { items, addItem } = useCartStore();

  const addCartItem = () => {
    const item: ItemSingleState = {
      id: Number(id),
      name: data?.title,
      count: Number(selected),
      price: data?.price,
      thumbnail: data?.thumbnail,
    };
    addItem(item);
    alert("Added to Cart");
  };
  const changeImg = (idx: number) => {
    setCurrentImg(idx);
  };

  if (isLoading) return <h2>Loading...</h2>;
  console.log("::::::::items::::::", items);

  return (
    <div>
      <div className={"px-4 py-4"}>
        <div className={"mb-8 flex space-x-8"}>
          <div className="relative w-1/2 flex space-x-2">
            <ul className="w-12">
              {data?.images.map((img, idx) => {
                return (
                  <div
                    key={idx}
                    className="aspect-square mb-2 cursor-pointer"
                    onMouseOver={() => changeImg(idx)}
                  >
                    <img
                      alt="상품이미지"
                      src={img}
                      className="object-cover h-full hover:rounded-lg"
                    />
                  </div>
                );
              })}
            </ul>
            <div className="w-4/5">
              <img
                src={data?.images[currentImg]}
                className={"w-full h-full rounded-lg object-cover"}
                alt="product-thumnail"
              />
            </div>
          </div>

          <div className={"mt-5 w-1/2"}>
            <div className="flex justify-between text-center">
              <h1 className={"text-3xl font-bold text-gray-900"}>
                {data?.brand}
              </h1>
              <p className="inline-block w-fit px-2 bg-black text-white leading-8">
                {data?.stock} in stock
              </p>
            </div>
            <p className={"text-3xl mt-3 text-gray-700 block"}>{data?.title}</p>
            <p className={"text-3xl mt-3 text-gray-500 block"}>
              Price {data?.price}
            </p>
            <p className={"text-base my-6 text-gray-700"}>
              {data?.description}
            </p>
            <div className="w-full mb-4">
              <select
                className="w-full h-10 bg-sky-50 border border-gray-100 px-2"
                onChange={(e) => setSelected(e.target.value)}
                value={selected}
              >
                {[1, 2, 3, 4, 5].map((num) => {
                  return (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={"flex items-center justify-between space-x-2"}>
              <button
                onClick={addCartItem}
                className={
                  "flex-1 bg-gray-600 text-white py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gary-500 hover:bg-gray-700"
                }
              >
                Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
