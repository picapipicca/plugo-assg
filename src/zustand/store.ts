import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ItemSingleState {
  id: number;
  count: number;
  name?: string;
  price?: number;
  thumbnail?: string;
}
type uploadItemState = {
  id: number;
  title: string;
  price: number;
  description: string;
  itemPhoto?: string;
};
interface AdminState {
  uploadItem: uploadItemState;
  setItem: (item: uploadItemState) => void;
}
interface CartState {
  items: ItemSingleState[];
  addItem: (item: ItemSingleState) => void;
  removeItem: (id: number) => void;
  clearItem: () => void;
}
interface ModalProps {
  modalProps?: {
    title: string;
    content?: string | number;
  };
}
interface ModalState extends ModalProps {
  modalOpenStatus: boolean;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
  updateContentModal: (content: number) => void;
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
const useNewItemStore = create<AdminState>()(
  devtools(
    persist(
      (set) => ({
        uploadItem: {
          id: 0,
          title: "",
          description: "",
          price: 0,
          itemPhoto: "",
        },
        setItem: (item: uploadItemState) => set({ uploadItem: item }),
      }),
      {
        name: "item-storage",
      }
    )
  )
);

const useModalStore = create<ModalState>((set) => ({
  modalOpenStatus: false,
  modalProps: { title: "", content: "" },
  openModal: (props: ModalProps) =>
    set({ modalOpenStatus: true, modalProps: props.modalProps }),
  closeModal: () => set({ modalOpenStatus: false }),
  updateContentModal: (content: number) =>
    set((state) =>
      typeof state.modalProps?.content === "number"
        ? {
            modalOpenStatus: false,
            modalProps: { title: state.modalProps.title, content: content },
          }
        : state
    ),
}));
export { useCartStore, useNewItemStore, useModalStore };
