import {WritableSignal} from '@angular/core';

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
  selection?: WritableSignal<T[]>;
  dataKey?: string;
  globalFilterFields?: string[];
};
