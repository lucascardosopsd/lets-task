import { TaskProps } from "@/app/types/task";

interface TasksAreaProps {
  data: TaskProps[];
}

const TasksArea = ({ data }: TasksAreaProps) => {
  return (
    <div className="flex p-4 grid-flow-col w-full h-full">
      {data.map((task, index) => (
        <div key={index}>
          <div>{task.title}</div>
          <div>{task.description}</div>
        </div>
      ))}
    </div>
  );
};

export default TasksArea;
