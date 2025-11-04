import { useFormContext, type FieldValues, type Path } from "react-hook-form";

import { memo } from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

interface TextInputProps<T> {
  name: Path<T>;
  isRequired?: boolean;
}

export const TextInput = memo(
  <T extends FieldValues>(props: TextFieldProps & TextInputProps<T>) => {
    const { name, isRequired = false, ...otherProps } = props;

    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <TextField
        {...register(name, {
          required: isRequired ? "Это обязательное поле" : "",
        })}
        error={!!errors[name]}
        helperText={errors[name] && String(errors[name]?.message)}
        {...otherProps}
      />
    );
  }
);
