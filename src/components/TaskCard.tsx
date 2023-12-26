import { TaskProps } from "@/app/types/task";
import Modal from "./Modal";
import { useState } from "react";
import { notify } from "@/tools/notify";
import deleteTask from "@/services/tasks/delete";

const TaskCard = ({ task }: { task: TaskProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteTask = async () => {
    try {
      notify("info", "Apagando");
      setIsOpen(false);
      await deleteTask(task?.id);
      notify("success", "Apagado");
    } catch (error) {
      notify("error", "Erro ao deletar tarefa");
    }
  };

  return (
    <>
      <div className="h-48 w-48 box p-4 text-zinc-100 relative">
        <span
          className="w-4 h-4 rounded-full bg-red-500 right-2 top-2 absolute hover:bg-red-800 cursor-pointer transition"
          onClick={() => setIsOpen(true)}
        />
        <div className="text-green-500">{task.title}</div>
        <p className="w-full h-36 line-clamp-1 break-words">
          {task.description}
        </p>
      </div>

      <Modal
        body={
          <span className="flex items-center justify-center text-zinc-100">
            Apagar
          </span>
        }
        isOpen={isOpen}
        onSubmit={handleDeleteTask}
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default TaskCard;
