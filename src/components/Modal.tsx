"use client";

import { ReactElement, ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";
import { MdClose } from "react-icons/md";

interface ModalProps {
  body: ReactNode | ReactNode[];
  onSubmit: SubmitHandler<any>;
  isOpen: boolean;
  onClose: () => void;
  header?: string | ReactElement;
  loading?: boolean;
}

const Modal = ({
  body,
  onSubmit,
  isOpen,
  onClose,
  header,
  loading,
}: ModalProps) => {
  return (
    <>
      <form
        className={`flex transition ${
          isOpen ? "translate-y-0" : "-translate-y-[1000px]"
        } absolute mobile:h-[600px] mobile:w-[600px] top-0 bottom-0 right-0 left-0 mx-auto my-auto flex-col gap-2 bg-zinc-900 box mobile:!rounded !rounded-none !pb-0 z-50`}
        onSubmit={onSubmit}
      >
        <div className="relative flex justify-center border-b border-zinc-800 text-zinc-200 py-4">
          <MdClose
            className="absolute top-0 right-3 text-zinc-600 hover:text-green-500 cursor-pointer transition text-4xl mobile:text-xl"
            onClick={onClose}
          >
            X
          </MdClose>
          {header}
        </div>
        <div className="h-full overflow-y-auto p-4">{body}</div>
        <footer className="flex w-full justify-stretch">
          <button className="btn btn-secondary w-full" onClick={onClose}>
            Cancelar
          </button>
          <button
            className={`btn btn-primary w-full ${
              loading && "pointer-events-none cursor-not-allowed"
            }`}
            type="submit"
          >
            Enviar
          </button>
        </footer>
      </form>
      <div
        className={`h-full w-full bg-black bg-opacity-40 top-0 left-0 absolute pointer-events-none ${
          !isOpen ? "hidden" : "block"
        }`}
        onClick={onClose}
      />
    </>
  );
};

export default Modal;
