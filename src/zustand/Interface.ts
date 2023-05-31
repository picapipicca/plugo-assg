import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

export interface IItemSingleState {
  id: number;
  count: number;
  name?: string;
  price?: number;
  thumbnail?: string;
}
export type IUploadItemState = {
  id: number;
  title: string;
  price: number;
  description: string;
  itemPhoto?: string;
};
export interface IAdminState {
  uploadItem: IUploadItemState;
  setItem: (item: IUploadItemState) => void;
}
 
export interface ICartStoreState {
  cartList: IItemSingleState[];
}
export interface ICartStore extends ICartStoreState, ICartStoreActions {}

export interface ICartStoreActions {
  addItem: (item: IItemSingleState) => void;
  removeItem: (id: number) => void;
  clearItem: () => void;
}
export type ICartStorePersist = (
  config: StateCreator<ICartStore>,
  options: PersistOptions<ICartStoreState>
) => StateCreator<ICartStore>;

export interface IModalProps {
  modalProps?: {
    title: string;
    content?: string | number;
  };
}
export interface IModalState extends IModalProps {
  modalOpenStatus: boolean;
  openModal: (props: IModalProps) => void;
  closeModal: () => void;
  updateContentModal: (content: number) => void;
}
