"use client";

import { TaskProps } from "@/app/types/task";
import Modal from "./Modal";
import TaskBody from "./formBodies/task";
import { notify } from "@/tools/notify";
import createTask from "@/services/tasks/create";
import { useState } from "react";
import { useTaskForm } from "@/validators/task";
import TaskCard from "./TaskCard";

interface TasksAreaProps {
  data: TaskProps[];
}

const TasksArea = ({ data }: TasksAreaProps) => {
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
    <div className="flex  h-full w-full items-start justify-start relative">
      <div className="flex flex-wrap p-4 gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center rounded text-zinc-600 border border-zinc-600 h-48 w-48 text-6xl font-extralight hover:border-green-500 hover:text-green-500 transition"
        >
          +
        </button>
        {data.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>

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
    </div>
  );
};

export default TasksArea;
