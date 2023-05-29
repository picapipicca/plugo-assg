import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useNewItemStore } from "../zustand/store";
interface newItemProps {
  title: string;
  price: number;
  description: string;
  itemPreview?: string;
}
const Admin = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [itemPhoto, setItemPhoto] = useState<FileList | null>();
  const [itemPreview, setItemPreview] = useState("");

  const uploadItemQuery = async ({
    title,
    price,
    description,
    itemPreview,
  }: newItemProps) => {
    const data = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price,
        description,
        itemPreview,
      }),
    }).then((res) => res.json());

    return data;
  };

  const { setItem } = useNewItemStore();
  const uploadItem = useMutation(uploadItemQuery, {
    onSuccess: (data) => {
      setItem({
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        itemPhoto: data.itemPreview,
      });
      navigate(`/item/${data.id}`);
    },
  });
  useEffect(() => {
    if (itemPhoto && itemPhoto.length > 0) {
      const file = itemPhoto[0];
      setItemPreview(URL.createObjectURL(file));
    } else if (itemPhoto === null) {
      setItemPreview("");
    }
  }, [itemPhoto]);

  return (
    <>
      <h2 className="text-3xl font-bold">Upload New Product</h2>
      <form className={" space-y-5 pt-10"}>
        <div>
          {itemPreview ? (
            <div>
              <img
                src={itemPreview}
                alt="img preview"
                className={"w-full h-48 rounded-md mb-3 text-gray-600 "}
              />
              <div className="w-full flex justify-end">
                <button
                  className="cursor-pointer mb-3 w-8 h-8 flex justify-center hover:bg-gray-200 hover:rounded-full"
                  onClick={() => setItemPhoto(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <label
              className={
                "cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md mb-3 text-gray-600 hover:text-blue-500 hover:border-blue-500"
              }
            >
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                className={"hidden"}
                onChange={(e) => setItemPhoto(e.target.files)}
              />
            </label>
          )}
        </div>

        <div className="space-y-4">
          <label
            htmlFor={"title"}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            required
            className="px-3 appearance-none w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <label
            htmlFor={"price"}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            onChange={(e) => setPrice(Number(e.target.value))}
            id="price"
            required
            type="number"
            placeholder="0"
            className="px-3 appearance-none w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <label
            htmlFor={"description"}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            required
            className="px-3 appearance-none w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </form>
      <button
        className="mt-4 hover:bg-blue-700 w-full bg-blue-500 text-white py-2 rounded-md"
        onClick={() => {
          uploadItem.mutate({ title, price, description, itemPreview });
        }}
      >
        {uploadItem.isLoading ? "...Loading" : "Upload"}
      </button>
    </>
  );
};

export default Admin;
