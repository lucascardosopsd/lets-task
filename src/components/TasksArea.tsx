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
import { IoClose } from "react-icons/io5";

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

      <div
        className={`absolute flex translate-y-0 transition items-stretch gap-2 left-0 bottom-0 w-full  bg-zinc-900 border-t border-zinc-800 z-40 ${
          !arrayDelete.length && "translate-y-full"
        } `}
      >
        <div className="flex items-center gap-2 my-2 mx-2 overflow-x-auto w-full">
          {arrayDelete.map((task, index) => (
            <div className="flex h-10" key={index}>
              <div className="rounded-l flex items-center text-start p-2 h-full w-40 line-clamp-1 truncate text-yellow-900 bg-yellow-600 relative">
                <p>{task.title}</p>
              </div>
              <span
                className="flex rounded-r items-center justify-center p-1 bg-yellow-500 hover:bg-yellow-600 transition h-full cursor-pointer"
                onClick={() => handleRemoveFromDelete(task)}
              >
                <IoClose />
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={() => handleConfirmDeleteTasks()}
            className="flex items-center justify-center px-2 rounded-none bg-red-600 text-red-950 transition hover:bg-red-800"
          >
            confirmar
          </button>
        </div>
      </div>

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
