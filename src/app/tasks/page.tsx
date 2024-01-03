import TasksArea from "@/components/TasksArea";
import getTasks from "@/services/tasks/get";

export default async function Home() {
  const tasks = await getTasks({});
  const parsedTasks = JSON.parse(tasks);

  return (
    <div className="flex flex-1 flex-col h-full w-full relative overflow-hidden">
      <TasksArea data={parsedTasks} />
    </div>
  );
}
