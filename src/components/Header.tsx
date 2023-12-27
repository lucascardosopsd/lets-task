"use client";
import deleteTasksCompleted from "@/services/tasks/deleteComplete";
import { notify } from "@/tools/notify";

const Header = () => {
  const handleDeleteComplete = async () => {
    notify("info", "Apagando completos");
    await deleteTasksCompleted();
    notify("success", "Apagados");
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
