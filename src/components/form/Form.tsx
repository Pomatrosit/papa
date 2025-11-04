import type { ReactNode } from "react";
import type { EitherField } from "./types";
import { useFormContext, type FieldValues } from "react-hook-form";
import { TextInput } from "./TextInput";

type Options<T> = {
  onSubmit?: (value: T) => void;
  action?: string;
};

type FormPropsType<T> = {
  children: ReactNode;
} & EitherField<Options<T>>;
export function Form<T extends FieldValues>({
  children,
  action,
  onSubmit,
}: FormPropsType<T>) {
  const { handleSubmit } = useFormContext<T>();

  const onFormSubmit = (data: T) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      action={action}
      noValidate
      style={{ height: "100%" }}
    >
      {children}
    </form>
  );
}

Form.TextInput = TextInput;
