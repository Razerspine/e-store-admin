import {Signal, WritableSignal} from '@angular/core';
import {PaginatorType} from '@core/models/paginator.type';
import {TablePageEvent} from 'primeng/table';
import {ProductColumnType, ProductType} from '@features/products';
import {TableConfigType} from '@core/models';

export const buildProductTable = (
  columns: ProductColumnType[],
  pagination: Signal<PaginatorType>,
  data: Signal<ProductType[]>,
  selectedProducts: WritableSignal<ProductType[]>,
  onPage: (event: TablePageEvent) => void
): TableConfigType<ProductType, ProductColumnType> => {
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
