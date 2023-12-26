"use client";

import { ReactElement, ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";
import { MdClose } from "react-icons/md";

interface ModalProps {
  body: ReactNode | ReactNode[];
  onSubmit: SubmitHandler<any>;
  onCancel?: () => void;
  isOpen: boolean;
  onClose: () => void;
  header: string | ReactElement;
  loading?: boolean;
}

const Modal = ({
  body,
  onSubmit,
  onCancel,
  isOpen,
  onClose,
  header,
  loading,
}: ModalProps) => {
  return (
    <form
      className={`flex transition ${
        isOpen ? "translate-y-0" : "-translate-y-[1000px]"
      } absolute h-[600px] w-[600px] top-0 bottom-0 right-0 left-0 mx-auto my-auto flex-col gap-2 bg-zinc-900 rounded box !pb-0`}
      onSubmit={onSubmit}
    >
      <div className="relative flex justify-center border-b border-zinc-800 text-zinc-200 py-4">
        <MdClose
          className="absolute top-3 right-3 text-zinc-600 hover:text-green-500 cursor-pointer transition"
          size="20"
          onClick={onClose}
        >
          X
        </MdClose>
        {header}
      </div>
      <div className="h-[500px] overflow-y-auto p-4">{body}</div>
      <footer className="flex w-full justify-stretch">
        <button
          className="btn btn-secondary w-full"
          onClick={onCancel ? onCancel : onClose}
        >
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
  );
};

export default Modal;
