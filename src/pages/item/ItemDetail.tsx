import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCartStore,
  useNewItemStore,
  useModalStore,
} from "../../zustand/store";
import { IItemSingleState } from "../../zustand/Interface";
import Modal from "../../components/Modal";
interface ItemDetailProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { openModal, modalOpenStatus, modalProps } = useModalStore();
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const { data, isLoading } = useQuery<ItemDetailProps>({
    queryKey: "singleItem",
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (response.status === 404) {
        return null;
      } else return response.json();
    },
  });

  const { addItem } = useCartStore();
  const { uploadItem } = useNewItemStore();
  const addCartItem = () => {
    const item: IItemSingleState = {
      id: Number(id),
      name: data?.title,
      count: Number(count),
      price: data?.price,
      thumbnail: data?.thumbnail,
    };
    addItem(item);
    alert("Added to Cart");
  };
  const changeImg = (idx: number) => {
    setCurrentImg(idx);
  };
  const decrement = () => {
    setCount((prev) => (prev === 0 ? prev : prev - 1));
  };
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    if (modalProps?.content) {
      setCount(Number(modalProps.content));
    }
  }, [modalProps?.content]);

  if (isLoading) return <h2 className="text-3xl">Loading...</h2>;
  if (!data && !uploadItem) {
    navigate("/item");
  }

  return (
    <>
      {data ? (
        <div className={"px-4 py-4"}>
          <div className={"mb-8 flex space-x-8"}>
            <div className="relative w-1/2 flex space-x-2">
              <ul className={`${data ? "w-10" : "w-1"}`}>
                {data?.images &&
                  data?.images.map((img, idx) => {
                    return (
                      <div
                        key={idx}
                        className="aspect-square mb-2 cursor-pointer"
                        onMouseOver={() => changeImg(idx)}
                      >
                        <img
                          alt="product"
                          src={img}
                          className="object-cover h-full hover:rounded-lg"
                        />
                      </div>
                    );
                  })}
              </ul>
              <div className="w-4/5">
                <img
                  src={data?.images && data?.images[currentImg]}
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
              <p className={"text-3xl mt-3 text-gray-700 block"}>
                {data?.title}
              </p>
              <p className={"text-3xl mt-3 text-gray-500 block"}>
                Price {data?.price}
              </p>
              <p className={"text-base my-6 text-gray-700"}>
                {data?.description}
              </p>
              <div className="flex justify-between">
                <div className="w-fit px-5 rounded-lg py-1 mb-4 space-x-4 text-xl bg-sky-100">
                  <span className="cursor-pointer" onClick={decrement}>
                    -
                  </span>
                  <button
                    onClick={() =>
                      openModal({
                        modalProps: {
                          title: "Update Quantity",
                          content: count,
                        },
                      })
                    }
                  >
                    {count}
                  </button>
                  <span className="cursor-pointer" onClick={increment}>
                    +
                  </span>
                </div>
                <p className="text-lg">
                  <span className="text-gray-600 font-semibold">
                    Total &nbsp;
                  </span>
                  {data?.price * count}
                </p>
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
          {modalOpenStatus && <Modal />}
        </div>
      ) : (
        <div className={"px-4 py-4"}>
          <div className={"mb-8 flex space-x-8"}>
            <div className="relative w-1/2 flex space-x-2">
              <div className="w-full">
                {uploadItem.itemPhoto === "" ||
                undefined ||
                !uploadItem.itemPhoto ? (
                  <div
                    className={
                      "mx-auto text-center flex w-full h-full rounded-lg bg-gray-300"
                    }
                  >
                    <p className="my-auto mx-auto text-3xl font-bole">
                      No Image
                    </p>
                  </div>
                ) : (
                  <img
                    src={uploadItem.itemPhoto}
                    className={"w-full h-full rounded-lg object-cover"}
                    alt="product-thumnail"
                  />
                )}
              </div>
            </div>
            <div className={"mt-5 w-1/2"}>
              <div className="flex justify-between text-center"></div>
              <p className={"text-3xl mt-3 text-gray-700 block"}>
                {uploadItem?.title}
              </p>
              <p className={"text-xl mt-3 text-gray-500 block"}>
                Price {uploadItem?.price}
              </p>
              <p className={"text-base my-6 text-gray-700"}>
                {uploadItem?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetail;
