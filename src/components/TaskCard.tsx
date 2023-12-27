"use client";

import { TaskProps } from "@/types/task";
import Modal from "./Modal";
import { useState } from "react";
import { notify } from "@/tools/notify";
import deleteTask from "@/services/tasks/delete";
import { useTaskForm } from "@/validators/task";
import TaskBody from "./formBodies/Task";
import { FieldValues } from "react-hook-form";
import updateTask from "@/services/tasks/update";

const TaskCard = ({ task }: { task: TaskProps }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateodalOpen, setIsUpdateModalOpen] = useState(false);

  const { register, formState, handleSubmit, control, reset } =
    useTaskForm(task);

  const handleUpdateTask = async (data: FieldValues) => {
    try {
      notify("info", "Atualizando");

      await updateTask(data, task?._id);

      notify("success", "Atualizando");

      setIsUpdateModalOpen(false);
    } catch (error) {
      notify("error", "Erro ao atualizar tarefa");
    }
  };

  const handleDeleteTask = async () => {
    try {
      notify("info", "Apagando");

      await deleteTask(task?._id);

      setIsDeleteModalOpen(false);

      notify("success", "Apagado");
    } catch (error) {
      notify("error", "Erro ao deletar tarefa");
    }
  };

  const handleCompleteTask = async () => {
    try {
      await updateTask({ ...task, complete: true }, task?._id);
    } catch (error) {
      notify("error", "Erro ao atualizar tarefa");
    }
  };

  return (
    <>
      <div className="w-full h-56 mobile:h-48 mobile:w-48 box p-4 text-zinc-100 relative hover:!border-green-500 transition">
        <div className="w-full flex justify-end gap-4 mobile:gap-2">
          <span
            className="h-6 w-6 mobile:w-4 mobile:h-4 rounded-full bg-yellow-500 hover:bg-yellow-800 cursor-pointer transition"
            onClick={() => setIsUpdateModalOpen(true)}
          />
          <span
            className="h-6 w-6 mobile:w-4 mobile:h-4 rounded-full bg-green-500 hover:bg-green-800 cursor-pointer transition"
            onClick={() => handleCompleteTask()}
          />
          <span
            className="h-6 w-6 mobile:w-4 mobile:h-4 rounded-full bg-red-500 hover:bg-red-800 cursor-pointer transition"
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>

        <div
          className={`text-green-500 text-xl mobile:text-lg ${
            task.complete && "text-zinc-700"
          }`}
        >
          {task.title}
        </div>
        <p
          className={`line-clamp-1 break-all ${
            task.complete && "text-zinc-700"
          }`}
        >
          {task.description}
        </p>

        {task.important && (
          <span className="absolute bottom-0 left-0 text-xl mobile:text-lg rounded-b text-zinc-800 font-medium w-full text-center bg-green-500">
            Importante
          </span>
        )}

        {task.complete && (
          <span className="absolute bottom-0 left-0 text-xl mobile:text-lg rounded-b text-zinc-800 font-medium w-full text-center bg-zinc-700 border-t border-zinc-600">
            completo
          </span>
        )}
      </div>
      {/* Update Modal */}

      <Modal
        body={
          <TaskBody
            formState={formState}
            register={register}
            control={control}
          />
        }
        onSubmit={handleSubmit(handleUpdateTask)}
        isOpen={isUpdateodalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        header="Atualizar tarefa"
      />

      {/* Delete Modal */}
      <Modal
        body={
          <span className="flex items-center justify-center text-zinc-100">
            Apagar
          </span>
        }
        isOpen={isDeleteModalOpen}
        onSubmit={handleDeleteTask}
        onClose={() => setIsDeleteModalOpen(false)}
        header={task.title}
      />
    </>
  );
};

export default TaskCard;
