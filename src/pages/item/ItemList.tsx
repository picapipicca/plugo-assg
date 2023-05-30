import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";

const ItemList = () => {
  const location = useLocation();
  const { isLoading, data } = useQuery("item", () =>
    fetch("https://dummyjson.com/products").then((res) => res.json())
  );
  const title = location.pathname.split("/")[1] === "item" ? "All Product" : "";
  
  if (isLoading) return <h2 className="text-3xl font-bold">Loading...</h2>;

  return (
    <>
      <h2 className="text-3xl mb-8">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full">
        {data.products.map((item: any) => (
          <div key={item.id} className="">
            <Link to={`/item/${item.id}`}>
              <div className="mb-4">
                <img
                  className="object-fill aspect-square"
                  src={item.thumbnail}
                  alt="product-thumnail"
                />
              </div>
              <h2 className="text-lg font-bold ">{item.title}</h2>
              <h3 className="font-medium text-gray-600">
                <span className="text-gray-700">Price &nbsp;</span> {item.price}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemList;
