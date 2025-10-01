import { useForm, type UseFormProps, type UseFormReturn, type FieldValues } from "react-hook-form";

export function useAppForm<T extends FieldValues>(
  options?: UseFormProps<T>
): UseFormReturn<T> {
  return useForm<T>({
    mode: "onBlur",
    reValidateMode: "onChange",
    ...options,
  });
}
