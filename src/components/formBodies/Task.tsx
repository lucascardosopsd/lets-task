"use client";

import {
  Control,
  Controller,
  FieldValues,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import Checkbox from "../Checkbox";

interface TaskBodyProps {
  register: UseFormRegister<any>;
  formState: FormState<FieldValues>;
  control: Control<any>;
}

const TaskBody = ({ register, formState, control }: TaskBodyProps) => {
  const { errors } = formState;

  return (
    <div className="flex flex-col h-full w-full gap-4 text-zinc-100">
      <div>
        <p>Título</p>
        <input type="text" {...register("title")} />
        <p className="text-sm">{errors.title?.message as string}</p>
      </div>

      <div>
        <p>Descrição</p>
        <textarea {...register("description")} />
        <p className="text-sm">{errors.title?.message as string}</p>
      </div>

      <div className="box flex justify-around items-center gap-2 p-2">
        <div className="flex items-center">
          <Controller
            name="complete"
            control={control}
            render={({ field: { onChange } }) => (
              <Checkbox onChange={onChange} />
            )}
          />
          <p>Completo</p>
        </div>

        <div className="flex items-center">
          <Controller
            name="important"
            control={control}
            render={({ field: { onChange } }) => (
              <Checkbox onChange={onChange} />
            )}
          />
          <p>Importante</p>
        </div>
      </div>
    </div>
  );
};

export default TaskBody;
