import { TaskProps } from "@/types/task";
import { IoClose } from "react-icons/io5";

interface BulkDeleteBarProps {
  arrayDelete: TaskProps[];
  handleRemoveFromDelete: (task: TaskProps) => void;
  handleConfirmDeleteTasks: () => void;
}

const BulkDeleteBar = ({
  arrayDelete,
  handleConfirmDeleteTasks,
  handleRemoveFromDelete,
}: BulkDeleteBarProps) => {
  return (
    <div
      className={`absolute flex translate-y-0 transition items-stretch left-0 bottom-0 w-full  bg-zinc-900 border-t border-zinc-800 z-40 ${
        !arrayDelete.length && "translate-y-full"
      } `}
    >
      <div className="flex flex-[4] items-center gap-2 my-2 overflow-x-auto w-full mobile:px-2">
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
      <div className="flex-1 flex w-full justify-end">
        <button
          onClick={() => handleConfirmDeleteTasks()}
          className="flex items-center justify-center px-2 rounded-none bg-red-600 text-red-950 transition hover:bg-red-800"
        >
          confirmar
        </button>
      </div>
    </div>
  );
};

export default BulkDeleteBar;
