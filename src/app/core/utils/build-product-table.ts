import {ColumnType, ProductType, TableConfigType} from '@core/models';
import {Signal, WritableSignal} from '@angular/core';
import {PaginatorType} from '@core/models/paginator-type';
import {TablePageEvent} from 'primeng/table';

export const buildProductTable = (
  columns: ColumnType[],
  pagination: Signal<PaginatorType>,
  data: Signal<ProductType[]>,
  selectedProducts: WritableSignal<ProductType[]>,
  onPage: (event: TablePageEvent) => void
): TableConfigType => {
  return {
    columns,
    paginator: true,
    lazy: true,
    rows: pagination().limit,
    totalRecords: pagination().total,
    onPage,
    showCurrentPageReport: true,
    rowsPerPageOptions: [5, 10, 20, 50],
    value: data(),
    selection: selectedProducts,
    dataKey: 'uuid'
  };
}
