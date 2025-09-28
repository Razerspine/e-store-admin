import {TablePageEvent} from 'primeng/table';

export type ProductTableConfigType = {
  columns: any[] | undefined;
  paginator: boolean | undefined;
  lazy: boolean | undefined;
  rows: number | undefined;
  totalRecords: number;
  onPage: (event: TablePageEvent) => void;
  showCurrentPageReport: boolean | undefined;
  rowsPerPageOptions: number[];
  value: any[];
  selection: any;
  dataKey: string | undefined;
};
