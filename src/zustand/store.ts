import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ItemSingleState {
  id: number;
  count: number;
  name?: string;
  price?: number;
  thumbnail?: string;
}
interface CartState {
  items: ItemSingleState[];
  addItem: (item: ItemSingleState) => void;
  removeItem: (id: number) => void;
  clearItem: () => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (newItem: ItemSingleState) =>
          //   set((state) => ({ items: [...state.items, item] })),
          set((state) => ({
            items: state.items.find((item) => item.id === newItem.id)
              ? state.items.map((item) =>
                  item.id === newItem.id
                    ? { ...item, count: item.count + newItem.count }
                    : item
                )
              : [...state.items, newItem],
          })),
        removeItem: (id: number) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          })),
        clearItem: () => set((state) => ({ items: [] })),
      }),
      {
        name: "cart-storage",
      }
    )
  )
);
export default useCartStore;