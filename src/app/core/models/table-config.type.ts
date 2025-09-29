export type TableConfigType<T, C> = {
  columns: C[];
  paginator: boolean;
  lazy: boolean;
  rows: number;
  totalRecords: number;
  onPage: (event: any) => void;
  showCurrentPageReport?: boolean;
  rowsPerPageOptions: number[];
  value: T[];
  selection?: T[];
  dataKey?: string;
};
