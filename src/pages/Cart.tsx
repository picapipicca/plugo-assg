import React from "react";
import {useCartStore} from "../zustand/store";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, clearItem } = useCartStore();

  return (
    <div>
      {items ? (
        <>
          <div className="flex justify-between pr-4 mb-8">
            <h2 className="text-3xl font-bold">Cart</h2>
            <button
              onClick={clearItem}
              className="bg-red-200 h-min p-2 rounded-xl font-bold hover:bg-red-500 hover:text-white"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-4">
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl flex"
                >
                  <Link to={`/item/${item.id}`} className="w-1/6">
                    <img
                      src={item.thumbnail}
                      alt="product"
                      className="object-cover aspect-square rounded-l-xl"
                    />
                  </Link>
                  <div className="w-full py-2 px-6 space-y-2 flex justify-between">
                    <div>
                      <p className="font-bold text-lg">{item.name}</p>
                      <p className="text-gray-500">
                        <span className="text-gray-600 font-bold">
                          Price &nbsp;{" "}
                        </span>{" "}
                        {item.price}
                      </p>
                      <p className="text-gray-500">
                        <span className="text-gray-600 font-bold">
                          Qty &nbsp;
                        </span>{" "}
                        {item.count}
                      </p>
                    </div>
                    <div className="flex items-end -mr-2">
                      <button
                        className="bg-gray-200 h-fit p-2 rounded-xl hover:bg-gray-400 hover:text-white"
                        onClick={() => removeItem(item.id)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h2 className="text-3xl font-bold">Cart is empty.</h2>
      )}
    </div>
  );
};

export default Cart;
