import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const ItemList = () => {
  const { isLoading, error, data } = useQuery("item", () =>
    fetch("https://dummyjson.com/products").then((res) => res.json())
  );

  if (isLoading) return <h2>Loading...</h2>;
  
  //   if (error) return "An error has occurred: " + error.message;

 //   TODO : layout grid
  return (
    <>
      <h2 className="text-3xl">All</h2>
      <div className="grid grid-flow-col auto-cols-auto auto-rows-auto shrink w-full border border-red-500 gap-8">
        {data.products.map((item: any) => (
          <div
            key={item.id}
            className="w-[20vw] mx-auto border border-blue-500"
          >
            <Link to={`/item/${item.id}`}>
              <div className="border border-emerald-600">
                <img
                  className="object-fill aspect-square"
                  src={item.thumbnail}
                  alt="product-thumnail"
                />
              </div>
              <h2>{item.title}</h2>
              <div className="flex justify-between ">
                <h3>price : {item.price}</h3>
                <button>Add</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemList;
