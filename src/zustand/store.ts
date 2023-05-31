import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  ICartStoreState,
  ICartStorePersist,
  ICartStore,
  IItemSingleState,
  IAdminState,
  IUploadItemState,
  IModalState,
  IModalProps,
} from "./Interface";

const initialState: ICartStoreState = {
  cartList: [],
};

const useCartStore = create<ICartStore>(
  (persist as ICartStorePersist)(
    (set, get) => ({
      cartList: initialState.cartList,
      addItem: (newItem: IItemSingleState) =>
        set({
          cartList: get().cartList.find((item) => item.id === newItem.id)
            ? get().cartList.map((item) =>
                item.id === newItem.id
                  ? { ...item, count: item.count + newItem.count }
                  : item
              )
            : [...get().cartList, newItem],
        }),
      removeItem: (id: number) =>
        set({
          cartList: get().cartList.filter((item) => item.id !== id),
        }),
      clearItem: () => set({ cartList: [] }),
    }),
    {
      name: "cart-store", 
      partialize: (state) => ({ cartList: state.cartList }),
    }
  )
);

const useNewItemStore = create<IAdminState>()(
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
        setItem: (item: IUploadItemState) => set({ uploadItem: item }),
      }),
      {
        name: "item-storage",
      }
    )
  )
);

const useModalStore = create<IModalState>((set) => ({
  modalOpenStatus: false,
  modalProps: { title: "", content: "" },
  openModal: (props: IModalProps) =>
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
