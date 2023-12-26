import TasksArea from "@/components/TasksArea";
import getTasks from "@/services/tasks/getTasks";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="flex flex-col h-full w-full relative">
      <TasksArea data={tasks} />
    </div>
  );
}
