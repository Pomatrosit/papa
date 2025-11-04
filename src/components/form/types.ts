export type Brand<T, U> = T & { __brand: U };

export type EitherField<
  T,
  TKey extends keyof T = keyof T
> = TKey extends keyof T
  ? { [P in TKey]-?: T[TKey] } & Partial<Record<Exclude<keyof T, TKey>, never>>
  : never;

export type SelectOptionsType = {
  label: string;
  value: string;
}[];

export type OptionType = {
  value: string | number;
  label: string;
};
