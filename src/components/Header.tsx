"use client";
import deleteTasksCompleted from "@/services/tasks/deleteComplete";

const Header = () => {
  const handleDeleteComplete = async () => {
    deleteTasksCompleted();
  };

  return (
    <div className="flex justify-center mobile:justify-end items-center p-2 w-full text-zinc-100">
      <button
        className="btn btn-primary-outline  border border-zinc-600"
        onClick={handleDeleteComplete}
      >
        Apagar Completos
      </button>
    </div>
  );
};

export default Header;
