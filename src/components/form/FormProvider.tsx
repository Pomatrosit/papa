import type { FC, PropsWithChildren } from "react";
import { FormProvider as FP, useForm, type FieldValues } from "react-hook-form";

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<FieldValues>();

  return <FP {...methods}>{children}</FP>;
};
