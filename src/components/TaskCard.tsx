"use client";
import { TaskProps } from "@/types/task";
import Modal from "./Modal";
import { useState } from "react";
import { notify } from "@/tools/notify";
import deleteTask from "@/services/tasks/delete";
import { useTaskForm } from "@/validators/task";
import { FieldValues } from "react-hook-form";
import updateTask from "@/services/tasks/update";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import UpdateTaskBody from "./formBodies/UpdateTask";
import { FaExclamation } from "react-icons/fa6";

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

  const handleToggleCompleteTask = async () => {
    try {
      await updateTask({ ...task, complete: !task.complete }, task?._id);
    } catch (error) {
      notify("error", "Erro ao atualizar tarefa");
    }
  };

  const handleToggleImportantTask = async () => {
    try {
      await updateTask({ ...task, complete: !task.complete }, task?._id);
    } catch (error) {
      notify("error", "Erro ao atualizar tarefa");
    }
  };

  return (
    <>
      <div
        className="w-full h-56 mobile:h-48 mobile:w-48 box p-4 text-zinc-100 relative hover:!border-green-500 transition cursor-pointer"
        onClick={() => setIsUpdateModalOpen(true)}
      >
        <div className="w-full flex justify-end gap-4 mobile:gap-2">
          <span className="flex items-center justify-center">
            <span
              className="h-6 w-6 mobile:w-4 mobile:h-4 rounded bg-yellow-500 hover:bg-yellow-800 cursor-pointer transition"
              onClick={() => handleToggleImportantTask()}
            />
            <FaExclamation className="absolute text-zinc-900 pointer-events-none" />
          </span>

          <span className="flex items-center justify-center">
            <span
              className="h-6 w-6 mobile:w-4 mobile:h-4 rounded bg-red-500 hover:bg-red-800 cursor-pointer transition"
              onClick={() => setIsDeleteModalOpen(true)}
            />
            <IoClose className="absolute text-lg text-zinc-900 pointer-events-none" />
          </span>

          <span className="flex items-center justify-center">
            <span
              className={`h-6 w-6 mobile:w-4 mobile:h-4 rounded bg-green-500 hover:bg-green-800 cursor-pointer transition ${
                task.complete && "bg-zinc-700 hover:bg-zinc-800"
              }`}
              onClick={() => handleToggleCompleteTask()}
            />
            {!task.complete ? (
              <FaCheck className="absolute text-sm text-zinc-900 pointer-events-none" />
            ) : (
              <FaArrowRotateLeft className="absolute text-sm text-zinc-900 pointer-events-none" />
            )}
          </span>
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
          <span className="absolute bottom-0 left-0 text-xl mobile:text-lg rounded-b text-zinc-100 font-medium w-full text-center bg-green-500">
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
        body={<UpdateTaskBody formState={formState} register={register} />}
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
