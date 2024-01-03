"use client";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

interface UpdateTaskHeaderProps {
  register: UseFormRegister<any>;
  formState: FormState<FieldValues>;
}

const UpdateTaskHeader = ({ register, formState }: UpdateTaskHeaderProps) => {
  const { errors } = formState;

  return (
    <div className="flex flex-col h-full w-full gap-2 text-zinc-100">
      <input
        type="text"
        className="!border-none"
        {...register("title")}
        placeholder="Título"
      />
      <p className="px-6 text-zinc-600 text-xs">
        {new Date().toLocaleDateString()}
      </p>
      <p className="text-sm">{errors.title?.message as string}</p>
    </div>
  );
};

export default UpdateTaskHeader;
