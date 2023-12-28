"use client";
import { TaskProps } from "@/types/task";
import { notify } from "@/tools/notify";
import createTask from "@/services/tasks/create";
import { useEffect, useState } from "react";
import { useTaskForm } from "@/validators/task";
import useSidebarStore from "@/context/sidebar";
import deleteManyTasks from "@/services/tasks/deleteManyTasks";
import TaskCard from "./TaskCard";
import Modal from "./Modal";
import UpdateTaskBody from "./formBodies/UpdateTask";
import BulkDeleteBar from "./BulkDeleteBar";

interface TasksAreaProps {
  data: TaskProps[];
}

const TasksArea = ({ data }: TasksAreaProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, formState, handleSubmit, control, reset } = useTaskForm();
  const { currentLabel } = useSidebarStore();
  const [filtered, setFiltered] = useState<TaskProps[]>([] as TaskProps[]);
  const [arrayDelete, setArrayDelete] = useState<TaskProps[]>([]);

  const handleScheduleToDelete = async (task: TaskProps) => {
    if (arrayDelete.some((taskDelete) => taskDelete._id == task._id)) {
      return;
    }

    if (!filtered.length && data.length) {
      setFiltered(data);
    }

    setArrayDelete((state) => [...state, task]);

    setFiltered((state) =>
      state.filter((taskFilter) => taskFilter._id !== task._id)
    );
  };

  const handleRemoveFromDelete = async (task: TaskProps) => {
    if (!arrayDelete.some((taskDelete) => taskDelete._id == task._id)) {
      return;
    }

    setFiltered((state) => [...state, task]);

    setFiltered((state) =>
      state.sort(
        (a: TaskProps, b: TaskProps) =>
          Number(a.complete) - Number(b.complete) ||
          Number(b.important) - Number(a.important)
      )
    );

    setArrayDelete((state) =>
      state.filter((taskFilter) => taskFilter._id !== task._id)
    );
  };

  const handleConfirmDeleteTasks = async () => {
    try {
      const taskIds = arrayDelete.map((task) => task._id);

      await deleteManyTasks(taskIds);

      notify("success", "Deletadas");

      setArrayDelete([]);
    } catch (error) {
      throw new Error("Error when try to delete tasks");
    }
  };

  useEffect(() => {
    if (currentLabel == "all") {
      setFiltered([]);
    }

    if (currentLabel == "complete") {
      setFiltered(data.filter((task: TaskProps) => task.complete));
    }

    if (currentLabel == "important") {
      setFiltered(data.filter((task: TaskProps) => task.important));
    }
  }, [currentLabel]);

  const handleNewTask = async (data: Omit<TaskProps, "_id" | "userId">) => {
    try {
      setLoading(true);

      notify("info", "Cadastrando tarefa");

      await createTask(data);

      setIsModalOpen(false);

      reset();

      notify("success", "Tarefa criada");

      setLoading(false);
    } catch (error) {
      notify("error", "Erro ao criar tarefa");
    }
  };

  return (
    <div className="flex flex-wrap justify-center mobile:justify-start p-4 gap-4 h-screen overflow-y-auto pb-40 ">
      <span className="fixed mobile:absolute left-0 bottom-0 h-40 w-full bg-gradient-to-t from-zinc-950 to-transparent z-40 pointer-events-none" />

      {/* Mobile action button */}
      <button
        onClick={() =>
          !arrayDelete.length
            ? setIsModalOpen(true)
            : handleConfirmDeleteTasks()
        }
        className={`absolute flex items-center justify-center right-2 bottom-2 h-24 w-24 rounded-full border border-green-500 z-40 text-green-500 text-4xl mobile:hidden ${
          arrayDelete.length &&
          "!w-full !h-16 !right-0 !bottom-0 text-2xl rounded-none bg-red-600 text-red-950 border-none "
        }`}
      >
        {!arrayDelete.length ? "+" : "Confirmar"}
      </button>

      {/* Desktop Action Buttons */}

      <button
        className="h-48 w-48 flex items-center justify-center rounded border border-zinc-600 text-zinc-600 group hover:border-green-500 text-6xl font-thin transition"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="group-hover:text-green-500">+</p>
      </button>

      <BulkDeleteBar
        arrayDelete={arrayDelete}
        handleConfirmDeleteTasks={handleConfirmDeleteTasks}
        handleRemoveFromDelete={handleRemoveFromDelete}
      />

      {!filtered.length &&
        !arrayDelete.length &&
        currentLabel == "all" &&
        data.map((task, index) => (
          <TaskCard
            task={task}
            handleScheduleToDelete={() => handleScheduleToDelete(task)}
            key={index}
          />
        ))}

      {(filtered.length || arrayDelete.length) &&
        currentLabel == "all" &&
        filtered.map((task, index) => (
          <TaskCard
            task={task}
            handleScheduleToDelete={() => handleScheduleToDelete(task)}
            key={index}
          />
        ))}

      <Modal
        loading={loading}
        body={<UpdateTaskBody formState={formState} register={register} />}
        onSubmit={handleSubmit(handleNewTask)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Criar nova tarefa"
      />
    </div>
  );
};

export default TasksArea;
