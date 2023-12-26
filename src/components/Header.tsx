"use client";
import { useTaskForm } from "@/validators/task";
import Modal from "./Modal";
import TaskBody from "./formBodies/task";
import { useState } from "react";
import { TaskProps } from "@/app/types/task";
import { notify } from "@/tools/notify";
import createTask from "@/services/tasks/create";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, formState, handleSubmit, control, reset } = useTaskForm();

  const handleNewTask = async (data: TaskProps) => {
    try {
      setLoading(true);

      notify("info", "Cadastrando tarefa");

      await createTask(data);

      setIsModalOpen(false);

      reset();

      notify("success", "Tarefa criada");
    } catch (error) {
      notify("error", "Erro ao criar tarefa");
    }
  };

  return (
    <>
      <nav className="hidden tablet:flex justify-end py-2 px-2 border-b border-zinc-800">
        <button
          className="btn btn-primary-outline h-10"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-2xl">+</span> Nova
        </button>
      </nav>
      <button className="flex tablet:hidden items-center justify-center absolute bottom-2 right-2 w-10 h-10 text-xl rounded-full border border-green-500 text-green-500 bg-zinc-800">
        +
      </button>

      <Modal
        loading={loading}
        body={
          <TaskBody
            formState={formState}
            register={register}
            control={control}
          />
        }
        onSubmit={handleSubmit(handleNewTask)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Criar nova tarefa"
      />
    </>
  );
};

export default Header;
