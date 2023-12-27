"use client";

import { TaskProps } from "@/types/task";
import Modal from "./Modal";
import TaskBody from "./formBodies/Task";
import { notify } from "@/tools/notify";
import createTask from "@/services/tasks/create";
import { useEffect, useState } from "react";
import { useTaskForm } from "@/validators/task";
import TaskCard from "./TaskCard";
import useSidebarStore from "@/context/sidebar";

interface TasksAreaProps {
  data: TaskProps[];
}

const TasksArea = ({ data }: TasksAreaProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, formState, handleSubmit, control, reset } = useTaskForm();
  const { currentLabel } = useSidebarStore();
  const [filtered, setFiltered] = useState(data);

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
    <div className="flex flex-wrap justify-center mobile:justify-start p-4 gap-4 h-screen overflow-y-auto pb-40">
      <span className="fixed mobile:absolute left-0 bottom-0 h-40 w-full bg-gradient-to-t from-zinc-950 to-transparent z-40 pointer-events-none" />

      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute mobile:static bottom-2 right-8 flex items-center justify-center rounded-full mobile:rounded text-green-500 mobiletext-zinc-600 border mobile:border-zinc-600 border-green-500 h-20 w-20 mobile:h-48 mobile:w-48 text-6xl font-extralight hover:border-green-500 hover:text-green-500 bg-zinc-950 mobile:bg-transparent transition z-40"
      >
        +
      </button>
      {!filtered.length && currentLabel == "all"
        ? data
            .sort(
              (a, b) =>
                Number(a.complete) - Number(b.complete) ||
                Number(b.important) - Number(a.important)
            )
            .map((task, index) => <TaskCard task={task} key={index} />)
        : filtered.map((task, index) => <TaskCard task={task} key={index} />)}
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
