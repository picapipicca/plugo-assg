import { useRef } from "react";
import { useModalStore } from "../zustand/store";

const Modal = () => {
  const { modalProps, closeModal, updateContentModal } = useModalStore();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <>
        <div className="w-1/5 shadow-lg rounded-lg bg-white z-40 fixed max-h-max left-[40%] right-1/2 bottom-0 top-0 m-auto border border-black border-opacity-10">
          <div className="justify-center p-4">
            <div className="items-center text-center pt-3 space-y-6 mb-4">
              <div className="text-lg text-gray-500">{modalProps?.title}</div>
              <input
                type="number"
                className="w-full mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-gray-500 block p-2.5"
                defaultValue={modalProps?.content}
                min={0}
                ref={inputRef}
                required
              />
            </div>
            <div>
              <div className="flex justify-evenly py-2 space-x-2">
                <button
                  onClick={closeModal}
                  className="w-1/2 py-2 bg-white hover:bg-gray-100 text-black font-semibold border-l border border-gray-300 rounded-lg"
                >
                  Calcel
                </button>
                <button
                  onClick={() =>
                    updateContentModal(Number(inputRef.current?.value))
                  }
                  className="py-2 hover:bg-blue-600  bg-blue-500 w-1/2 text-white font-semibold rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Modal;
