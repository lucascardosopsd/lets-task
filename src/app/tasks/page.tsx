import Header from "@/components/Header";
import TasksArea from "@/components/TasksArea";
import getTasks from "@/services/tasks/get";

export default async function Home() {
  const tasks = await getTasks({});

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <TasksArea data={tasks} />
    </div>
  );
}
