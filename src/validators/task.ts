import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const taskSchema = yup.object({
  title: yup.string().min(1).max(50).required("Preencha o campo"),
  description: yup.string().max(1000).required("Prencha o campo"),
  complete: yup.boolean().default(false),
  important: yup.boolean().default(false),
});

export const useTaskForm = () => {
  return useForm({ resolver: yupResolver(taskSchema) });
};
