"use client";
import { TaskProps } from "@/types/task";
import Modal from "./Modal";
import { MouseEvent, useState } from "react";
import { notify } from "@/tools/notify";
import { useTaskForm } from "@/validators/task";
import { FieldValues } from "react-hook-form";
import updateTask from "@/services/tasks/update";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import UpdateTaskBody from "./formBodies/UpdateTask";
import { FaExclamation } from "react-icons/fa6";

interface TaskCardProps {
  handleScheduleToDelete: (_id: string) => void;
  task: TaskProps;
}

const TaskCard = ({ task, handleScheduleToDelete }: TaskCardProps) => {
  const [isUpdateodalOpen, setIsUpdateModalOpen] = useState(false);

  const { register, formState, handleSubmit } = useTaskForm(task);

  const handleUpdateTask = async (data: FieldValues) => {
    try {
      await updateTask(data, task?._id);

      notify("success", "Atualizando");

      setIsUpdateModalOpen(false);
    } catch (error) {
      notify("error", "Erro ao atualizar tarefa");
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
      await updateTask({ ...task, important: !task.important }, task?._id);
    } catch (error) {
      notify("error", "Erro ao atualizar tarefa");
    }
  };

  const handleOpenUpdateModal = async (e: MouseEvent<HTMLElement>) => {
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <div className="w-full h-56 mobile:h-48 mobile:w-48 box p-4 text-zinc-100 relative hover:!border-green-500 transition cursor-pointer">
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
              onClick={() => handleScheduleToDelete(task._id)}
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
        <span
          onClick={(e: MouseEvent<HTMLElement>) => handleOpenUpdateModal(e)}
        >
          <div
            className={`text-green-500 text-xl mobile:text-lg line-clamp-1 ${
              task.complete && "text-zinc-700"
            }`}
          >
            {task.title}
          </div>
          <p
            className={`break-all line-clamp-5 ${
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
        </span>
      </div>
      {/* Update Modal */}

      <Modal
        body={<UpdateTaskBody formState={formState} register={register} />}
        onSubmit={handleSubmit(handleUpdateTask)}
        isOpen={isUpdateodalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        header="Atualizar tarefa"
      />
    </>
  );
};

export default TaskCard;
