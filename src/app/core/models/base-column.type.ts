export type BaseColumnType<T> = {
  name: string;
  field: string;
  value: (value: T) => string;
};
